# Handoff status

Updated 16 October 2026.

- Redesigned: five separate Overview, Experience, Toolkit, About and Contact views; near-black/white/orange/cobalt palette with no green; circular SVG CV/social controls; clickable priority skills; interactive system map; dark/light themes; desktop tab bar and mobile bottom dock.
- Latest refinements: Contact message composer (validated email draft plus copy fallback); concise Email labels; general Prepare → Inference → Evaluate → Deliver diagram; Overview fact cards deep-link to their matching Experience articles.
- Approved LaTeX/PDF CV preserved byte-for-byte. No portfolio URL added.
- Validation: production build, static contracts and independent functional/visual checks pass. All five views reviewed at 320px/390px and desktop, both themes; keyboard routing, history, skills/stages, clipboard fallback and exact CV bytes verified. See `docs/REDESIGN_QA.md`.
- Local preview: `npm ci && npm run build && npm run preview`, then http://localhost:4173.
- Public source published: https://github.com/FarcasDavid/david-farcas-portfolio. Connected account and repository ownership verified as FarcasDavid. Local main is synchronized with remote main via the GitHub connection; ordinary HTTPS Git authentication still fails.
- Public hosting recommendation: GitHub Pages. Workflow and exact setup steps are in `docs/HOSTING.md`. GitHub-hosted install, build and validation pass. Deployment stops at configure-pages because Pages is not enabled. Sign into GitHub, choose Settings → Pages → Source: GitHub Actions, then rerun the workflow. Browser settings access is blocked by the signed-out session.
- Integrated Sites preview: owner-private at https://david-farcas-portfolio.rockyglade2.chatgpt.site. Redesign deployment confirmed succeeded on 16 October 2026. The private host requires ChatGPT sign-in. The latest contact/workflow/evidence-link update was deployed and inspected in the hosted browser on 16 October 2026; the form and fact-specific navigation work there. The production build also passed local desktop/mobile QA. This is not the public portfolio host.
- Roadmap: `docs/PROJECT_IDEAS.md` recommends the DSPy/GEPA evaluation workbench first, then endurance analytics or the evaluation-first RAG assistant depending on hiring focus. No proposed project is presented as completed work.
- Reference: rendered desktop/mobile audit complete in `docs/REFERENCE_AUDIT.md`.
- No DNS, domain purchase, paid plan, confidential client assets, or proprietary source introduced.
