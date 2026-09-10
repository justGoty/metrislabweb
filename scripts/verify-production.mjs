import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const base = 'https://metrislab.ru/';
const dist = path.resolve('dist');
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
let verified = 0;

// Only public static files are requested. Never fetch PHP source or submit a form.
for (const entry of await readdir(dist, { recursive: true, withFileTypes: true })) {
  if (!entry.isFile() || entry.name.startsWith('.') || entry.name.endsWith('.php')) continue;
  const file = path.join(entry.parentPath, entry.name);
  const relative = path.relative(dist, file).split(path.sep).join('/');
  const response = await fetch(new URL(relative, base), { signal: AbortSignal.timeout(20000) });
  assert.equal(response.status, 200, relative);
  assert.equal(hash(Buffer.from(await response.arrayBuffer())), hash(await readFile(file)), relative);
  verified += 1;
}
console.log(`Public files: ${verified}, all SHA-256 hashes match the build`);

for (const [route, status, target] of [
  ['', 200], ['catalog/', 200], ['privacy/', 200],
  ['catalog', 301, 'catalog/'], ['privacy', 301, 'privacy/'],
  ['missing-deploy-check', 404], ['missing-deploy-check/nested', 404],
  ['images/missing-deploy-check.png', 404], ['api/contact.php', 405],
]) {
  const response = await fetch(new URL(route, base), { redirect: 'manual', signal: AbortSignal.timeout(20000) });
  assert.equal(response.status, status, route);
  if (target) assert.equal(response.headers.get('location'), new URL(target, base).href);
  if (status === 404) assert((await response.text()).includes('noindex'));
  console.log(`GET /${route}: ${status}`);
}
console.log('No emails or form submissions sent');
