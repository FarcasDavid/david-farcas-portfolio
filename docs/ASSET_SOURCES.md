# Asset sources

The redesign serves all icons and fonts from this repository. No runtime font service or icon CDN is used. Downloaded on 15 October 2026; versions and asset hashes are recorded in `src/assets/manifest.json`.

## Brand and interface icons

Brand shapes come from the named upstream open-source icon collections. Shapes have not been redrawn. Individual SVG files were normalized to `fill="currentColor"`; their title is the local icon name. The external sprite combines the same geometry into named `<symbol>` elements. There are no baked-in brand colors, including green. Brand names and marks remain the property of their respective owners and identify the relevant services or technologies; their inclusion does not imply endorsement.

**Font Awesome Free 7.0.0**, by Fonticons, Inc. / [Font Awesome](https://fontawesome.com), provides the social icons, AWS mark and interface icons under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The upstream attribution remains in each SVG. Full bundled license: `src/assets/licenses/FONT-AWESOME-LICENSE.txt`. [Pinned upstream source](https://github.com/FortAwesome/Font-Awesome/tree/7.0.0/svgs).

**Simple Icons 16.1.0**, by [Simple Icons](https://simpleicons.org), provides technology icons under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). Full bundled license: `src/assets/licenses/SIMPLE-ICONS-LICENSE.txt`. [Pinned upstream source](https://github.com/simple-icons/simple-icons/tree/16.1.0/icons).

| Local SVG | Collection | Exact upstream file |
| --- | --- | --- |
| `icons/github.svg` | Font Awesome Free 7.0.0 | [Source](https://raw.githubusercontent.com/FortAwesome/Font-Awesome/7.0.0/svgs/brands/github.svg) |
| `icons/linkedin.svg` | Font Awesome Free 7.0.0 | [Source](https://raw.githubusercontent.com/FortAwesome/Font-Awesome/7.0.0/svgs/brands/linkedin-in.svg) |
| `icons/instagram.svg` | Font Awesome Free 7.0.0 | [Source](https://raw.githubusercontent.com/FortAwesome/Font-Awesome/7.0.0/svgs/brands/instagram.svg) |
| `icons/aws.svg` | Font Awesome Free 7.0.0 | [Source](https://raw.githubusercontent.com/FortAwesome/Font-Awesome/7.0.0/svgs/brands/aws.svg) |
| `icons/download.svg` | Font Awesome Free 7.0.0 | [Source](https://raw.githubusercontent.com/FortAwesome/Font-Awesome/7.0.0/svgs/solid/download.svg) |
| `icons/email.svg` | Font Awesome Free 7.0.0 | [Source](https://raw.githubusercontent.com/FortAwesome/Font-Awesome/7.0.0/svgs/solid/envelope.svg) |
| `icons/phone.svg` | Font Awesome Free 7.0.0 | [Source](https://raw.githubusercontent.com/FortAwesome/Font-Awesome/7.0.0/svgs/solid/phone.svg) |
| `icons/arrow-up-right.svg` | Font Awesome Free 7.0.0 | [Source](https://raw.githubusercontent.com/FortAwesome/Font-Awesome/7.0.0/svgs/solid/arrow-up-right-from-square.svg) |
| `icons/python.svg` | Simple Icons 16.1.0 | [Source](https://raw.githubusercontent.com/simple-icons/simple-icons/16.1.0/icons/python.svg) |
| `icons/postgresql.svg` | Simple Icons 16.1.0 | [Source](https://raw.githubusercontent.com/simple-icons/simple-icons/16.1.0/icons/postgresql.svg) |
| `icons/fastapi.svg` | Simple Icons 16.1.0 | [Source](https://raw.githubusercontent.com/simple-icons/simple-icons/16.1.0/icons/fastapi.svg) |
| `icons/huggingface.svg` | Simple Icons 16.1.0 | [Source](https://raw.githubusercontent.com/simple-icons/simple-icons/16.1.0/icons/huggingface.svg) |
| `icons/docker.svg` | Simple Icons 16.1.0 | [Source](https://raw.githubusercontent.com/simple-icons/simple-icons/16.1.0/icons/docker.svg) |
| `icons/langchain.svg` | Simple Icons 16.1.0 | [Source](https://raw.githubusercontent.com/simple-icons/simple-icons/16.1.0/icons/langchain.svg) |
| `icons/langgraph.svg` | Simple Icons 16.1.0 | [Source](https://raw.githubusercontent.com/simple-icons/simple-icons/16.1.0/icons/langgraph.svg) |
| `icons/claude.svg` | Simple Icons 16.1.0 | [Source](https://raw.githubusercontent.com/simple-icons/simple-icons/16.1.0/icons/claude.svg) |
| `icons/git.svg` | Simple Icons 16.1.0 | [Source](https://raw.githubusercontent.com/simple-icons/simple-icons/16.1.0/icons/git.svg) |
| `icons/amazonwebservices.svg` | Font Awesome Free 7.0.0 | [Source](https://raw.githubusercontent.com/FortAwesome/Font-Awesome/7.0.0/svgs/brands/aws.svg) |

`amazonwebservices.svg` is an alias of `aws.svg`. Both use the AWS mark, rather than a distinct Bedrock logo. DSPy, GEPA, RAG, evaluation, and other concepts without a supplied established logo should use clearly labelled text or neutral interface symbols; no invented brand marks are included.

## Fonts

Both font families are redistributed under the **SIL Open Font License 1.1**. Their complete upstream copyright and license text accompanies the font files:

- **Space Grotesk**, by Florian Karsten: `src/assets/licenses/SPACE-GROTESK-OFL.txt`. Variable upright weights 300–700. [Canonical Google Fonts source](https://github.com/google/fonts/tree/94301472b4d809299b4775bc6502592b83dd6934/ofl/spacegrotesk).
- **Manrope**, by Mikhail Sharanda: `src/assets/licenses/MANROPE-OFL.txt`. Variable upright weights 200–800. [Canonical Google Fonts source](https://github.com/google/fonts/tree/94301472b4d809299b4775bc6502592b83dd6934/ofl/manrope).

The WOFF2 binaries are official Google Fonts delivery files, downloaded unmodified from `fonts.gstatic.com` after requesting the families from the [official Google Fonts CSS service](https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Manrope:wght@200..800&display=swap). Latin and Latin Extended subsets support English and Romanian; other scripts fall back to the system font. Both families together occupy 81,060 bytes. The canonical source repository is pinned above; its TTF files are not bundled because the browser-ready WOFF2 files are smaller.

| Local WOFF2 | Official Google Fonts binary |
| --- | --- |
| `fonts/manrope-latin-variable.woff2` | [Source](https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggexSvfedN4.woff2) |
| `fonts/manrope-latin-ext-variable.woff2` | [Source](https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggmxSvfedN62Zw.woff2) |
| `fonts/space-grotesk-latin-variable.woff2` | [Source](https://fonts.gstatic.com/s/spacegrotesk/v22/V8mDoQDjQSkFtoMM3T6r8E7mPbF4C_k3HqU.woff2) |
| `fonts/space-grotesk-latin-ext-variable.woff2` | [Source](https://fonts.gstatic.com/s/spacegrotesk/v22/V8mDoQDjQSkFtoMM3T6r8E7mPb94C_k3HqUtEw.woff2) |

## Integration

Assets are relative to `src/assets/`; the existing build copies them to `dist/assets/`.

Load `assets/fonts/font-faces.css`, or copy its declarations into the main stylesheet while updating the relative URLs. Use `font-family: 'Space Grotesk', sans-serif` for display and `font-family: 'Manrope', sans-serif` for body copy. Apply `font-display: swap` as supplied. Preload only the Latin subset used for critical display text if useful.

The sprite supports an external use reference such as `<svg aria-hidden="true"><use href="assets/icons/sprite.svg#github"></use></svg>`. Give each icon-only link an accessible name on its containing anchor. A plain `<img>` cannot inherit `currentColor` from its parent; use the SVG sprite, inline the sourced SVG, or use CSS masking to preserve the palette.
