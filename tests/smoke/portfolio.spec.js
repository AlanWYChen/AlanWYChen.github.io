import { test, expect, expectNoOverflow, loadImages } from './fixtures.js';

const resumeName = 'View resume PDF (opens in a new tab)';
const company = (page) =>
  page.getByRole('article').filter({
    has: page.getByRole('heading', { name: 'Scrawlr', exact: true }),
  });
const about = (page) => page.getByRole('button', { name: 'About Scrawlr' });

async function expectFocusIndicator(locator) {
  await expect(locator).toBeFocused();
  await expect(locator).toBeInViewport();
  await expect
    .poll(() =>
      locator.evaluate((element) => {
        const style = getComputedStyle(element);
        return (
          style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0
        );
      }),
    )
    .toBe(true);
}

async function expectCardsAboveEducation(page) {
  const cards = page.getByRole('button', { name: /^About / });
  const education = page.getByRole('heading', {
    name: 'University of Waterloo',
    exact: true,
  });
  const educationTop = await education.evaluate(
    (element) => element.getBoundingClientRect().top,
  );
  for (const card of await cards.all()) {
    const bottom = await card
      .locator('..')
      .evaluate((element) => element.getBoundingClientRect().bottom);
    expect(bottom).toBeLessThanOrEqual(educationTop);
  }
}

async function expectSectionScrollComplete(page, id) {
  await expect
    .poll(
      () =>
        page.locator(`#${id}`).evaluate((section) => {
          const root = document.documentElement;
          const offset =
            parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
          const margin =
            parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
          const documentTop =
            section.getBoundingClientRect().top + window.scrollY;
          const target = Math.min(
            root.scrollHeight - window.innerHeight,
            Math.max(0, documentTop - offset - margin),
          );
          return Math.abs(window.scrollY - target) < 2;
        }),
      { message: `Navigation should finish scrolling to #${id}` },
    )
    .toBe(true);
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { level: 1, name: /Alan Chen/ }),
  ).toBeVisible();
});

test('page and all lazy-loaded images render without broken local assets', async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.getByRole('main')).toBeVisible();
  await expect(
    page.getByRole('navigation', { name: 'Main navigation' }),
  ).toBeVisible();
  await loadImages(page);
  await expectNoOverflow(page);
});

