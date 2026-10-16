# Redesign reference and interaction audit

Revisited 15 October 2026 after David rejected the original green editorial design. Source: [Nicolae Mogage's portfolio](https://nicolaemogage.com/), inspected in a rendered browser at its default desktop viewport (approximately 1274 × 717) and 390 × 844 mobile. Both light and dark themes, desktop Experience navigation, mobile menu expansion, and mobile Experience navigation were exercised. This document supersedes the original audit's recommendations for a green accent and an anchor-only interface.

## What the reference actually does

- The persistent desktop header has a compact monogram, uppercase section buttons, active underline and a circular theme control. About, Experience, Projects, Blog and Contact appear like navigation tabs.
- The home page is one continuous document. Clicking Experience scrolls to the experience section; the URL stays `https://nicolaemogage.com/`, and every section remains displayed. It is not a multi-view tab application. Blog articles do have separate links.
- A broad geometric headline creates a stronger first impression than the body text. The rendered type pairing is Syne for display/navigation and Newsreader for prose.
- The hero provides three outlined rectangular actions and, beneath a divider, circular GitHub, LinkedIn, X and Instagram icon links. The circles measure 42 × 42px and have accessible names. The CV is a rectangular Download CV link in the reference.
- The light theme uses ivory, navy and wine. The dark theme uses deep navy, warm white and burnt orange. These are observations, not a proposal to copy those colors.
- The experience section uses wide rounded cards containing a role, employer, industry/project description, date/location, many implementation bullets and technology pills.
- Mobile has a fixed compact header and circular theme/menu controls. The menu expands into full-width rows and closes when a section is selected. The hero text wraps, the action row wraps, and experience cards stack.
- Smooth scrolling and reveal animations can temporarily leave most of the screen blank while a destination settles. Essential text should be visible immediately in David's redesign.

## What should carry over

Keep the confident type scale, recognizable social icon circles, visible navigation state, real technology pills, and personality beyond work. Give the visitor immediate ways to inspect experience and contact David. Show skills before requiring a long scroll.

The current request goes further than the reference: provide genuine separate active views and interactive circular CV/social controls. The main views can be Overview, Experience, Toolkit and About, with an obvious contact action. No Personal Projects or Blog view belongs on this site while that content does not exist.

## Original direction for this redesign

Use a deliberately different identity: near-black ink, paper white, a vivid warm orange, and a controlled cobalt accent. Green is explicitly excluded. Use typography and an original diagram/orbit or geometric composition to make the hero distinctive without inventing a portrait or confidential screenshots.

- Make Overview a composed first screen: name/role, brief positioning, primary action, circular CV/GitHub/LinkedIn controls, an original interactive visual, and prominent skill chips.
- Prioritize Python, RAG, DSPy/GEPA, FastAPI, PostgreSQL/pgvector, AWS Bedrock, and evaluation. Every chip that looks clickable should reveal useful context or select the relevant expertise; do not add dead button affordances.
- Make the icon controls at least 48 × 48px. Use recognizable SVG marks for GitHub and LinkedIn, and a document/download symbol for the CV. Keep accessible names and visible labels or tooltips. Add a restrained lift, rotation or fill change on hover/focus, and an obvious pressed state.
- Give the primary views a clear selected state and stable deep link. Switching views should change the visible content, retain functioning browser Back/Forward, and work by keyboard. A compact mobile tab strip can make the choices discoverable without hiding the whole application behind a menu.
- In Experience, lead with two recent systems and their evidence. Use a compact selector, impact preview and optional engineering detail instead of the reference's enormous mobile bullet cards.
- Make motion purposeful and quick. Remove orbiting, reveal and transform effects under reduced motion. Do not make content availability depend on an animation finishing.
- Keep the layout functional at 320px and make every visible interactive element do something useful. Phone, email and CV remain real links. Do not add a decorative message form.

## Content and quality boundaries

Professional experience is not a personal-project catalogue. Keep approved anonymized work, human review of email drafts, user-reported metric scope, and advisory grounding language. Preserve the approved CV bytes. No source-code demos, fabricated links, portfolio project placeholders or achievement badges should be added to compensate for the missing personal projects.

Inspect Overview and every active view on desktop and mobile, plus tab selection, browser history, skill interaction, circular-link accessible names/focus, contact links and the actual downloaded PDF. Reset temporary viewport overrides after inspection. This audit is not a complete accessibility or security review of the reference itself.
