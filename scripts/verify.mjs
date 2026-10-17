import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const base = '/';
const html = readFileSync(join(root, 'index.html'), 'utf8');
const assets = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)]
  .map((match) => match[1])
  .filter((url) => url.startsWith('/') && !url.startsWith('//'));
assert(assets.length > 0, 'Entry page must contain built assets');
for (const asset of assets) {
  assert(asset.startsWith(base), `Asset escapes ${base}: ${asset}`);
  assert(
    existsSync(join(root, asset.slice(base.length).split(/[?#]/)[0])),
    `Missing asset: ${asset}`,
  );
}
assert(
  !existsSync(join(root, 'teach')),
  'Legacy teaching output must not be deployed',
);
assert(
  !existsSync(join(root, 'tutoring')),
  'Project output must not be nested or assembled',
);
assert(
  readFileSync(join(root, 'alan-chen-resume.pdf')).subarray(0, 5).toString() ===
    '%PDF-',
  'Resume must remain a PDF',
);
console.log(
  'Verified entry page, asset paths, and independent deployment output.',
);
