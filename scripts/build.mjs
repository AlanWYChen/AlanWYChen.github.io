import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = join(root, 'dist');
const apps = [
  { path: 'apps/portfolio', destination: '', base: '/' },
  { path: 'apps/teaching', destination: 'teach', base: '/teach/' },
];

for (const app of apps) {
  const directory = join(root, app.path);
  if (!existsSync(join(directory, 'package.json'))) {
    throw new Error(
      `Missing ${app.path}. Run npm run setup to initialize submodules and install dependencies.`,
    );
  }
  const result = spawnSync('npm', ['run', 'build', '--', '--base', app.base], {
    cwd: directory,
    stdio: 'inherit',
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
  if (!existsSync(join(directory, 'dist/index.html'))) {
    throw new Error(`${app.path} must build to dist/index.html.`);
  }
}

// Reserve /teach/ for the teaching app; never silently overwrite portfolio files.
if (existsSync(join(root, 'apps/portfolio/dist/teach'))) {
  throw new Error('The portfolio output contains the reserved teach path.');
}
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
for (const app of apps) {
  cpSync(join(root, app.path, 'dist'), join(output, app.destination), {
    recursive: true,
  });
}
writeFileSync(join(output, '.nojekyll'), '');
console.log('Built portfolio at / and teaching at /teach/.');
