import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderPage, staticPaths } from '../dist-ssr/entry-server.js';

const dist = new URL('../dist/', import.meta.url);
const template = await readFile(new URL('index.html', dist), 'utf8');
const headMarker = /<!--page-head-start-->[\s\S]*?<!--page-head-end-->/;
assert(headMarker.test(template), 'Page head placeholder is missing');
assert(template.includes('<div id="root"><!--app-html--></div>'), 'App placeholder is missing');

for (const path of staticPaths) {
  const { head, html } = renderPage(path);
  assert(html.includes('<h1'), `No H1 rendered for ${path}`);
  const output = template
    .replace(headMarker, () => head)
    .replace('<div id="root"><!--app-html--></div>', () => `<div id="root" data-prerendered="true">${html}</div>`);
  const file = new URL(path === '/404.html' ? '404.html' : `${path.slice(1)}index.html`, dist);
  await mkdir(dirname(fileURLToPath(file)), { recursive: true });
  await writeFile(file, output, 'utf8');
  console.log(`Prerendered ${path}: ${Buffer.byteLength(output)} bytes`);
}
