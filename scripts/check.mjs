import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const html = await readFile('dist/index.html', 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(x => x[1]);
assert.equal(ids.length, new Set(ids).size, 'Duplicate IDs');
for (const [,href] of html.matchAll(/href="([^"]+)"/g)) {
  if (href.startsWith('#')) assert(ids.includes(href.slice(1)), `Missing anchor ${href}`);
  else if (href.startsWith('./')) await stat('dist/' + href.slice(2));
}
const source = await readFile('public/cv/David_Farcas_2026_CV.pdf');
const built = await readFile('dist/cv/David_Farcas_2026_CV.pdf');
assert(source.equals(built), 'Built CV differs from approved CV');
assert.equal(createHash('sha256').update(source).digest('hex'), 'e723ecc57ccd175d901a3450ab2ae83266e252335c80300e98c3bba16000853d');
assert.equal((html.match(/<h1\b/g)||[]).length, 1);
assert(html.includes('HuggingFace Transformers'));
console.log('Passed: anchor targets, local links, unique IDs, primary heading, approved CV integrity.');
