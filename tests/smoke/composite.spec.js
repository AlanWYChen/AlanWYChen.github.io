import { test, expect, loadImages } from './fixtures.js';

for (const [path, name] of [
  ['/', /Alan Chen/],
  ['/teach/', /^Teaching$/],
]) {
  test(`${path} renders independently on navigation and refresh`, async ({
    page,
    baseURL,
    siteHealth,
  }) => {
    test.setTimeout(60000);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const response = await page.goto(path);
    expect(response.ok()).toBe(true);
    await expect(page.getByRole('heading', { level: 1, name })).toBeVisible();
    await page.reload();
    await expect(page.getByRole('heading', { level: 1, name })).toBeVisible();
    await loadImages(page);

    const links = await page
      .locator('a[href]')
      .evaluateAll((anchors) => anchors.map((anchor) => anchor.href));
    for (const href of links) {
      const url = new URL(href);
      if (url.origin !== new URL(baseURL).origin) continue;
      if (path === '/') expect(url.pathname).not.toMatch(/^\/teach(?:\/|$)/);
      else expect(url.pathname).toMatch(/^\/teach(?:\/|$)/);
    }
    expect(siteHealth.assets.size).toBeGreaterThan(0);
    for (const asset of siteHealth.assets) {
      if (path === '/')
        expect(new URL(asset).pathname).not.toMatch(/^\/teach(?:\/|$)/);
      else expect(new URL(asset).pathname).toMatch(/^\/teach\//);
    }
  });
}

test('static routing redirects /teach and returns real 404s for unknown paths', async ({
  page,
  request,
}) => {
  const redirect = await request.get('/teach?source=smoke', {
    maxRedirects: 0,
  });
  expect(redirect.status()).toBe(301);
  expect(redirect.headers().location).toBe('/teach/?source=smoke');
  await page.goto('/teach');
  await expect(page).toHaveURL(/\/teach\/$/);
  await expect(
    page.getByRole('heading', { name: 'Teaching', exact: true }),
  ).toBeVisible();
  for (const path of ['/smoke-missing-page', '/teach/smoke-missing-page']) {
    const response = await page.goto(path);
    expect(response.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(0);
  }
});
