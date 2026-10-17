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
in each app. The root package has no dependencies. Re-run setup after changing
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

## Work on an app

App source belongs in its own repository. The submodule checkouts can be used
for development, or each app can be cloned elsewhere and worked on independently.

```sh
npm run dev:portfolio
npm run dev:teaching
```

Run the dev servers in separate terminals. Vite selects an available port; open
`/` for the portfolio or `/teach/` for teaching. Each repository has its own README
with editing and asset guidance.

Submodule initialization checks out a detached commit. Switch to `main` before
editing an app, and commit/push inside that repository first:

```sh
git -C apps/portfolio switch main
# Edit and verify the portfolio, then:
git -C apps/portfolio add .
git -C apps/portfolio commit -m "Update portfolio"
git -C apps/portfolio push origin main
git add apps/portfolio
git commit -m "Publish updated portfolio"
git push origin main
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
`AlanWYChen/AlanWYChen.github.io`. `.github/workflows/build.yml` recursively checks
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
