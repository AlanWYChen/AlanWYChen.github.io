import { defineConfig } from '@playwright/test';
import config from './playwright.config.js';

const baseURL = process.env.SMOKE_BASE_URL || 'https://alanwychen.github.io/';
const url = new URL(baseURL);
if (!['http:', 'https:'].includes(url.protocol) || url.pathname !== '/') {
  throw new Error(
    'SMOKE_BASE_URL must be an HTTP(S) origin, e.g. https://alanwychen.github.io/',
  );
}

export default defineConfig({
  ...config,
  testIgnore: [],
  testMatch: '**/production.spec.js',
  fullyParallel: false,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report/production' }],
  ],
  outputDir: 'test-results/production',
  // Only post-deploy checks retry: Pages can take a moment to propagate.
  retries: 2,
  timeout: 45000,
  webServer: undefined,
  use: { ...config.use, baseURL },
});