test('section links and refreshed fragments reach their sections', async ({
  page,
}) => {
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  for (const [name, id] of [
    ['Experience', 'experience'],
    ['Tech stack', 'stack'],
    ['Get in touch', 'contact'],
  ]) {
    await nav.getByRole('link', { name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id} h2`)).toBeInViewport();
    await expectSectionScrollComplete(page, id);
    await page.reload();
    await expect(page.locator(`#${id} h2`)).toBeInViewport();
  }
});

test('home controls return to the top and keyboard activation restores focus', async ({
  page,
}) => {
  const home = page.getByRole('link', { name: 'Alan Chen home', exact: true });
  const footer = page.getByRole('link', { name: 'Back to top', exact: true });
  await footer.scrollIntoViewIfNeeded();
  await home.click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await footer.scrollIntoViewIfNeeded();
  await footer.click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await footer.scrollIntoViewIfNeeded();
  await footer.focus();
  await expect(footer).toBeInViewport();
  await footer.press('Enter');
  await expect(page).toHaveURL(/#top$/);
  await expect(home).toBeFocused();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test('resume and outbound links retain their intended destinations', async ({
  page,
  request,
}) => {
  const resume = page.getByRole('link', { name: resumeName });
  await expect(resume).toHaveAttribute('href', '/alan-chen-resume.pdf');
  await expect(resume).toHaveAttribute('target', '_blank');
  const pdf = await request.get('/alan-chen-resume.pdf');
  expect(pdf.ok()).toBe(true);
  expect(pdf.headers()['content-type']).toContain('application/pdf');
  expect((await pdf.body()).subarray(0, 5).toString()).toBe('%PDF-');

  for (const [name, href] of [
    ['alan.ch3n@gmail.com', 'mailto:alan.ch3n@gmail.com'],
    ['LinkedIn profile', 'https://www.linkedin.com/in/alan-wy-chen'],
    ['GitHub profile', 'https://github.com/AlanWYChen'],
    ['View source on GitHub', 'https://github.com/AlanWYChen/Pick-Pic'],
  ]) {
    await expect(page.getByRole('link', { name, exact: true })).toHaveAttribute(
      'href',
      href,
    );
  }
  for (const [name, href] of [
    ['Scrawlr', 'https://corporate.scrawlr.com/projects'],
    ['UKG', 'https://www.ukg.com'],
    ['Metergy Solutions', 'https://www.metergysolutions.com'],
  ]) {
    const card = page
      .getByRole('article')
      .filter({ has: page.getByRole('heading', { name, exact: true }) });
    await expect(
      card.getByRole('link', {
        name: 'Visit company website',
        includeHidden: true,
      }),
    ).toHaveAttribute('href', href);
  }
  for (const link of await page.locator('a[target="_blank"]').all()) {
    await expect(link).toHaveAttribute('rel', /\b(noreferrer|noopener)\b/);
  }
});

test('skip link reaches main content using the keyboard', async ({ page }) => {
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expectFocusIndicator(skip);
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
  await expect(page.getByRole('main')).toBeInViewport();
});

test('critical controls have keyboard focus and collapsed card links are skipped', async ({
  page,
}) => {
  await page.mouse.move(0, 0);
  const controls = [
    page.getByRole('link', { name: 'Skip to content' }),
    page.getByRole('link', { name: 'Alan Chen home', exact: true }),
    ...['Experience', 'Tech stack', 'Get in touch'].map((name) =>
      page
        .getByRole('navigation', { name: 'Main navigation' })
        .getByRole('link', { name, exact: true }),
    ),
    page.getByRole('link', { name: resumeName }),
    page.getByRole('link', { name: /SCROLL TO EXPLORE/ }),
  ];
  for (const control of controls) {
    await page.keyboard.press('Tab');
    await expectFocusIndicator(control);
  }
  for (const name of ['Scrawlr', 'UKG', 'Metergy Solutions']) {
    const button = page.getByRole('button', { name: `About ${name}` });
    await page.keyboard.press('Tab');
    await expectFocusIndicator(button);
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(button).toHaveAttribute('aria-expanded', 'false');
  }
  await expect(
    page.getByRole('link', { name: 'Visit company website' }),
  ).toHaveCount(0);
});

test('mouse hover expands a card without moving the education section', async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, 'Hover is covered on desktop; mobile uses tap.');
  await about(page).scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  const education = page.getByRole('heading', {
    name: 'University of Waterloo',
    exact: true,
  });
  const position = () =>
    education.evaluate(
      (element) => element.getBoundingClientRect().top + window.scrollY,
    );
  const before = await position();
  await company(page).hover();
  await expect(about(page)).toHaveAttribute('aria-expanded', 'true');
  await expect(
    company(page).getByRole('link', { name: 'Visit company website' }),
  ).toBeVisible();
  await expect.poll(position).toBe(before);
  await expectCardsAboveEducation(page);
  await page.mouse.move(0, 0);
  await expect(about(page)).toHaveAttribute('aria-expanded', 'false');
  await expect(
    company(page).getByRole('link', { name: 'Visit company website' }),
  ).toHaveCount(0);
});

test('tap expands a company card without overlapping later content', async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, 'Touch interaction is covered on mobile viewports.');
  await about(page).tap();
  await expect(about(page)).toHaveAttribute('aria-expanded', 'true');
  await expect(
    company(page).getByRole('link', { name: 'Visit company website' }),
  ).toBeVisible();
  await expectCardsAboveEducation(page);
  await expectNoOverflow(page);
});

test('navigation and resume remain usable at the configured viewport', async ({
  page,
}) => {
  await expectNoOverflow(page);
  const header = page.getByRole('banner');
  for (const link of await header.getByRole('link').all()) {
    await expect(link).toBeInViewport();
  }
  await header.getByRole('link', { name: 'Experience', exact: true }).click();
  await expect(page.locator('#experience h2')).toBeInViewport();
  await expect(page.getByRole('link', { name: resumeName })).toBeInViewport();
  await expectNoOverflow(page);
});

test('reduced-motion mode retains navigation and card interaction', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect
    .poll(() =>
      page.evaluate(
        () => getComputedStyle(document.documentElement).scrollBehavior,
      ),
    )
    .toBe('auto');
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Experience', exact: true })
    .click();
  await expect(page.locator('#experience h2')).toBeInViewport();
  await page.mouse.move(0, 0);
  await about(page).focus();
  await about(page).press('Enter');
  await expect(about(page)).toHaveAttribute('aria-expanded', 'true');
  await about(page).press('Escape');
  await expect(about(page)).toHaveAttribute('aria-expanded', 'false');
  await page
    .getByRole('link', { name: 'Alan Chen home', exact: true })
    .press('Enter');
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});
