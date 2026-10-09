# Web production audit

Scope: static React portfolio redesign, applying production-engineering-skills/web.

## Verified

- Production build passes; output is static Cloudflare Pages-compatible `dist/`.
- Official company logos are local, small files with explicit display dimensions and alternative text.
- Main navigation targets exist; email points to `mailto:alan.ch3n@gmail.com`; the contact-section LinkedIn link retains the supplied profile.
- Desktop and 390px/320px layouts have no horizontal overflow; company and contact layouts visually inspected.
- Semantic landmarks, one h1, ordered section headings, skip link, keyboard-native anchors, visible focus, and reduced-motion support.
- Browser reports no console errors.
- Source sweep found no TODO, FIXME, debugger, console.log, placeholder domains, or empty hash links.
- No form, login, database, application secrets, analytics, or backend workflows are present; corresponding auth/data/form checks do not apply.
- Metadata and favicon match the updated presentation. Existing Cloudflare security headers retained.
- GitHub Actions installs from lockfile and builds on pushes and pull requests; remote execution awaits pushing the repository.

## Remaining findings

### Low — index.html / deployment

Canonical URL and sitemap are deferred until the final public domain is known. Add the actual production origin after deployment rather than inventing a domain.

### Low — src/styles.css

Google Fonts is an external dependency. System font fallbacks prevent blocked content; self-host fonts if removing external font requests becomes a requirement.

No Critical or High findings identified in this scoped review. This is not a formal accessibility certification or a measured Core Web Vitals audit.

## Portfolio simplification follow-up

Removed repeated hero links and all displayed company/education dates. Added official Waterloo logo, 32 local Devicon logos, SQLite, and a standalone Observability category. Removed AI and automation items. Verified local images load, keyboard focus has a visible outline, 320px/390px layouts do not overflow, and production build passes. Logo sources and Devicon license are retained. No new Critical or High findings.

## Company introductions and side project follow-up

Company copy was checked against official sites. Added the requested legacy UKG smile wordmark, hover disclosures with button/keyboard access, and Escape dismissal. Pick-pic uses one supplied screenshot with no member contact information; the member-invitation screenshot is excluded. Production build passes. No new Critical or High findings in this scoped review.

## Responsive layout follow-up

Company cards animate grid fractions from equal thirds to 2:1:1 with a fixed row height. Verified the education document position is unchanged when a card expands. Header remains at viewport top when scrolled. Hero bottom text and scroll cue fit at 1440×900, 1280×600, 390×844, 320×568, and 844×390; no horizontal overflow. Education is centered. Hidden company descriptions are inert and excluded from assistive technology; buttons support keyboard activation and Escape. Reduced-motion disables transitions.

## Header resume and home links

Moved resume to a distinct amber PDF link in the sticky header; section links remain a separate navigation group. Narrow-screen CSS uses a second navigation row. Both header and footer home links were browser-verified to set scrollY to 0 and move focus to the header logo. The anchor target is no longer the sticky header. Build and diff checks pass. Desktop header visually verified. Responsive viewport override did not apply in this browser session, so mobile visual verification for this follow-up is unconfirmed.

## AI capabilities follow-up

Merged cloud, delivery, and observability tools; added the eight owner-approved AI & Agent Engineering skills. Generic capabilities use small local SVG interface icons rather than invented brand logos. Browser verified all tech icons load, eight AI skills appear, no horizontal overflow at the current desktop viewport, and the hover/focus styling is retained. Build and diff checks pass.

## Housekeeping audit

Applied the web and React guidance from `.skills/production-engineering-skills/`. Separated static portfolio data and CompanyCard from the page component, added Prettier formatting commands and a CI format check, removed 14 selectors for absent UI and two unused assets, and corrected outdated README statements. Browser comparison of 289 elements found identical leaf text, bounding rectangles, and sampled computed styles before/after. Company activation, Escape, and return-to-top remain checked. No feature or content changes to the rendered site were introduced. Production build and format check pass; source scan has no TODO/FIXME/debugger/console.log or placeholder URLs. No new Critical or High findings. Existing limitations around unmeasured Core Web Vitals and unverified formal accessibility compliance remain.

## Education and toolkit balance

Added an explicit Education label while preserving the owner-approved experience introduction. Changed toolkit to two wider columns, with a single column below 540px, to reduce wrapping in long categories. Fixed category symbols to a non-shrinking, non-wrapping width; browser verified all six symbol heights are equal and no horizontal overflow at the current 596px viewport. Production build passes. All skills and icons are retained.

## Cyan-blue theme update

Replaced amber with Bilibili-inspired #00a1d6, including focus rings, headings, resume action, links, and favicon. Hover surfaces and borders use coordinated cool blue tokens. Accent text and dark button text maintain at least 4.5:1 contrast against the relevant backgrounds. Original company/technology logo colors are preserved. Build, formatting, and diff checks pass.
