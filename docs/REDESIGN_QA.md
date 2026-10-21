# Independent redesign visual review

Reviewed 16 October 2026 against David's direct feedback: replace the green editorial design with a more distinctive, interactive portfolio, genuine active views, recognizable circular CV/social controls, prominent skills, and no personal-project section.

## Review scope

Used the actual rendered local production preview at `http://localhost:4173`, in Chrome through browser automation. Inspected Overview, Experience, Toolkit, About and Contact in dark and light themes at desktop (approximately 1680 × 825), 390 × 844, and 320 × 740. Captured and visually inspected viewport and full-page browser screenshots. Full-page captures of fixed navigation place the dock at its viewport position within the tall image; that is a capture artifact, not a second in-page navigation bar.

Screenshots in this independent review were inspected transiently in the browser tool. No reference-site assets or private imagery were copied into the repository. The main validation record covers saved evidence, build checks, link verification and the CV hash/download checks.

## Outcome

The redesign addresses the requested change in direction. Its large original typography, ink/orange/violet palette, hand-drawn underline, animated system map, contrasting triathlon card and generous layouts have substantially more character than the prior implementation. No green is used in the inspected interface. Personal projects and unsupported blog material are absent.

- The five choices are genuine active views. Selecting a tab changes the visible content and hash; exactly one main section remains displayed. The mobile icon-and-label dock makes navigation discoverable without a hamburger menu.
- The CV, GitHub, LinkedIn, Instagram and email actions use recognizable circular icon controls. All five fit one row even at 320px. Accessible names identify their destinations. Keyboard focus on LinkedIn showed a prominent violet outline, filled circle and tooltip.
- The first desktop screen shows the main experience action and social/CV circles beside it. On mobile, skills now precede the interactive system map; visitors can inspect tools without passing a large decorative card first.
- Selecting an overview skill changes its explanatory panel and use-case evidence. Selecting Evaluate in the system diagram changes the highlighted node and engineering explanation. These are useful interactions rather than dead visual buttons.
- Experience separates ownership, engineering choices and evidence. Native detail disclosures expand into readable mobile content. The benchmark treatment now shows exactly eight equal numbered criterion blocks, avoiding an unsupported implied data distribution.
- Toolkit cards wrap longer names, including HuggingFace Transformers, without horizontal clipping. About/credentials and contact layouts stack cleanly at narrow widths. Email and telephone remain legible at 320px.
- Dark and light themes preserve a coherent hierarchy. The brighter triathlon and contact panels add variation while keeping readable text.

## Defects found and repaired during this review

1. Initial programmatic focus drew a thin blue rectangle around the entire Overview panel. The root implementation removed this panel outline while preserving focus treatment on interactive controls. Rechecked on the final desktop render.
2. A mobile fixed-position containing block placed the navigation dock over the top header. The root removed the mobile header blur; the dock now stays at the bottom and brand/theme/CV controls are visible.
3. Removing blur exposed underlying text through the translucent mobile header. The root made that header opaque; the final light-theme header computes to `rgb(244, 243, 246)` and content no longer bleeds through.
4. Uneven purple bars beneath the call benchmark implied a measurement distribution absent from approved material. Replaced with eight equal numbered criterion blocks and rechecked in both themes.
5. Edge tooltips created 17px of horizontal overflow at 320px. The root aligned edge tooltips inward. All five views now report `document.documentElement.scrollWidth === innerWidth === 320` in both themes. All five also report 390px document/viewport width at the 390px check.
6. The 320px hero circle row previously wrapped email alone onto a second row. The root tightened spacing; all five 48px circles now fit.

## Practical limits

This independent pass checked visual composition, responsive behavior, selected interactions, text integrity and keyboard visibility. The root's separate functional verification owns external destination responses, actual CV download/byte identity, build results, browser history, reduced-motion checks and deployment status. No claim of a formal accessibility certification or user acceptance is made.

No blocking visual defect remained after rechecking the repairs above. Temporary responsive viewport overrides were reset to the normal desktop viewport when the review finished.


## 21 October 2026 — About and navigation consolidation

- Merged Overview/Toolkit/About into About, with ordered About → Experience → Contact navigation and forward next-view links.
- Four separate B2-level paragraphs cover identity, work, approach and user-confirmed cycling/race training/tennis/private-event DJing. Education remains distinct; two certification cards appear only in Experience.
- Toolkit details appear right of the controls on desktop and beneath them on mobile. All seven buttons update the title, example and selected state without changing the active view. Full CV technology inventory remains expandable.
- Production build and static contracts pass; existing 22 contact regression tests pass without sending external messages.
- Rendered IAB checks at 1440×1000, 390×844 and 320×740: readable paragraphs, stacked certification cards, three-button dock, no horizontal overflow. Dark and light themes reviewed. Existing reduced-motion CSS disables animations and transitions.
- Keyboard ArrowRight/Home routing, browser Back/Forward, legacy #stack and local toolkit focus verified. Agent review caught missing toolkit programmatic focus; fixed with tabindex=-1.
- Browser CV download completed; exact file hash matches approved PDF. No browser console errors observed. Contact/social destinations remain covered by existing link checks.


## 21 October 2026 — Contact invitation refinement

- Removed the 01/02/03 navigation labels and matching next-step prefixes.
- Replaced the blue, tilted, arrow-only contact card with a warm neutral invitation, “Let’s connect” heading, full-width “Send me a message” button, and explicit email-app fallback.
- Mobile reading and focus order: introduction → invitation/action → profile/contact links. Desktop retains two columns. Message action has a visible contrasting keyboard outline; no rotating-button behavior remains.
- Reviewed all three tabs at 320px, Contact at 390px, 768px, 1440px and 1920px, and dark/light themes. No horizontal overflow observed. Contact form opens from all three entry points; required-field validation, Escape/close and opener focus return work. Keyboard Home/End, Back/Forward and local toolkit selection pass. No console errors observed.
- Production build, static checks, all 22 contact regression tests and whitespace checks pass. Sending success/failure/pending behavior is covered by the automated tests; no real email was sent during this design review.
