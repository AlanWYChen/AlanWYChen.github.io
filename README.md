# Alan Chen — Personal site

A static React portfolio built with Vite. Content is grounded in the supplied resume, with a dark, typography-led introduction, company logos, categorized tech stack, contact links, and a downloadable PDF.

## Run locally

Requires Node.js 22.12+ (Node 22 is specified in `.nvmrc`).

```sh
npm ci
npm run dev
```

Open the URL printed by Vite. To build and preview production output:

```sh
npm run build
npm run preview
```

The complete static website is generated in `dist/`. No server, database, environment variables, or paid services are required. Fonts load from Google Fonts with local fallbacks.

## Deploy to GitHub Pages (current host)

The repository `AlanWYChen/AlanWYChen.github.io` publishes at https://alanwychen.github.io/.

In **Settings → Pages → Build and deployment**, keep **Source: GitHub Actions**.
The workflow in `.github/workflows/build.yml` builds with `npm ci` and `npm run build`, uploads only `dist/`, and deploys on pushes to `main`. Pull requests run the build without publishing. You can also run the workflow manually from Actions.

Do not publish the source directory: its `index.html` references JSX that requires Vite compilation. This is a user site at the domain root, so Vite's default `/` base and the existing root-relative asset links are correct.

Official guide: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## Deploy to Cloudflare Pages

### Git integration (automatic deployments)

1. Push this project to a GitHub or GitLab repository.
2. In Cloudflare, open **Workers & Pages**, choose **Create application**, then select **Pages** and connect the repository.
3. Configure the build:
   - Framework preset: **React (Vite)**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: leave blank when this project is at the repository root.
   - Node version: `22` (use the `NODE_VERSION` build variable if needed).
4. Deploy. Cloudflare assigns a `pages.dev` address; a custom domain is optional.

### Direct upload (no repository required)

1. Run `npm run build`.
2. In Cloudflare Pages, create a **Direct Upload** project.
3. Upload the contents of `dist/` and deploy.

Do not upload the source folder or `node_modules`. Direct Upload and Git-integrated Pages projects have different workflows; choose Git integration initially if you want automatic builds from commits.

Official documentation: https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/

## Editing

- `src/main.jsx`: all content, companies, tech stack, sections, and links.
- `src/styles.css`: layout, colors, typography, responsive behavior.
- `public/alan-chen-resume.pdf`: replace to update the download. This is the original supplied PDF, including its contact details.
- `index.html`: page title, description, and social metadata.
- `public/favicon.svg`: site icon.
- `public/_headers`: security headers applied by Cloudflare Pages.

The company section lists roles without dates or performance metrics. Education is presented without attendance dates. Review the introductory copy before publishing to ensure it reflects your voice.

The site includes visible focus states, a skip link, semantic sections, and reduced-motion support. Contact actions use email and LinkedIn; there is no form backend.

## Logo sources

Local copies of official company assets are stored in `public/logos/`:

- Scrawlr: https://corporate.scrawlr.com/assets/scrawlr-default-logo-CpUOVOM7.png
- UKG: https://static.vscdn.net/images/careers/demo/ukg-sandbox/1758546413::primary-UKG-logo-dark-teal-RGB.png (UKG careers website)
- Metergy Solutions: https://cdn.prod.website-files.com/5f9c6d92db1af71866a9ca37/5fb679dc6fab3d4bf5b4be4d_Metergy_TM_Logo_w.svg (Metergy website)

Company marks belong to their respective owners. UKG is rendered in monochrome on the dark background.

Visual reference: https://www.andy-hk.com/ — dark background, large name typography, amber accents, and generous spacing; original content and implementation.

GitHub Actions builds the site on pushes and pull requests. Publishing uses GitHub Pages; Cloudflare remains an alternative.

Technology logos are locally hosted Devicon SVGs; source URLs and the upstream license are in `public/logos/tech/`. Waterloo’s official reversed colour logo comes from https://uwaterloo.ca/brand/uw-logos/university-logos/all. Technology badges support hover and keyboard-focus highlighting.

## Company introductions and Pick-pic

Company introductions support hover, keyboard focus, button toggling, and Escape. Sources:
- https://corporate.scrawlr.com/projects
- https://www.ukg.com
- https://www.metergysolutions.com

UKG uses the earlier smile wordmark requested by the owner, sourced from https://commons.wikimedia.org/wiki/File:UKG_(Ultimate_Kronos_Group)_logo.svg. UKG announced its subsequent rebrand on October 1, 2025.

The Pick-pic section uses the supplied swipe-voting screenshot unchanged. The screenshots with member emails and other demo content are not included. Project copy describes visible functionality and the owner's stated group-project context; no individual contribution, stack, or live app link is invented.
