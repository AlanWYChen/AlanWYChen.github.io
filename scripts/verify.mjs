import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
for (const [entry, base] of [
  ['index.html', '/'],
  ['teach/index.html', '/teach/'],
]) {
  const html = readFileSync(join(root, entry), 'utf8');
  const assets = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)]
    .map((match) => match[1])
    .filter((url) => url.startsWith('/') && !url.startsWith('//'));
  assert(assets.length > 0, `${entry} must contain built assets`);
  for (const asset of assets) {
    assert(asset.startsWith(base), `${entry}: asset escapes ${base}: ${asset}`);
    assert(
      existsSync(join(root, asset.split(/[?#]/)[0])),
      `${entry}: missing ${asset}`,
    );
    if (base === '/')
      assert(
        !asset.startsWith('/teach/'),
        'Portfolio references teaching assets',
      );
  }
  if (base === '/')
    assert(
      !/href=["']\/teach(?:[\/"'#?])/.test(html),
      'Unexpected teaching navigation',
    );
  else
    assert(
      !/href=["']\/(?:["'#?])/.test(html),
      'Unexpected portfolio navigation',
    );
}
// Every portfolio output file must survive composition byte for byte.
const portfolio = fileURLToPath(
  new URL('../apps/portfolio/dist/', import.meta.url),
);
function compare(directory, relative = '') {
  for (const item of readdirSync(directory, { withFileTypes: true })) {
    const name = join(relative, item.name);
    if (item.isDirectory()) compare(join(directory, item.name), name);
    else
      assert.deepEqual(
        readFileSync(join(root, name)),
        readFileSync(join(portfolio, name)),
        `Changed portfolio file: ${name}`,
      );
  }
}
compare(portfolio);
assert(existsSync(join(root, '.nojekyll')));
console.log(
  'Verified separate asset paths, entry pages, and unchanged portfolio output.',
);
