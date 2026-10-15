# Issue tracker: GitHub

Issues and specs live in `FarcasDavid/david-farcas-portfolio` on GitHub. Use the `gh` CLI from this clone, or specify `--repo FarcasDavid/david-farcas-portfolio`.

## Operations

- Create: `gh issue create --title "..." --body-file <path>`.
- Read: `gh issue view <number> --json number,title,body,labels,comments`.
- List: `gh issue list --state open --json number,title,body,labels`, with appropriate label and state filters.
- Comment: `gh issue comment <number> --body-file <path>`.
- Label: `gh issue edit <number> --add-label "..."` or `--remove-label "..."`.
- Close: `gh issue close <number>`.

Use temporary body files for multiline text. Keep secrets and private client information out of issues.

When a skill says "publish to the issue tracker", create a GitHub issue. When it says "fetch the relevant ticket", read the corresponding issue.

## Pull requests as a triage surface

**PRs as a request surface: no.**
