# Refactoring record — 22 October 2026

## Scope and baseline

Baseline: `b2224957fb4b91e821f3b5f00bb5379dce2b8ca3`, the pre-refactor checkout. The goal was a modular, clearly named, documented codebase appropriate to a static portfolio, with critic agents and applied fixes. This was not a redesign or content rewrite.

## Critic findings and applied changes

| Finding | Resolution |
| --- | --- |
| `main.js` mixed routing, theme, decoration, workflow, dialog and provider concerns | Small composition root plus named feature modules and editable workflow content. |
| Contact tests sliced source after an exact declaration and evaluated it in a VM | Tests import `initContactForm` and the actual delivery adapter. Browser capabilities and HTTP remain simulated. |
| Navigation queried another feature’s dialog and could return focus to a hidden opener | Entry-point callback coordinates `contact.close({ restoreFocus: false })`; unit and browser checks cover focus. |
| Provider response parsing and network details were embedded in the contact UI | An injected FormSubmit adapter owns payload, POST options and acknowledgement parsing. |
| HTML/CSS monoliths made unrelated edits interfere | Named page/section/shared templates and twelve feature-oriented stylesheet modules; build assembles full HTML and one CSS file. |
| Obsolete mobile-menu and retired visual selectors remained | Removed inactive menu handling/state and unused/redundant style rules. |
| Syntax checks assumed a single classic script | Production validation checks every JavaScript module and its local imports. |
| Content checks relied on literal attribute/class order | Semantic attribute/class helpers and balanced element extraction replace the brittle checks. |
| Maintainer guidance reflected the old file structure | Rewritten README, Architecture and Maintenance documents explain interfaces, edit locations, tests and release procedure. |

Architecture and behavior critics independently reviewed the resulting modules and reported no blocking findings. The CSS contributor had exclusive ownership of stylesheet files; the primary agent owned browser logic, templates, assembly and integration. No concurrent agent edited the same files.

## Validation

- `npm run verify`: production build, generated-output checks and 41 passing tests. Coverage includes 23 contact tests, 14 route/navigation/theme tests and four build-assembly tests.
- The contact regression suite preserves slow acknowledgement, duplicate prevention, activation, malformed/rejected/unknown responses, copy fallback and input retention. No real email was sent.
- Assembled HTML matches the baseline apart from whitespace, the native module script declaration and an explicit fallback-recipient attribute. Approved CV bytes/hash remain unchanged.
- Rendered IAB review of About, Experience and Contact on 1440px desktop and 390px/320px phones in light and dark modes. No horizontal overflow observed.
- Native dialog required-field/email validation, Escape focus return, navigation while a dialog is open, workflow selection, saved route aliases and history were checked in the browser. No console errors observed.
- The same production build was served under `/portfolio/` on a separate local origin: native module loading, navigation, saved Tech Stack alias and relative assets worked from a project subpath.

## Maintainer handoff

Use [Architecture](ARCHITECTURE.md) for dependency direction and module interfaces, and [Maintenance](MAINTENANCE.md) for editing and release checks. Run `npm run verify` before publication. Current deployment evidence belongs in [HANDOFF_STATUS.md](../HANDOFF_STATUS.md).
