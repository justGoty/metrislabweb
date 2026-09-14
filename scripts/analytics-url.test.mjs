import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { analyticsPageUrl } from '../src/lib/analytics.ts';

test('analytics URL excludes arbitrary data and retains constrained campaign attribution', () => {
  const url = new URL(analyticsPageUrl('https://metrislab.ru/?model=private&email=private&utm_term=private&utm_source=yandex&utm_medium=cpc&utm_campaign=metris_search_123&utm_content=ad_45_group_67&yclid=890#private'));
  assert.equal(url.hash, '');
  assert.deepEqual([...url.searchParams.keys()], ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'yclid']);
  assert.equal(url.searchParams.get('utm_campaign'), 'metris_search_123');
  assert.equal(analyticsPageUrl('https://metrislab.ru/catalog/?utm_campaign=private&utm_content=private&utm_source=private&yclid=private'), 'https://metrislab.ru/catalog/');
  assert.equal(analyticsPageUrl('https://metrislab.ru/private-customer/'), 'https://metrislab.ru/404.html');
});

for (const path of ['index.html', 'catalog/index.html', 'privacy/index.html', '404.html']) {
  test(`${path}: no pre-consent SDK, beacon or third-party preload`, async () => {
    const html = await readFile(new URL(`../dist/${path}`, import.meta.url), 'utf8');
    assert.doesNotMatch(html, /(?:src|href)=["']https?:\/\/(?:mc|mc\.webvisor)\.yandex\./);
    assert.doesNotMatch(html, /<script[^>]*>[^<]*\bym\(/);
    assert.match(html, /Настройки аналитики/);
  });
}
