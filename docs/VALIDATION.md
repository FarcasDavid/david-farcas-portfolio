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
- Prepared Pages workflow with build artifact deployment, `main`/manual triggers, and minimal deployment token permissions. The corrected GitHub Actions run passed installation, production build and validation; configure-pages failed because Pages is not enabled.
- No domain, DNS, paid account, or hosting settings changed during this research.

## Final application checks

- `npm run build` passed on Node.js 22.23.2; `npm run check` passed anchor targets, local links, unique IDs, primary heading, and approved CV integrity.
- Independently inspected rendered screenshots in the in-app browser at desktop 1280×720 and mobile 390×844 and 320×740. Hero, experience metrics, and contact layouts were readable with no clipped headings observed. Document width equalled viewport width at all three sizes.
- Mobile menu expanded and collapsed. Escape closed it and returned focus to the menu button. Selecting the contact link closed the menu and navigated to the contact section. Back-to-top navigation worked.
- Opened the engineering disclosure and inspected its revealed content. Native disclosure semantics were present. Keyboard tabbing reached the hero action with a visible solid 3px outline. The parsed page had one main landmark and an ordered h1/h2/h3/h4 heading structure.
- Reviewed every rendered link target: correct profile URLs, email `mailto:farcas.david@yahoo.com`, telephone `tel:+40720806333`, existing section anchors, and relative CV paths. No messages were sent or calls initiated; external social login destinations were not exhaustively crawled.
- Downloaded the CV through the browser link and compared SHA-256: `e723ecc57ccd175d901a3450ab2ae83266e252335c80300e98c3bba16000853d`, exactly matching the approved PDF.
- Browser captured warning/error log was empty during these interactions. No font CDN, third-party script, or application dependency is required by the source. This is a source/resource review, not a Lighthouse performance score.
- Source includes reduced-motion CSS disabling smooth scrolling, animations, and transitions. CSS was reviewed; a later Playwright check emulated reduced motion and confirmed auto scroll behavior.
- GitHub Actions build/check execution is verified. Public-host verification remains pending Pages enablement. The static build uses relative asset/PDF links and does not consume a `BASE_PATH` environment variable.

Screenshots were inspected through the browser tool during QA; no generated reports or screenshots were added to Git. This is a focused browser and source review, not a complete assistive-technology certification.

## Integration follow-up

The owner also ran Playwright with installed Google Chrome at 1440×1000, 768×1024, 390×844 and 320×740: no horizontal overflow or page errors, one main landmark, menu/Escape/disclosure checks passed, and the PDF returned HTTP 200 with `application/pdf`. Reduced-motion emulation returned `scroll-behavior: auto`. Desktop hero and experience screenshots were inspected separately. A mobile metric wrap was identified and corrected by placing each before/after measurement on its own row, followed by a fresh build/check.

## Integrated deployment

The owner-private Sites deployment completed successfully (native status verified) at https://david-farcas-portfolio.rockyglade2.chatgpt.site. Public GitHub Pages hosting is separate and remains pending. The exact built artifact was packaged from committed source with the Sites helper; no credentials were written to this repository.

## Public source and Pages result

