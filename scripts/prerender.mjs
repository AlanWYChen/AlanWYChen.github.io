import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';

// Render the same components used by the browser. No server is deployed.
const server = await createServer({
  server: { middlewareMode: true, hmr: false, ws: false, watch: null },
  optimizeDeps: { noDiscovery: true, include: [] },
  appType: 'custom',
});
try {
  const { render } = await server.ssrLoadModule('/src/entry-server.jsx');
  const { markup, schema } = render();
  const entry = new URL('../dist/index.html', import.meta.url);
  const template = await readFile(entry, 'utf8');
  assert(template.includes('<div id="root"></div>'), 'Missing render target');
  assert(template.includes('<!--portfolio-schema-->'), 'Missing schema target');
  const html = template
    .replace('<div id="root"></div>', () => `<div id="root">${markup}</div>`)
    .replace(
      '<!--portfolio-schema-->',
      () =>
        `<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>`,
    );
  await writeFile(entry, html);
  console.log(
    'Rendered portfolio content and identity metadata into dist/index.html.',
  );
} finally {
  await server.close();
}
