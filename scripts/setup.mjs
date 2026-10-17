import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const commands = [
  ['git', ['submodule', 'update', '--init', '--recursive']],
  ['npm', ['ci']],
  ['npm', ['--prefix', 'apps/portfolio', 'ci']],
  ['npm', ['--prefix', 'apps/teaching', 'ci']],
];
for (const [command, args] of commands) {
  const result = spawnSync(command, args, { cwd: root, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