Public source is published in the intended FarcasDavid repository, with local main synchronized and a clean working tree. The first workflow exposed a check-before-build ordering defect; this was corrected and rerun from a clean install. [Run 38742141809](https://github.com/FarcasDavid/david-farcas-portfolio/actions/runs/38742141809) passes install/build/check, then fails configure-pages with Not Found and an explicit request to enable Pages for GitHub Actions. The signed-out browser cannot access repository settings. No public portfolio URL is claimed.

The deployed private Site was also inspected at 390×844: hero and mobile menu render correctly; Escape closes the menu. The PDF downloaded from the deployed link has the same approved SHA-256. The temporary viewport override was reset.

## Redesign — 16 October 2026

The initial design was replaced following direct user feedback. See `REDESIGN_REFERENCE.md`, `REDESIGN_QA.md` and `ASSET_SOURCES.md` for the renewed reference audit, independent visual review and licensed local assets.

The redesigned application has five active views, interactive skills and pipeline stages, circular SVG links, and dark/light themes without green. Functional tests passed in installed Chrome at 1440px, 390px and 320px: all view/keyboard/hash/history paths, all seven skills/four stages, theme persistence, blocked-storage/clipboard fallback, exact CV download bytes and no page errors. Static build checks verify the tab/panel mappings, links, mask assets, script syntax, approved PDF hash, focus and reduced-motion styles. Independent visual QA found and resolved the mobile dock, header opacity, tooltip overflow, focus outline, narrow icon-row wrapping and unsupported decorative data bars.

Saved viewport/full-page screenshots were inspected outside Git. The final local production artifact is approximately 360 KB on disk including fonts, SVGs, licenses and the approved PDF; this is a size observation, not a Lighthouse score.

The Sites deployment succeeded for source commit `0ab6f4e600e0a4f85a7af354f728d596d5db82c6` at https://david-farcas-portfolio.rockyglade2.chatgpt.site. The browser reached the private host's sign-in gate; ChatGPT session authentication is required for another hosted visual pass. Native deployment success is verified, and the exact local artifact was fully reviewed. No authentication protection was bypassed. Public Pages setup remains separate.

## Contact, workflow and evidence links — 16 October 2026

- Added the native Contact dialog with labeled required name/email/subject/message fields. Empty and invalid email submissions are blocked; copy-draft content includes the supplied fields and remains local until the visitor chooses their mail app. No email was sent during testing. Escape/close restore focus, input survives reopening, and desktop/390px/320px layouts have no overflow.
- The primary action is explicitly “Open email draft”; a Copy message fallback is available. No server delivery service is configured and no “sent” state is shown. Both Overview and Contact email circles are labeled “Email”.
- The diagram now explains a general Prepare → Inference → Evaluate → Deliver approach, with clean inputs, problem-led inference, measurable evaluation and reliable delivery. All four selections and the initial Prepare state were checked.
- All three Overview fact cards route to distinct Experience fragments. Desktop lands on the corresponding case-study card; phone layouts land on its evidence panel so the fact is visible above the navigation dock. Clicks, direct links, reload, Back/Forward, standard Experience navigation, focus and default/reduced-motion behavior pass at 1440px, 390px and 320px.
- Production build, updated static checks and whitespace checks pass. Browser verification found no page errors or outgoing message submissions. Screenshots were inspected outside Git; the approved CV is unchanged.

Publication follow-up: the contact/workflow/evidence update deployed successfully on 16 October 2026. The authenticated hosted tab was reloaded and verified to show the new general workflow and Email labels. The Call Quality card opened Experience directly at its 952-judgment fact; the hosted Contact button opened the named form with all four fields. No message was submitted.

## Direct contact delivery — 16 October 2026

- Replaced the mail-app draft handoff with FormSubmit HTTPS AJAX. Both Email circles and the orange Contact action open the same accessible native dialog. Required name/email/subject/message and length limits remain; Reply-To, a subject prefix, the current form URL and a provider-supported honeypot accompany the request. No mailbox credential or API key is used.
- Production build and static checks pass. Independent Node VM tests exercise the actual contact source with mocked DOM/fetch/timers: 13 scenarios cover validation, boolean/string success, pending activation, rejection, malformed/null JSON, HTTP/network failures, timeout, duplicate prevention, copy handling, and opener focus restoration. Only explicit provider acceptance resets the form; errors and activation retain the text. These simulations are not delivery evidence.
- The private Sites deployment for source `1d3697b3ed1b6b8815898319dfe3c962a1ef8bf0` succeeded. The hosted form was inspected at desktop 1440×1000 and mobile 390×844. Mobile dialog content scrolls to status/privacy/fallback details. Empty-submit validation, the new Email entry point, field input and Escape/focus return work on the hosted page. Browser DOM width equals the 390px viewport.
- With explicit user approval, exactly one real setup message was submitted from the deployed origin. FormSubmit returned the activation-pending state; fields were preserved and the page stayed on the website. No inbox receipt or completed recipient activation is claimed. David must click the activation email in `farcas.david@yahoo.com` (including Spam) and confirm that the held setup message arrives.
- No additional live requests were sent. The earlier automatic approval rejection was resolved by the user's explicit approval for that one FormSubmit setup test. No DNS, paid plan, account creation or audience changes were made. Approved CV bytes remain unchanged.
