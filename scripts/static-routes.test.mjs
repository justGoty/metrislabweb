import assert from 'node:assert/strict';
import { readFile, access, readdir } from 'node:fs/promises';
import test from 'node:test';
import { parse } from 'parse5';

const dist = new URL('../dist/', import.meta.url);
const attribute = (node, name) => node.attrs?.find(attr => attr.name === name)?.value;
const content = node => node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(content).join('');
function findAll(node, predicate) {
  return [...(predicate(node) ? [node] : []), ...(node.childNodes ?? []).flatMap(child => findAll(child, predicate))];
}
async function readPage(file) { return parse(await readFile(new URL(file, dist), 'utf8')); }
const tag = (document, name) => findAll(document, node => node.tagName === name);
const meta = (document, name) => findAll(document, node => node.tagName === 'meta' && attribute(node, 'name') === name)[0];

for (const [file, path, heading] of [
  ['index.html', '/', 'Поверка и сервис газоанализаторов под ключ'],
  ['catalog/index.html', '/catalog/', 'Каталог газоанализаторов'],
  ['privacy/index.html', '/privacy/', 'Политика обработки персональных данных'],
  ['404.html', null, 'Страница не найдена'],
]) {
  test(`${file}: visible HTML, single H1, metadata and local assets`, async () => {
    const document = await readPage(file);
    const root = findAll(document, node => attribute(node, 'id') === 'root')[0];
    assert.equal(attribute(root, 'data-prerendered'), 'true');
    assert.equal(tag(document, 'h1').length, 1);
    assert.equal(content(tag(document, 'h1')[0]), heading);
    assert.equal(tag(root, 'main').length, 1);
    assert(content(root).length > 500);
    assert.equal(tag(document, 'title').length, 1);
    assert(attribute(meta(document, 'description'), 'content').length > 40);
    const canonical = tag(document, 'link').filter(node => attribute(node, 'rel') === 'canonical');
    assert.equal(canonical.length, path ? 1 : 0);
    if (path) assert.equal(attribute(canonical[0], 'href'), `https://metrislab.ru${path}`);
    assert.equal(attribute(meta(document, 'robots'), 'content').startsWith('noindex'), !path);
    const ids = findAll(document, node => attribute(node, 'id')).map(node => attribute(node, 'id'));
    assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML ids');
    for (const node of tag(document, 'img')) {
      assert(attribute(node, 'alt'), 'Missing image alt');
      const src = attribute(node, 'src');
      if (src?.startsWith('/')) await access(new URL(src.slice(1), dist));
    }
    for (const node of tag(document, 'a')) {
      const href = attribute(node, 'href');
      if (href?.startsWith('#')) assert(ids.includes(href.slice(1)), `Missing anchor ${href}`);
      if (href?.startsWith('tel:')) assert.equal(href, 'tel:+79060799144');
    }
  });
}

test('FAQ schema matches visible questions and answers exactly', async () => {
  const document = await readPage('index.html');
  const schema = JSON.parse(content(tag(document, 'script').find(node => attribute(node, 'type') === 'application/ld+json')));
  const questions = schema['@graph'].find(node => node['@type'] === 'FAQPage').mainEntity;
  const details = tag(document, 'details');
  assert.equal(questions.length, details.length);
  questions.forEach((question, index) => {
    assert(content(tag(details[index], 'summary')[0]).includes(question.name));
    assert.equal(content(tag(details[index], 'p')[0]), question.acceptedAnswer.text);
  });
  assert.equal(schema['@graph'].find(node => node['@type'] === 'Organization').name, 'МэтрисЛаб');
});

test('Catalog schema points to existing model tiles', async () => {
  const document = await readPage('catalog/index.html');
  const schema = JSON.parse(content(tag(document, 'script').find(node => attribute(node, 'type') === 'application/ld+json')));
  const list = schema['@graph'].find(node => node['@type'] === 'ItemList');
  assert.equal(list.numberOfItems, tag(document, 'article').length);
  for (const { item } of list.itemListElement) {
    const id = new URL(item.url).hash.slice(1);
    const tile = findAll(document, node => attribute(node, 'id') === id)[0];
    assert(tile, `Missing model ${id}`);
    assert.equal(content(tag(tile, 'h2')[0]), item.name);
  }
});

test('No stale build timestamp or misleading no-JS submission', async () => {
  const document = await readPage('index.html');
  assert.equal(findAll(document, node => attribute(node, 'name') === 'started_at').length, 0);
  assert.equal(tag(document, 'form').length, 1);
  assert.notEqual(attribute(tag(document, 'fieldset')[0], 'disabled'), undefined);
  assert.equal(tag(document, 'noscript').length, 1);
  assert.equal(content(tag(document, 'textarea')[0]), '');
});

test('Fonts are bundled locally, with their licenses', async () => {
  const document = await readPage('index.html');
  const styles = tag(document, 'link').filter(node => attribute(node, 'rel') === 'stylesheet');
  assert(styles.length > 0);
  for (const style of styles) {
    const href = attribute(style, 'href');
    assert(href.startsWith('/assets/'));
    const css = await readFile(new URL(href.slice(1), dist), 'utf8');
    assert(!css.includes('fonts.googleapis.com'));
    assert(!css.includes('fonts.gstatic.com'));
    assert(!css.includes('./files/'), 'Unresolved font package paths');
    for (const family of ['Onest', 'Geologica', 'IBM Plex Mono']) assert(css.includes(family));
    assert(css.includes('font-display:swap'));
  }
  const assets = await readdir(new URL('assets/', dist));
  assert(assets.filter(file => file.endsWith('.woff2')).length >= 18, 'Font binaries missing from build');
  for (const font of ['onest', 'geologica', 'ibm-plex-mono']) await access(new URL(`fonts/${font}-LICENSE.txt`, dist));
});

test('Sitemap uses canonical routes and the Apache error document exists', async () => {
  const sitemap = await readFile(new URL('sitemap.xml', dist), 'utf8');
  for (const path of ['/', '/catalog/', '/privacy/']) assert(sitemap.includes(`<loc>https://metrislab.ru${path}</loc>`));
  assert(!sitemap.includes('/404.html'));
  const config = await readFile(new URL('.htaccess', dist), 'utf8');
  assert(config.includes('ErrorDocument 404 /404.html'));
  assert(!config.includes('RewriteRule . /index.html'));
  await access(new URL('404.html', dist));
  assert.equal(await readFile(new URL('api/contact.php', dist), 'utf8'), await readFile(new URL('../public/api/contact.php', import.meta.url), 'utf8'));
});
