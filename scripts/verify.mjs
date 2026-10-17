import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { companies, stacks } from '../src/data/portfolio.js';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const base = '/';
const html = readFileSync(join(root, 'index.html'), 'utf8');
const body = html.match(/<body>([\s\S]*)<\/body>/)?.[1];
assert(body?.includes('<h1'), 'Portfolio must contain a static heading');
for (const company of companies) {
  assert(
    body.includes(company.name),
    `Missing static experience: ${company.name}`,
  );
  assert(
    body.includes(company.summary),
    `Missing static role summary: ${company.name}`,
  );
}
for (const tool of stacks.flatMap((stack) => stack.tools)) {
  const escaped = tool.replaceAll('&', '&amp;');
  assert(body.includes(escaped), `Missing static skill: ${tool}`);
}
for (const value of [
  'Pick-pic',
  '/alan-chen-resume.pdf',
  'mailto:alan.ch3n@gmail.com',
  'https://github.com/AlanWYChen',
]) {
  assert(body.includes(value), `Missing static portfolio content: ${value}`);
}
const schema = JSON.parse(
  html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
  )?.[1] ?? 'null',
);
assert.equal(schema?.mainEntity?.name, 'Alan Chen');
assert.equal(schema?.mainEntity?.['@type'], 'Person');
const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
assert.equal(schema.url, canonical);
assert(
  readFileSync(join(root, 'sitemap.xml'), 'utf8').includes(
    `<loc>${canonical}</loc>`,
  ),
  'Sitemap must include the canonical homepage',
);
assert(
  readFileSync(join(root, 'robots.txt'), 'utf8').includes(
    `Sitemap: ${canonical}sitemap.xml`,
  ),
  'Robots must advertise the sitemap',
);
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
