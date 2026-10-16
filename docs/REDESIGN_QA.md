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
