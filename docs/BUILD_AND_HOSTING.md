# Design, build and hosting brief

## Reference audit still required

https://nicolaemogage.com is the user's reference. An initial text-only request showed a client-rendered page titled “Nicolae Mogage | AI/ML Engineer & Full Stack Developer” with almost no body text. No complete visual audit has been performed. The implementation session must inspect rendered desktop/mobile pages and interactions before claiming findings. Record concrete observations and distinguish inspiration from original choices.

## Suggested information architecture

1. Hero: clear name, positioning, concise value statement, experience/contact actions.
2. Experience: substantial anonymized AI systems with ownership, problem, relevant stack and impact; progression through 2024–2026.
3. Expertise: scannable groups tied to evidence rather than an enormous logo wall.
4. Credentials and education: both certifications plus concise learning context and degree.
5. About: professional strengths, running/triathlon and future race goal.
6. Contact and CV: email, phone, GitHub, LinkedIn, Instagram, actual PDF download.

A separate project section is optional until public personal work exists. Never pad it with imaginary projects or make planned work look completed. Project recommendations belong in a roadmap document initially. Design should remain attractive without a headshot.

## Architecture and visual standards

Select a simple static or prerendered stack appropriate to the reference. Astro or a small React/Vite app are reasonable candidates, not existing decisions or claims of David's prior expertise. Use a content-driven structure so experience and links can be edited easily. Avoid a backend unless a real feature needs one. Use mailto/tel contact links by default.

Use strong typography, intentional spacing, restrained color, coherent components, and subtle meaningful interaction. Avoid stock generic copy, excessive animation and distracting graphics. Support narrow mobile screens, keyboard navigation, visible focus, semantic landmarks, contrast and reduced-motion preferences. Never load personal data or service keys into browser code.

## Hosting research and recommendation

Check current provider documentation and terms in the implementation session; no live pricing or quotas have been verified here.

| Candidate | Appropriate use | Verify before choosing |
| --- | --- | --- |
| GitHub Pages | Static portfolio with GitHub-managed source | Build workflow, project URL/base path, custom-domain setup and current limits |
| Cloudflare Pages | Static deployment and previews | Git integration, preview behavior, build settings and current plan terms |
| Vercel | Framework preview/deployment workflow | Framework needs, current personal/commercial plan eligibility and terms |
| Sites, if applicable | Integrated preview/publishing when available | Installed skill, portability, access/publication behavior and source synchronization |

Recommend a practical option after choosing the stack. A custom domain can be added later; ownership is not confirmed. Do not purchase a domain, incur charges or modify DNS without specific authorization. Do not claim a deployment exists until verified. Public GitHub repository publication is already requested.

## Acceptance checks

- Actual production build succeeds; accurate setup/build/deploy instructions are committed.
- Rendered review at representative desktop and mobile sizes with screenshots; no overflow or clipped headings.
- Keyboard navigation, visible focus, contrast, reduced motion and semantic heading order checked.
- All social, email, telephone and CV-download links work; downloaded PDF is the approved CV.
- Claims match docs/PROFILE.md and CV. No internal names/client identities/private data or fabricated projects, credentials, results or live URLs.
- Inspect performance and browser errors; avoid avoidable large assets or dependencies.
- If deployed, verify the actual public URL and mobile behavior there. Record any account/authentication steps that still require the user.
- Leave a clean working tree with deliberate commits; no dependencies, secrets or generated reports in the repository.
