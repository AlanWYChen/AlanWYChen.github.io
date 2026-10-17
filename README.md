# alanwychen.github.io — deployment

This repository assembles two independent apps into one GitHub Pages deployment:

| URL                                 | Git submodule    | Source repository                                                              |
| ----------------------------------- | ---------------- | ------------------------------------------------------------------------------ |
| https://alanwychen.github.io/       | `apps/portfolio` | [swe-personal-site](https://github.com/AlanWYChen/swe-personal-site)           |
| https://alanwychen.github.io/teach/ | `apps/teaching`  | [teaching-personal-site](https://github.com/AlanWYChen/teaching-personal-site) |

The apps have separate dependencies, source, styles, assets, and builds. They do
not share a React router, shell, navigation, or links to one another. Only their
hosting origin and deployment are shared. Because they share an origin, browser
storage and cookies are not security-isolated; use distinct keys if storage is
introduced later.

The teaching app currently contains a minimal placeholder. Its content and design
will be implemented separately. The portfolio is preserved as-is, including Git
history in its own repository.

## Clone and build

Requires Git and Node.js 22.12+ (Node 22 is specified in `.nvmrc`).

```sh
git clone --recurse-submodules https://github.com/AlanWYChen/AlanWYChen.github.io.git
cd AlanWYChen.github.io
npm run setup
npm run build
npm run verify
npm run preview
```

`setup` initializes the recorded submodule commits and runs `npm ci` independently
in each app. The root package contains browser-testing tools only; app dependencies remain separate. Re-run setup after changing
submodule revisions or dependency lockfiles.

`build` builds each app with its own Vite installation, with base `/` for the
portfolio and `/teach/` for teaching. It copies the portfolio output to `dist/`
and the teaching output to `dist/teach/`, then adds `.nojekyll`. A portfolio
output named `teach` is rejected to prevent overwriting files. Only the root
`dist/` is uploaded to Pages.

`verify` checks entry pages, asset paths and existence, and byte-for-byte
preservation of the portfolio output during composition.

`preview` serves the assembled output at http://127.0.0.1:4173/ and
http://127.0.0.1:4173/teach/. The `/teach` path redirects to `/teach/`, just as a
static directory does on Pages. Unknown paths return 404; there is no shared SPA
fallback.

## Development

From this repository's root, start both apps with live updates:

```sh
npm run dev
```

Open http://127.0.0.1:5173/ for the portfolio and
http://127.0.0.1:5173/teach/ for teaching. The command runs each app's own Vite
server and proxies `/teach/` through the portfolio server, including hot updates.
Press Ctrl+C to stop both. If port 5173 is busy, Vite selects the next available
port; use the URLs printed in the terminal.

## Work on an app

App source belongs in its own repository. The submodule checkouts can be used
for development, or each app can be cloned elsewhere and worked on independently.

```sh
npm run dev:portfolio
npm run dev:teaching
```

These commands start an individual app. When running both individually, use
separate terminals. Vite selects an available port; open
`/` for the portfolio or `/teach/` for teaching. Each repository has its own README
with editing and asset guidance.

Submodule initialization checks out a detached commit. Switch to `main` before
editing an app, and commit/push inside that repository:

```sh
git -C apps/portfolio switch main
# Edit and verify the portfolio, then:
git -C apps/portfolio add .
git -C apps/portfolio commit -m "Update portfolio"
git -C apps/portfolio push origin main
# App CI updates this deployment repository and triggers Pages automatically.
# After it completes, synchronize your local deployment checkout:
git pull --ff-only
git submodule update --init --recursive
```

Use `apps/teaching` for teaching changes. Keep app commits out of this repository;
this repository records only their commit IDs plus build/deployment configuration.

## Pull the latest apps and publish

Submodules pin exact commits so a deployment can be reproduced. Building or
manually dispatching the deployment workflow uses those commits; it does not
silently switch to newer app code. To pull both apps' latest `main` revisions:

```sh
npm run update:apps
npm run setup
npm run build
npm run verify
git add apps/portfolio apps/teaching
git commit -m "Update deployed apps"
git push origin main
```

To update only one app:

```sh
git submodule update --init --remote apps/teaching
```

Then run setup/build/verify and commit that submodule pointer. Start with clean
app working trees before updating. Pushes to either app's `main` branch validate that app, then automatically
commit its new submodule pointer here. The resulting push triggers the combined
Pages deployment. Simultaneous app updates retry against the latest deployment
commit, preserving both pointers. Obsolete app runs skip publication. Failed
validation never updates a deployed pointer.

Each app has a dedicated SSH deploy key with write access only to this deployment
repository. The private key is stored as its `COMPOSITE_DEPLOY_KEY` Actions secret;
the matching public key is registered under this repository's deploy keys.
`COMPOSITE_AUTO_DEPLOY=true` is an Actions variable in each app repository that
enables automatic publication. Disable that variable to pause automatic updates.
Do not replace the deploy key with the app's default `GITHUB_TOKEN`: that token
cannot write across repositories, and token-authored pushes do not trigger new
workflows. The deploy keys are intended only for these validation-gated updates;
protect app `main` branches if adding outside collaborators.

