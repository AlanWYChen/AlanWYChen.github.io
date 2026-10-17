import { test, expect, expectNoOverflow } from './fixtures.js';

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('portfolio content and essential links remain readable', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(
      page.getByRole('heading', { level: 1, name: /Alan Chen/ }),
    ).toBeVisible();
    for (const text of [
      'Honours Bachelor of Computer Science, Co-op',
      'Agentic Workflows',
      'Model Context Protocol (MCP)',
      'A mobile side project I built.',
      'I focused on platform engineering and cloud infrastructure.',
    ]) {
      await expect(
        page.getByText(text, { exact: false }).first(),
      ).toBeVisible();
    }
    await expect(
      page.getByRole('link', { name: 'Visit company website' }),
    ).toHaveCount(3);
    for (const link of await page
      .getByRole('link', { name: 'Visit company website' })
      .all()) {
      await expect(link).toBeVisible();
      await expect(link.locator('..')).not.toHaveAttribute('inert');
    }
    await expect(page.getByRole('button', { name: /^About / })).toHaveCount(0);
    await expect(
      page.getByRole('link', { name: /View resume PDF/ }),
    ).toHaveAttribute('href', '/alan-chen-resume.pdf');
    await expect(
      page.getByRole('link', { name: 'GitHub profile' }),
    ).toHaveAttribute('href', 'https://github.com/AlanWYChen');
    await expect(
      page.getByRole('link', { name: 'alan.ch3n@gmail.com' }),
    ).toHaveAttribute('href', 'mailto:alan.ch3n@gmail.com');
    await page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'Tech stack' })
      .click();
    await expect(page.locator('#stack h2')).toBeInViewport();
    await expectNoOverflow(page);
  });
});

test('raw HTTP response contains portfolio text, links, and identity', async ({
  request,
}) => {
  const response = await request.get('/');
  expect(response.ok()).toBe(true);
  const html = await response.text();
  expect(html).toContain('<h1');
  expect(html).toContain('platform engineering and cloud infrastructure');
  expect(html).toContain('href="/alan-chen-resume.pdf"');
  const schema = JSON.parse(
    html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1],
  );
  expect(schema.mainEntity.name).toBe('Alan Chen');
  expect(schema.mainEntity.sameAs).toContain('https://github.com/AlanWYChen');
  const robots = await request.get('/robots.txt');
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain(
    'Sitemap: https://alanwychen.github.io/sitemap.xml',
  );
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain(
    '<loc>https://alanwychen.github.io/</loc>',
  );
});
