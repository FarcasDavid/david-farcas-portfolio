# David Farcas — professional portfolio

An experience-led, responsive portfolio for David Farcas, AI/ML Engineer & Full Stack Developer in Cluj-Napoca. About, Experience and Contact are static HTML views enhanced by small native JavaScript modules. Dark mode uses cobalt accents; light mode uses warm cream/ivory surfaces and deep indigo. Fonts and icons are self-hosted. There are no runtime packages, trackers or browser API keys. The contact form uses FormSubmit for email delivery.

## Run and verify

Requires Node.js 22 or later.

```sh
npm ci
npm run verify
npm run preview
```

Open http://localhost:4173. To change the port: `PORT=4174 npm run preview`. Rebuild and refresh after source edits; `npm run dev` serves the same built output. `npm run verify` runs the build, production checks and all behavior tests.

## Source map

- `src/index.html`: document shell and build-time HTML includes.
- `src/templates/pages/`: About, Experience and Contact views.
- `src/templates/sections/`: introduction, Tech Stack, results, certifications and individual experience cases.
- `src/templates/partials/`: shared head/icons/header/footer, message dialog and no-JavaScript fallback.
- `src/main.js`: composition root; supplies browser capabilities and coordinates features.
- `src/scripts/`: navigation, appearance, workflow and contact modules, plus editable workflow content.
- `src/styles.css`: ordered source stylesheet imports; feature styles live in `src/styles/`.
- `src/assets/`: self-hosted fonts/icons with licenses and a hash manifest.
- `cv/David_Farcas_2026_CV.tex` and `public/cv/David_Farcas_2026_CV.pdf`: approved CV source and download.
- `scripts/`: static assembly, production checks, preview server and Node tests.
- `dist/`: ignored, fully assembled deployable website. Never edit it directly.

The build assembles templates and bundles styles without external tooling. Native JavaScript modules load directly in the browser. Relative paths support a domain root or a GitHub Pages project subpath; no framework base-path rewrite is needed.

## Architecture and editing

[Architecture and module interfaces](docs/ARCHITECTURE.md) · [Editing guide and release checks](docs/MAINTENANCE.md)

Feature modules own their DOM behavior. A pure resolver owns route aliases. Contact delivery uses an injected adapter; provider-specific HTTP behavior stays outside the UI. Tests import the same interfaces the site uses, with simulated HTTP/storage/clocks where necessary. The architecture deliberately fits a small static portfolio.

The three views are About (`#about`), Experience (`#experience`) and Contact (`#contact`). Browser history and direct deep links work; the desktop tab bar becomes a mobile bottom dock. Keyboard arrows, Home, End and Space select tabs. `#home`, `#stack` and `#toolkit` remain supported aliases. With JavaScript disabled, all portfolio content remains readable and direct contact/CV links work.

## Content and contact

`docs/PROFILE.md` and the approved CV are the content sources of truth. Client work is anonymized, reported outcomes retain their scope, and proposed personal projects are not presented as finished work. David approved the verified website link in the CV on 16 October 2026; the refactor leaves the CV unchanged.

The Contact invitation and Email controls open a native dialog. Send message submits over HTTPS without leaving the site; success is shown only after explicit provider acceptance. Pending requests prevent duplicate sends and retain reassurance when slow. Activation, rejection, malformed responses and network failures keep the draft. Copy message and direct email are fallbacks. No mailbox credentials are shipped. See [delivery status and setup](docs/CONTACT_DELIVERY_OPTIONS.md).

## Publication and evidence

GitHub Pages is the public host at https://davidfarcas.ro. `.github/workflows/deploy.yml` builds, checks, tests and deploys pushes to `main`. The existing Sites preview remains owner-private. See [handoff status](HANDOFF_STATUS.md) for verified deployment results.

[Hosting](docs/HOSTING.md) · [Validation](docs/VALIDATION.md) · [Refactoring record](docs/REFACTORING.md) · [Rendered QA](docs/REDESIGN_QA.md) · [Reference audit](docs/REFERENCE_AUDIT.md) · [Project roadmap](docs/PROJECT_IDEAS.md) · [Asset sources/licenses](docs/ASSET_SOURCES.md)
