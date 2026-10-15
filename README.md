# David Farcas — professional portfolio

An experience-led, responsive portfolio for David Farcas, AI/ML Engineer & Full Stack Developer in Cluj-Napoca. Original editorial design, static HTML/CSS/JavaScript, and no runtime dependencies, trackers, backend, or API keys.

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
- `src/main.js`: accessible mobile navigation.
- `public/cv/David_Farcas_2026_CV.pdf`: approved downloadable CV, preserved unchanged.
- `cv/David_Farcas_2026_CV.tex`: approved editable CV source, preserved unchanged.
- `scripts/build.mjs`: copies `src/` and `public/` into ignored `dist/`.
- `scripts/check.mjs`: internal links, anchor/ID integrity, primary heading and approved PDF hash.

All asset and CV links are relative, so the build works at a domain root or GitHub Pages project subpath. No framework base-path rewrite is required. `BASE_PATH` is not consumed by this static build. Generated output and QA screenshots stay out of Git.

## Deployment and evidence

[Hosting comparison and exact steps](docs/HOSTING.md) · [Validation record](docs/VALIDATION.md) · [Reference audit](docs/REFERENCE_AUDIT.md) · [Content review](docs/CONTENT_REVIEW.md) · [Prioritized project roadmap](docs/PROJECT_IDEAS.md).

GitHub Pages is the recommended public host. `.github/workflows/deploy.yml` builds and deploys on pushes to `main` once Pages is enabled for GitHub Actions. See `HANDOFF_STATUS.md` for the actual publication status; a configured workflow alone does not establish a live deployment.

## Content integrity

`docs/PROFILE.md` and the approved CV are the source of truth. Professional client work is anonymized. Project recommendations are proposals, not finished work; there are no fabricated demos. Outcome figures retain their supplied scope. The CV must not gain a portfolio URL until the URL is verified and David requests the edit.
