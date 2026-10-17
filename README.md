# Alan Chen — SWE portfolio

Source for [alanwychen.github.io](https://alanwychen.github.io/), owned and deployed directly by `AlanWYChen/AlanWYChen.github.io`. React/Vite application code, assets, dependencies, and browser tests all live in this repository. No submodules or cross-repository publishing credentials are needed.

The independent `AlanWYChen/tutoring` project deploys at `/tutoring/` from its own repository and Pages workflow. Neither site builds, imports, or publishes the other. There is no cross-site navigation.

## Local development

Requires Node.js 22.12+ (`.nvmrc` selects Node 22).

```sh
npm ci
npm run dev
npm run build
npm run verify
npm run preview
```

Build output is `dist/`. The static preview runs at `http://127.0.0.1:4173/` and serves real 404s for unknown paths. Use `npm run preview -- --port 4183` to choose another port. The Vite development server retains its usual development behavior.

## Checks

```sh
npx playwright install chromium
npm run format:check
npm run smoke
npm run smoke:production
```

`smoke` builds, verifies the output, and runs Playwright against a strict-port static production preview on port 4181. `npm run test:smoke` reuses an already-built artifact, but never reuses an existing server. Desktop, mobile, and narrow viewports cover rendering, lazy images, fragment navigation and refresh, keyboard focus, resume PDF validity, expected links, company card hover/tap, overflow, reduced motion, independent routing, and absence of cross-site navigation. Device-specific hover/tap tests intentionally skip inapplicable viewports.

`smoke:production` performs read-only checks against the public site, with bounded polling and two retries for Pages propagation. To test it locally, run a preview separately and use:

```sh
SMOKE_BASE_URL=http://127.0.0.1:4173/ npm run smoke:production
```

Google Fonts is replaced with system-font fallbacks in browser tests. External destinations are inspected without visiting them. Browser checks do not replace manual visual or accessibility review. Reports are in `playwright-report/`, with failure traces and screenshots in `test-results/`; production evidence uses the `production/` subdirectories. Open reports using `npx playwright show-report`.

## Publishing

Set repository **Settings → Pages → Source** to **GitHub Actions**. `.github/workflows/publish.yml` installs locked dependencies, checks formatting, builds, verifies output, and runs the full browser smoke suite. Only successful pushes to `main` or manual runs on `main` publish the exact tested `dist/` artifact. Pull requests only validate. A separate post-deployment job checks the live page, JavaScript content types, and resume PDF. Failure evidence is uploaded for seven days. A post-deployment failure flags the run; it does not automatically roll back a published site.

The workflow uses only the repository's `GITHUB_TOKEN`, with Pages and OIDC write permissions confined to the deployment job. No deploy keys, personal tokens, submodule updates, shared reusable workflow, or app assembly are involved. Build runs cancel obsolete runs on the same ref; deployments are serialized. Dependabot checks npm and Actions weekly on Monday at 09:00 America/Toronto.

## Editing

- `src/App.jsx`: page sections and navigation behavior.
- `src/components/CompanyCard.jsx`: company card interaction.
- `src/data/portfolio.js`: portfolio content and icon mapping.
- `src/styles.css`: responsive styling.
- `public/alan-chen-resume.pdf`: downloadable resume.
- `index.html`: metadata and canonical URL.
- `public/`: existing icons, logos, project image, and social preview.

Application source and public assets were copied unchanged from the former `swe-personal-site` submodule. Logo attribution and licensing are retained in `public/logos/tech/`. The existing `public/_headers` file is retained for hosts that support it; GitHub Pages does not apply that file as header configuration.

See [the migration notes](docs/repository-migration.md) for the repository transition and pending publication steps. `HANDOFF.md` records the previous architecture and is historical context.
