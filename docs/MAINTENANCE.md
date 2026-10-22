# Maintaining the portfolio

## Local workflow

Use Node.js 22 or later. Install the locked environment with `npm ci`, then run:

```sh
npm run verify
npm run preview
```

Open http://localhost:4173. `PORT=4174 npm run preview` selects another port. Source changes need `npm run build` and a browser refresh; the preview serves `dist/` and does not hot-reload. `npm run dev` is an alias for the same static server.

## Where to edit

| Change | Source |
| --- | --- |
| Title, metadata, fonts, main script | `src/templates/partials/document-head.html` |
| Navigation and header controls | `src/templates/partials/site-header.html` |
| Hero and overall About order | `src/templates/pages/about.html` |
| About paragraphs and education | `src/templates/sections/about-introduction.html` |
| Tech Stack categories | `src/templates/sections/tech-stack.html` |
| Result links and reported numbers | `src/templates/sections/result-highlights.html` |
| Experience order/employer | `src/templates/pages/experience.html` |
| Certifications and each major case | Named HTML files in `src/templates/sections/` |
| Contact invitation, social links, phone | `src/templates/pages/contact.html` |
| Contact form fields and delivery endpoint | `src/templates/partials/contact-dialog.html` |
| Footer or no-JavaScript fallback | Named files in `src/templates/partials/` |
| Workflow diagram text | `src/scripts/content/workflow-stages.js` |
| Colors and theme variables | `src/styles/tokens.css` |
| Feature layout/responsive rules | The matching feature file in `src/styles/` |
| Browser interactions | The matching feature folder in `src/scripts/` |

Use `docs/PROFILE.md` and the approved CV as content sources. New user-confirmed facts should be recorded in the profile before publication. Do not invent project completion, production status, credentials or client identities. Keep the approved LaTeX/PDF untouched unless David requests a CV update.

Use plain semantic HTML. Interactive controls should be native buttons or links with visible keyboard focus. Preserve IDs used by navigation, contact controls and saved URLs. A new top-level view needs a matching tab/panel pair; a new deep-link target also needs deliberate registration in the navigation module. The static checks should describe the intended behavior, rather than incidental whitespace or attribute order.

## Module changes

Read [Architecture](ARCHITECTURE.md) before changing interfaces. Keep provider-specific HTTP details inside `formsubmit-delivery.js`, and pass any replacement adapter from `main.js`. Keep feature imports one-way; cross-feature coordination belongs in the entry point. Do not introduce shared abstractions for a single trivial call or add runtime packages for work plain HTML/CSS/JavaScript already handles.

Use descriptive filenames that match their responsibility. Keep responsive/theme styles next to the feature they affect. Changes to stylesheet import order need visual checks, because later rules can override earlier ones. Do not edit `dist/`: it is regenerated and ignored by Git.

## Release checks

1. Run `npm run verify`; inspect the diff for unintended content, credentials or CV changes.
2. Review About, Experience and Contact on desktop and narrow phones in dark and light themes. Check Tech Stack wrapping, diagram selection, certifications, navigation, focus visibility and horizontal overflow.
3. Check keyboard arrows/Home/End/Space, browser Back/Forward, saved route aliases and case-study deep links. Check the theme survives reload.
4. Open and close the contact dialog from the invitation and Email controls; check required fields and focus return. Automated tests cover provider acceptance, pending/slow requests, unknown delivery and clipboard failures. Send a real message only when explicitly requested.
5. Verify email/telephone/profile destinations and the CV download. Run a no-JavaScript reading check when changing templates or fallback behavior.
6. Commit only deliberate source/documentation changes. Publish through the existing GitHub repository and configured GitHub Pages workflow. Follow the installed Sites workflow to update the existing private preview when available; preserve its project ID and audience.
7. Wait for a successful deployment. Confirm the public HTML, bundled CSS, JavaScript entry/modules and CV match the build. Record the actual result in `HANDOFF_STATUS.md`; a pushed commit alone does not prove the website is live.

No domain purchase, DNS change or paid service is needed for normal updates. Hosting setup and account-specific details are documented in [Hosting](HOSTING.md).
