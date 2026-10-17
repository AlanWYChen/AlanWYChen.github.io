import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { extname, resolve, sep } from 'node:path';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
};
createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost');
    let path = resolve(root, '.' + decodeURIComponent(url.pathname));
    if (path !== resolve(root) && !path.startsWith(resolve(root) + sep)) {
      response.writeHead(403).end();
      return;
    }
    if ((await stat(path)).isDirectory()) {
      if (!url.pathname.endsWith('/')) {
        response
          .writeHead(301, { Location: url.pathname + '/' + url.search })
          .end();
        return;
      }
      path = resolve(path, 'index.html');
    }
    const content = await readFile(path);
    response.writeHead(200, {
      'Content-Type': types[extname(path)] || 'application/octet-stream',
    });
    response.end(content);
  } catch {
    response.writeHead(404).end('Not found');
  }
}).listen(4173, '127.0.0.1', () => {
  console.log('Portfolio: http://127.0.0.1:4173/');
  console.log('Teaching: http://127.0.0.1:4173/teach/');
});
