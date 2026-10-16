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

## Slow-send correction and Pages readiness — 16 October 2026

David confirmed inbox activation and actual Yahoo receipt, including messages whose browser request had timed out. A regression using the actual contact source reproduced the false failure at 20 seconds before the fix. The client abort deadline was removed: immediate sending feedback, reassurance after eight seconds, no automatic retries, and success only on explicit provider acceptance. A request still pending after 120 seconds stays pending and locked. Genuine network failures preserve the text and explain that sending could not be confirmed. Fetch keepalive is enabled; bounded field sizes fit its request-body budget. Visible provider attribution was removed as requested.

Build/static checks and 22 meaningful contact regression scenarios pass. The workflow now runs `npm test`. A live post-activation API retest returned HTTP 200 with explicit success in 0.724 seconds. This is one measured request, not a latency guarantee. Hosted UI verification is recorded below after publication. Pages workflow/settings evidence and the custom-domain launch checklist are in `HOSTING.md`; no purchase, DNS or public-host setting was changed.

Hosted follow-up: source `2e5d0ed7650e9d2816d067a49e380c162b3402f6` deployed successfully. A fresh real submission through the hosted browser showed immediate sending feedback followed by “Message sent”, reset the fields, and stayed on the website. The mobile success state has no visible provider name. Existing Yahoo receipt was confirmed by David; the agent did not access the mailbox to independently verify the latest test.

All five views were smoke-tested at 1440×1000, 390×844, and 320×740: exactly one active panel and no horizontal overflow. All seven skills/four workflow steps and three fact-specific Experience destinations were exercised. Keyboard Home selected Overview; closing the form restored Email focus. Both theme controls work; desktop light and mobile dark screenshots were inspected. Contact/profile destinations match the approved links. The hosted header CV download SHA-256 equals `e723ecc57ccd175d901a3450ab2ae83266e252335c80300e98c3bba16000853d`, identical to the approved PDF. No browser errors were observed in the final check.

Launch assessment: code and workflow are ready for GitHub Pages; enabling Pages with GitHub Actions remains the account setup step. Publish to the default Pages URL first, then connect a chosen domain and recheck HTTPS/contact delivery from that origin. No final custom domain has been chosen or purchased.

The public-source commit `e80013d4ecd1af3737210917a76d9df4501767ef` was also checked by [GitHub Actions run 38918680760](https://github.com/FarcasDavid/david-farcas-portfolio/actions/runs/38918680760): installation, production build, static checks and all contact regression tests pass. The run stops only at `configure-pages`; upload and deployment are skipped because Pages still needs enabling.

## Accent palette comparison — 16 October 2026

Added a compact header picker for Orange, Cobalt, Crimson, Ultraviolet and Raspberry, with Cobalt as the default. Shared tokens cover filled controls, foreground highlights, diagram details, contact card, glows and metric surfaces. Main dark backgrounds and white text are retained. Local appearance preference persists independently from light/dark mode; no data leaves the browser. All five dark foreground/fill pairs measure at least 4.5:1 against their text/surface pair. Build/static checks and the existing 22 contact regressions pass. Hosted checks verify one active palette, distinct card fills, and a picker within the viewport at 1440px, 390px and 320px.

All five light-mode variants also select correctly. Reload preserves the saved choice; exactly one option remains pressed. Escape closes the picker and restores summary focus. Header blur was removed to prevent a repaint artifact when changing colors with the picker open. Final screenshots of cobalt and crimson were inspected; no horizontal overflow at 320px/390px.

## Electric accents and public launch — 16 October 2026

The four additional palettes now use high-chroma foregrounds and saturated fills instead of pastel highlights. Contrast checks against the raised dark surface and white text on filled controls meet 4.5:1. Build/static checks pass locally; GitHub Actions run 38921760800 passes the build, checks, all 22 contact regressions and public deployment. The live public document is the portfolio and its downloaded CV hash exactly matches the approved PDF. Public desktop palette selection was checked at 1440px with no horizontal overflow. David confirmed the new origin’s inbox activation; the next real browser send reached “Message sent” and reset fields. No latest inbox-receipt claim is made from browser acceptance alone.

## Fixed Cobalt and automatic display sizing — 16 October 2026

Removed palette markup, JavaScript, unused color tokens and picker styling; fixed vivid Cobalt in both themes and the favicon. Added no size control or stored zoom preference. Automatic body zoom is 125% at 1800×950 CSS-pixel viewports and 150% at 2300×1200; the default is 100%. Dialog max-height and root scroll padding compensate. Build and static checks pass; independent source review found no obvious issues. Hosted checks at 2560×1440, 1920×1080, 1440×900 and 390×844 report 1.5/1.25/1/1 scale respectively, no horizontal overflow, and header actions within the viewport. The large-scale native contact dialog fits within 1440px height. Large desktop and phone rendering inspected. No message was sent for this appearance-only change.

## Theme and navigation motion — 16 October 2026

Removed the redundant header CV link with its clipped tooltip; Overview, Contact and footer PDF links remain. Theme changes use a 420ms native view-transition crossfade where supported, with 360ms color transitions as a fallback. The navigation selection slides between tabs and panels enter with a short eased reveal. Fact-specific Experience links skip the reveal to keep their scroll targets steady. Reduced-motion preferences disable these animations. An independent source review found no blockers, including rapid theme toggling and keyboard semantics.

Local production-preview checks covered all five views at 1440×1000 and 390×844, keyboard tab navigation, rapid theme changes, contact-dialog opening/closing and a 2560×1440 layout with 150% scale. No horizontal overflow, multiple active panels or browser warnings/errors were observed. At 2K the selection indicator aligns with the active tab, and the Call Quality destination receives focus below the header. Desktop and mobile screenshots were inspected. No live email was submitted; the approved CV remains unchanged.

## Expanded experience and card contours — 16 October 2026

Added “Some of my results.” above the three Overview facts; all three main Experience cards use the same neutral border. Nine result/main/earlier-application cards share a decorative SVG outline that traces in cobalt on hover or keyboard focus, with a small lift and no pointer interception. Existing reduced-motion rules disable the transitions. Replaced collapsed engineering summaries with visible 4/3/4 implementation bullets and added three source-checked earlier application cards. The public confidentiality paragraph was removed as requested. Approved CV files remain unchanged.

Independent content research checked the final CV and the owner-requested older CV; a second source review found no blockers. Production build/static checks and all 22 contact regression tests pass. Desktop 1440×1000 and phone 390×844/320×740 views were inspected in dark/light themes, with no horizontal overflow. A mobile flex-order regression introduced by the results wrapper was found and fixed before publication. All three Overview destinations retain their hashes and focus targets; a settled phone platform destination places its evidence at 107px, below the 79px header. Source checks confirm identical main-card borders and preserved local asset/anchor/CV integrity. No live email was sent.
