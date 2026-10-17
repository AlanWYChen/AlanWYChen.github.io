import { test, expect, loadImages } from './fixtures.js';

test('portfolio loads and refreshes independently without tutoring navigation', async ({
  page,
  baseURL,
  siteHealth,
}) => {
  test.setTimeout(60000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect((await page.goto('/')).ok()).toBe(true);
  await expect(
    page.getByRole('heading', { level: 1, name: /Alan Chen/ }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole('heading', { level: 1, name: /Alan Chen/ }),
  ).toBeVisible();
  await loadImages(page);
  const links = await page
    .locator('a[href]')
    .evaluateAll((anchors) => anchors.map((anchor) => anchor.href));
  for (const href of links) {
    const url = new URL(href);
    if (url.origin === new URL(baseURL).origin) {
      expect(url.pathname).not.toMatch(/^\/(teach|tutoring)(?:\/|$)/);
    }
  }
  expect(siteHealth.assets.size).toBeGreaterThan(0);
  for (const asset of siteHealth.assets) {
    expect(new URL(asset).pathname).not.toMatch(/^\/(teach|tutoring)(?:\/|$)/);
  }
});

test('unknown paths return real 404s', async ({ page }) => {
  const response = await page.goto('/smoke-missing-page');
  expect(response.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(0);
});
