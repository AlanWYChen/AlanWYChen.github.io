import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/smoke',
  testIgnore: '**/production.spec.js',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  workers: 2,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    browserName: 'chromium',
    viewport: { width: 1440, height: 900 },
    baseURL: 'http://127.0.0.1:4180',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'node scripts/preview.mjs --port 4180',
    url: 'http://127.0.0.1:4180/',
    reuseExistingServer: false,
    timeout: 30000,
  },
});
