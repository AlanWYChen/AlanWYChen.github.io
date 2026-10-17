import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const host = '127.0.0.1';
const port = 5173;
const servers = [];

async function createAppServer(app, server, plugins = []) {
  const packageUrl = new URL(`../apps/${app}/package.json`, import.meta.url);
  const require = createRequire(packageUrl);
  const { createServer } = await import(pathToFileURL(require.resolve('vite')));
  const instance = await createServer({
    root: fileURLToPath(new URL('.', packageUrl)),
    plugins,
    server: { host, strictPort: true, ...server },
  });
  servers.push(instance);
  await instance.listen();
  return instance;
}

async function closeServers() {
  await Promise.allSettled(servers.map((server) => server.close()));
}

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.once(signal, async () => {
    await closeServers();
    process.exit(0);
  });
}

try {
  const teaching = await createAppServer('teaching', {
    port: 0,
  });
  const teachingPort = teaching.httpServer.address().port;
  const portfolio = await createAppServer(
    'portfolio',
    {
      port,
      strictPort: false,
      proxy: {
        '^/teach(?:[/?]|$)': {
          target: `http://${host}:${teachingPort}`,
          ws: true,
        },
      },
    },
    [
      {
        name: 'teaching-directory-redirect',
        configureServer(server) {
          server.middlewares.use((request, response, next) => {
            const url = new URL(request.url, `http://${host}`);
            if (url.pathname !== '/teach') return next();
            response.writeHead(302, { Location: `/teach/${url.search}` }).end();
          });
        },
      },
    ],
  );
  const publicPort = portfolio.httpServer.address().port;
  console.log(`Portfolio: http://${host}:${publicPort}/`);
  console.log(`Teaching:  http://${host}:${publicPort}/teach/`);
  console.log('Both apps support live updates. Press Ctrl+C to stop.');
} catch (error) {
  console.error(error.message);
  if (['MODULE_NOT_FOUND', 'ERR_MODULE_NOT_FOUND'].includes(error.code)) {
    console.error('Run npm run setup to install the app dependencies.');
  }
  await closeServers();
  process.exitCode = 1;
}