To rotate a key, create a fresh SSH key pair, add its public key as a writable
deploy key here, replace the corresponding app's `COMPOSITE_DEPLOY_KEY` secret,
then remove the previous public key. Neither private keys nor tokens belong in
source control. Manual pointer updates above continue to work independently.

## GitHub Pages

Keep **Settings → Pages → Build and deployment → Source: GitHub Actions** in
`AlanWYChen/AlanWYChen.github.io`. `.github/workflows/publish.yml` recursively checks
out both public submodules, installs and checks each app, builds and verifies the
combined output, and deploys it on pushes to `main`. Pull requests validate without
publishing. Manual workflow dispatch republishes the recorded commits.

The app repositories validate and update their own submodule pointers here;
this repository alone deploys Pages.
If they are made private later, the deployment checkout needs an explicitly
configured token that can read them.

Teaching assets must stay under `/teach/`; use Vite's `BASE_URL` conventions.
If client-side routes are introduced, use hash routing or generate real HTML
pages. GitHub Pages does not provide server-side SPA history rewrites.

## Shared app publishing workflow

Each app has a small `.github/workflows/publish.yml` caller:

```yaml
jobs:
  publish:
    uses: AlanWYChen/AlanWYChen.github.io/.github/workflows/deploy-alanwychen.yml@main
    with:
      app-path: apps/portfolio # apps/teaching in the teaching repository
    secrets:
      COMPOSITE_DEPLOY_KEY: ${{ secrets.COMPOSITE_DEPLOY_KEY }}
```

The reusable `.github/workflows/deploy-alanwychen.yml` in this repository owns
app dependency installation, formatting checks, compilation, and publication of
the validated submodule commit. Changes to that shared workflow apply to both
apps through `@main`. The GitHub event, repository, commit SHA, variables, and
secret come from the calling app. Pull requests run checks; only pushes to an
app's `main` branch update the deployment repository. The root `publish.yml`
then assembles both apps and publishes the single Pages artifact.

## Browser smoke tests

Requires Node.js 22.12+ and installed dependencies. On a fresh checkout:

```sh
npm run setup
npx playwright install chromium
```

Run all app and composite checks from the root:

```sh
npm run smoke
```

This builds both production bundles, verifies assembly, runs the portfolio and
teaching suites, then tests the assembled site. Playwright starts and stops its
own previews on ports 4180–4182. It never reuses an existing dev server; free the
affected test port if it is already occupied. `npm run dev` is independent.

For an individual app, run `npm run smoke` inside its repository, or use
`npm --prefix apps/portfolio run smoke` / `npm --prefix apps/teaching run smoke`.
After building, `npm run test:smoke` runs all suites without rebuilding;
`npm run test:smoke:composite` runs just the assembly's browser checks.

App suites use Chromium at desktop (1440×900), mobile (390×844), and narrow
(320×568) viewports. Portfolio checks cover navigation/fragment refresh, return to
top, resume validity, link destinations, keyboard/focus behavior, company cards,
lazy-loaded images, overflow, and reduced motion. Teaching checks cover its current
placeholder at `/teach/`. Composite checks cover direct loads/refresh, path and
asset separation, absence of cross-app links, redirects, and genuine 404s.

Local browser checks do not retry failures. Reports are written to each tested
repository's `playwright-report/`; traces and failure screenshots go to
`test-results/`. Both directories are ignored by Git. To inspect a report:

```sh
npx playwright show-report
# From the root, inspect the portfolio report instead:
npx playwright show-report apps/portfolio/playwright-report
```

The shared app workflow runs each app's suite after compiling and before updating
its deployed submodule pointer. Root `publish.yml` runs the composite suite before
uploading the exact checked artifact. Failed jobs upload available reports,
traces, and screenshots for seven days.

After a successful Pages deployment, a separate job checks both live entry pages,
their local JavaScript, and the resume PDF. This read-only production suite allows
up to two retries for propagation; it reports failures without automatic rollback.
Run it manually with:

```sh
npm run smoke:production
# Or check an already-running local static preview:
SMOKE_BASE_URL=http://127.0.0.1:4173/ npm run smoke:production
```

The production command never starts a server or deploys anything. Its report is
written to `playwright-report/production/`, preserving the composite report.
Browser tests use system-font fallbacks and do not depend on Google Fonts or visit outbound
links. They catch uncaught application errors and failed local assets. They do
not prove accessibility compliance or visual quality; manual screen-reader,
contrast, zoom, and design review remain necessary when the related UI changes.
There is no unit-test suite for static copy. Add focused unit/component tests as
nontrivial application logic emerges.

See [the smoke-test scope](docs/browser-smoke-test-plan.md) for acceptance criteria
and the local skill guidance that informed this implementation.
