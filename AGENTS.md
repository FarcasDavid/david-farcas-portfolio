# Repository instructions

## Objective and workflow

Build David Farcas's professional portfolio using CODEX_PROMPT.md and docs/ as the handoff. The user explicitly requested parallel agents: delegate a rendered reference audit, content/project recommendations, and implementation/QA as useful. Coordinate file ownership; do not let concurrent agents edit the same files. Read applicable installed skills, including Sites when applicable, before using their workflows. Keep source portable and committed in this repository.

## Content integrity

- Treat cv/David_Farcas_2026_CV.tex and public/cv/David_Farcas_2026_CV.pdf as the approved CV. Do not rewrite them or add a speculative portfolio URL. Add the final verified URL to the CV only when requested.
- Use docs/PROFILE.md to distinguish confirmed facts, user-reported measurements, and unknowns. Do not invent results, client identities, dates, deployments, testimonials, credentials, or personal-project completion.
- Protect NDA boundaries. Use descriptive project headings and broad industry labels. Never publish proprietary source, internal project names, client data, real emails, transcripts, screenshots, or secrets. Do not copy neighboring Archive folders into this repository.
- Use clear searchable keywords: RAG, DSPy, GEPA, HuggingFace Transformers, FastAPI, PostgreSQL, AWS Bedrock. Never abbreviate HuggingFace to HF.
- Explain each major technology through the problem it solves and the outcome. Maintain clear personal ownership and professional strengths, not just tool lists.
- Email drafting currently supports human review; do not claim automatic sending. Call grounding flags evidence problems; do not describe it as guaranteeing factual correctness.
- Personal project ideas are proposals, not completed achievements. Do not add fake repository/demo links. Event registration is a future goal, not a completed race.

## Engineering and delivery

- Prefer a simple maintainable architecture suited to a content portfolio. Use semantic HTML, accessible controls, responsive layout, keyboard focus, reduced-motion support, and fast loading.
- No API keys in the browser. Avoid unnecessary backends, trackers, contact-form services, or external dependencies. mailto and tel links are acceptable defaults.
- Verify the rendered reference and final design on desktop and mobile. Run the build and relevant checks, inspect screenshots, test links and CV download, and fix defects before handoff.
- Keep credentials, .env files, dependencies, generated build output, reports, and private source out of Git. Commit deliberate changes only.
- Public GitHub publication under FarcasDavid is explicitly authorized. Reuse the intended remote only after verifying ownership. Never overwrite an existing unrelated repository or force-push.
- Explain current hosting options and recommend a practical route. Do not buy a domain, incur charges, or change DNS without specific authorization. Document actual deployment status and blockers precisely.

## Agent skills

### Issue tracker

Use GitHub Issues; read `docs/agents/issue-tracker.md` before tracker operations.

### Triage labels

Use the default five-label vocabulary; read `docs/agents/triage-labels.md` before triaging.

### Domain docs

Use a single-context layout; read `docs/agents/domain.md` before exploring domain concepts or decisions.
