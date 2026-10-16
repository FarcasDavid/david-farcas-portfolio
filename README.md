# David Farcas — professional portfolio

An experience-led, responsive portfolio for David Farcas, AI/ML Engineer & Full Stack Developer in Cluj-Napoca. A five-view application with an original near-black, white, orange and cobalt identity, circular SVG logo controls, interactive skills and a system explorer. Static HTML/CSS/JavaScript with no runtime dependencies, trackers, backend, or API keys.

## Run locally

Requires Node.js 22 or later.

```sh
npm ci
npm run build
npm run check
npm run preview
```

Open http://localhost:4173. `npm run dev` serves the built `dist/` directory too; rebuild after source edits and refresh. To change the port, use `PORT=4174 npm run preview`.

## Edit and build

- `src/index.html`: page content, metadata, contact links, semantic sections.
- `src/styles.css`: colors, layout, responsive behavior, focus and reduced-motion styles.
- `src/main.js`: view/hash/history routing, keyboard tabs, skill and system selectors, theme persistence, and email copying.
- `src/assets/`: self-hosted variable fonts and monochrome SVG logos, with licenses and a hash manifest.
- `public/cv/David_Farcas_2026_CV.pdf`: approved downloadable CV, preserved unchanged.
- `cv/David_Farcas_2026_CV.tex`: approved editable CV source, preserved unchanged.
- `scripts/build.mjs`: copies `src/` and `public/` into ignored `dist/`.
- `scripts/check.mjs`: internal links, anchor/ID integrity, primary heading and approved PDF hash.

All asset and CV links are relative, so the build works at a domain root or GitHub Pages project subpath. No framework base-path rewrite is required. `BASE_PATH` is not consumed by this static build. Generated output and QA screenshots stay out of Git.

## Deployment and evidence

[Hosting comparison and exact steps](docs/HOSTING.md) · [Validation record](docs/VALIDATION.md) · [Reference audit](docs/REFERENCE_AUDIT.md) · [Redesign reference](docs/REDESIGN_REFERENCE.md) · [Redesign QA](docs/REDESIGN_QA.md) · [Content review](docs/CONTENT_REVIEW.md) · [Prioritized project roadmap](docs/PROJECT_IDEAS.md).

GitHub Pages is the recommended public host. `.github/workflows/deploy.yml` builds and deploys on pushes to `main` once Pages is enabled for GitHub Actions. See `HANDOFF_STATUS.md` for the actual publication status; a configured workflow alone does not establish a live deployment.

## Content integrity

`docs/PROFILE.md` and the approved CV are the source of truth. Professional client work is anonymized. Project recommendations are proposals, not finished work; there are no fabricated demos. Outcome figures retain their supplied scope. The CV must not gain a portfolio URL until the URL is verified and David requests the edit.

## Editing the application

The five views are Overview (`#home`), Experience (`#experience`), Toolkit (`#stack`), About (`#about`), and Contact (`#contact`). Only the selected panel is shown; browser Back/Forward and direct hash links work. The desktop tab bar becomes a fixed bottom dock on mobile. Arrow keys, Home and End move between tabs. Without JavaScript all content remains available.

The Overview skill buttons update explanatory copy stored in the `skills` object in `src/main.js`; the diagram uses the `stages` object. Keep those explanations grounded in `docs/PROFILE.md`. `src/styles.css` starts with dark/light color tokens. Both themes exclude green, including the monochrome brand icons. `portfolio-theme` is the only stored browser preference. Reduced-motion preferences disable animation.

Font and icon licenses/source links are recorded in [ASSET_SOURCES.md](docs/ASSET_SOURCES.md). No personal projects are displayed.
