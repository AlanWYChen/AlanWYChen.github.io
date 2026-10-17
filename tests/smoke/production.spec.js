import { test, expect } from './fixtures.js';

async function waitForEntry(request, path) {
  await expect
    .poll(async () => (await request.get(path)).status(), {
      message: `Deployed resource should become available: ${path}`,
      timeout: 15000,
      intervals: [1000, 3000, 5000],
    })
    .toBe(200);
}

for (const [path, name] of [
  ['/', /Alan Chen/],
  ['/teach/', /^Teaching$/],
]) {
  test(`deployed ${path} renders with working local JavaScript`, async ({
    page,
    request,
    baseURL,
  }) => {
    await waitForEntry(request, path);
    const response = await page.goto(path);
    expect(response.ok()).toBe(true);
    await expect(page.getByRole('heading', { level: 1, name })).toBeVisible();
    const scripts = await page
      .locator('script[src]')
      .evaluateAll((elements) => elements.map((element) => element.src));
    const localScripts = scripts.filter(
      (src) => new URL(src).origin === new URL(baseURL).origin,
    );
    expect(localScripts.length).toBeGreaterThan(0);
    for (const src of localScripts) {
      if (path === '/teach/')
        expect(new URL(src).pathname).toMatch(/^\/teach\//);
      else expect(new URL(src).pathname).not.toMatch(/^\/teach\//);
      const asset = await request.get(src);
      expect(asset.ok()).toBe(true);
      expect(asset.headers()['content-type']).toMatch(/javascript/);
    }
  });
}

test('deployed resume is a readable PDF', async ({ request }) => {
  await waitForEntry(request, '/alan-chen-resume.pdf');
  const response = await request.get('/alan-chen-resume.pdf');
  expect(response.ok()).toBe(true);
  expect(response.headers()['content-type']).toContain('application/pdf');
  expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-');
});
