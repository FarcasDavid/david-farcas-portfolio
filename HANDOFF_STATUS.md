# Handoff status

Updated 16 October 2026.

- Redesigned: five separate Overview, Experience, Toolkit, About and Contact views; near-black/white/orange/cobalt palette with no green; circular SVG CV/social controls; clickable priority skills; interactive system map; dark/light themes; desktop tab bar and mobile bottom dock.
- Latest refinements: Contact form with FormSubmit AJAX delivery, activated recipient and user-confirmed Yahoo receipt, plus copy fallback; concise Email labels; general Prepare → Inference → Evaluate → Deliver diagram; Overview fact cards deep-link to their matching Experience articles.
- Approved LaTeX/PDF CV preserved byte-for-byte. No portfolio URL added.
- Validation: production build, static contracts and independent functional/visual checks pass. All five views reviewed at 320px/390px and desktop, both themes; keyboard routing, history, skills/stages, clipboard fallback and exact CV bytes verified. See `docs/REDESIGN_QA.md`.
- Local preview: `npm ci && npm run build && npm run preview`, then http://localhost:4173.
- Public source published: https://github.com/FarcasDavid/david-farcas-portfolio. Connected account and repository ownership verified as FarcasDavid. Local main is synchronized with remote main via the GitHub connection; ordinary HTTPS Git authentication still fails.
- Public hosting: GitHub Pages is enabled with GitHub Actions. Run 38927432723 passed build/check/tests/deploy on 16 October 2026. David bought davidfarcas.ro and configured the Pages custom domain; the default Pages URL now redirects there. At 16:07 UTC on 16 October, all authoritative servers/public resolvers showed the old parking A93.115.53.130 plus three GitHub A records; GitHub A185.199.108.153 is missing. Owner must edit the old parking A to that missing GitHub value. www is correct. Local negative caching remains; HTTPS certificate provisioning/enforcement is pending. See docs/HOSTING.md for the exact correction. Keep Source set to GitHub Actions.
- Integrated Sites preview: owner-private at https://david-farcas-portfolio.rockyglade2.chatgpt.site. Redesign deployment confirmed succeeded on 16 October 2026. The private host requires ChatGPT sign-in. The latest contact/workflow/evidence-link update was deployed and inspected in the hosted browser on 16 October 2026; the form and fact-specific navigation work there. The production build also passed local desktop/mobile QA. This is not the public portfolio host.
- Roadmap: `docs/PROJECT_IDEAS.md` recommends the DSPy/GEPA evaluation workbench first, then endurance analytics or the evaluation-first RAG assistant depending on hiring focus. No proposed project is presented as completed work.
- Reference: rendered desktop/mobile audit complete in `docs/REFERENCE_AUDIT.md`.
- The agent has not purchased domains, changed DNS, incurred charges, or introduced confidential client assets or proprietary source. David purchased the domain and is configuring DNS through ROMARG.

- Direct email integration: Send message stays on the website; both Email circles open the form. David activated the recipient and confirmed actual Yahoo receipt. No browser secret or Yahoo credentials are used. The misleading 20-second client abort was removed: immediate pending feedback, reassurance for slow requests, and success only after acceptance. No provider branding appears in the form. A fresh direct API retest returned HTTP 200 and explicit acceptance in 0.724 seconds. Live provider response and inbox-delivery status are tracked in `docs/CONTACT_DELIVERY_OPTIONS.md`.

- Slow-send follow-up: deployed fix passed 22 contact regression tests and a real hosted submission with the “Message sent” state. All five views rechecked at desktop/390px/320px, skills/workflow/deep links and exact CV download passed. The subsequent Pages launch succeeded after David enabled GitHub Actions. The new custom-domain origin still needs a final form/HTTPS check after DNS resolves.

- Appearance comparison: header palette picker offers Orange, Cobalt (default), Crimson, Ultraviolet and Raspberry across all five views, with separate dark/light tokens and local preference persistence. Desktop and narrow-phone picker bounds, selection persistence and keyboard Escape/focus return verified. No green palette introduced.

- Vivid palette follow-up: replaced pastel highlight tokens with saturated electric cobalt, crimson, ultraviolet and raspberry; Orange remains the original baseline. White text and dark surfaces remain. GitHub Pages form activation confirmed by David; subsequent real browser submission returned “Message sent”.

- Final appearance: Cobalt is fixed and the palette picker is removed. No size switch was added. Automatic CSS scaling uses 125% on viewports at least 1800×950 and 150% at least 2300×1200; smaller windows retain original sizing. Dialog height and sticky-header scroll offsets account for scale.

- Expanded Experience: visible implementation bullets for all three lead cases; additional multimodal OCR, vehicle-listing and workforce/sales assistant cards sourced from David’s older CV and grouped under Nov 2024–Dec 2025. Removed the public confidentiality paragraph while retaining all content boundaries. Added “Some of my results.” above Overview metrics and consistent animated cobalt contours on result and experience cards.
