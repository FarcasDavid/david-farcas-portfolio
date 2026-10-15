# Validation record

Validation date: 15 October 2026. This record distinguishes completed checks from remaining checks; it is not a claim of public deployment.

## Baseline integrity

The approved CV was checked before implementation. SHA-256:

- `cv/David_Farcas_2026_CV.tex`: `28c819a669391ec9c92baea32ab0a7ce21ed9671c8870f99f2f64e2491a5adc9`
- `public/cv/David_Farcas_2026_CV.pdf`: `e723ecc57ccd175d901a3450ab2ae83266e252335c80300e98c3bba16000853d`

The PDF is recognized as a PDF 1.5 document. A successful download check must compare its bytes against the approved PDF, not merely confirm HTTP 200.

## Hosting configuration

- Verified `origin` matches the user-supplied repository and remote HEAD is `main` using read-only Git operations.
- Researched current official GitHub Pages, Cloudflare Pages, and Vercel documentation; linked sources and practical setup are in `HOSTING.md`.
- Prepared Pages workflow with build artifact deployment, `main`/manual triggers, and minimal deployment token permissions. Workflow execution remains unverified until it runs on GitHub.
- No domain, DNS, paid account, or hosting settings changed during this research.

## Final application checks

- `npm run build` passed on Node.js 22.23.2; `npm run check` passed anchor targets, local links, unique IDs, primary heading, and approved CV integrity.
- Independently inspected rendered screenshots in the in-app browser at desktop 1280×720 and mobile 390×844 and 320×740. Hero, experience metrics, and contact layouts were readable with no clipped headings observed. Document width equalled viewport width at all three sizes.
- Mobile menu expanded and collapsed. Escape closed it and returned focus to the menu button. Selecting the contact link closed the menu and navigated to the contact section. Back-to-top navigation worked.
- Opened the engineering disclosure and inspected its revealed content. Native disclosure semantics were present. Keyboard tabbing reached the hero action with a visible solid 3px outline. The parsed page had one main landmark and an ordered h1/h2/h3/h4 heading structure.
- Reviewed every rendered link target: correct profile URLs, email `mailto:farcas.david@yahoo.com`, telephone `tel:+40720806333`, existing section anchors, and relative CV paths. No messages were sent or calls initiated; external social login destinations were not exhaustively crawled.
- Downloaded the CV through the browser link and compared SHA-256: `e723ecc57ccd175d901a3450ab2ae83266e252335c80300e98c3bba16000853d`, exactly matching the approved PDF.
- Browser captured warning/error log was empty during these interactions. No font CDN, third-party script, or application dependency is required by the source. This is a source/resource review, not a Lighthouse performance score.
- Source includes reduced-motion CSS disabling smooth scrolling, animations, and transitions. Preference emulation was not performed in the in-app browser; this behavior was inspected in CSS.
- GitHub Actions execution and public-host verification remain pending. The static build uses relative asset/PDF links and does not consume a `BASE_PATH` environment variable.

Screenshots were inspected through the browser tool during QA; no generated reports or screenshots were added to Git. This is a focused browser and source review, not a complete assistive-technology certification.

## Integration follow-up

The owner also ran Playwright with installed Google Chrome at 1440×1000, 768×1024, 390×844 and 320×740: no horizontal overflow or page errors, one main landmark, menu/Escape/disclosure checks passed, and the PDF returned HTTP 200 with `application/pdf`. Reduced-motion emulation returned `scroll-behavior: auto`. Desktop hero and experience screenshots were inspected separately. A mobile metric wrap was identified and corrected by placing each before/after measurement on its own row, followed by a fresh build/check.

## Integrated deployment

The owner-private Sites deployment completed successfully (native status verified) at https://david-farcas-portfolio.rockyglade2.chatgpt.site. Public GitHub Pages hosting is separate and remains pending. The exact built artifact was packaged from committed source with the Sites helper; no credentials were written to this repository.
