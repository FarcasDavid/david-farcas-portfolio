# Hosting and deployment

Researched 15 October 2026. Recommend **GitHub Pages** for this static professional portfolio: the source already lives on GitHub, no backend is needed, and the public repository is eligible for Pages on GitHub Free. There is no domain purchase or additional service account requirement. This recommendation concerns a professional profile, not an e-commerce or transaction service.

## Current status

The local `origin` is `https://github.com/FarcasDavid/david-farcas-portfolio.git`; remote HEAD resolves to `main`. Public read access works. `gh` is not installed in this environment. That alone does not establish whether ordinary Git push authentication works. No public-host settings, DNS, paid plan, or domain have been changed.

An owner-private Sites preview is successfully deployed at https://david-farcas-portfolio.rockyglade2.chatgpt.site (native deployment status: succeeded). It is a review link for the owner, not a public portfolio URL. The public source has been published through the GitHub connection and local main synchronized. The corrected [GitHub Actions run](https://github.com/FarcasDavid/david-farcas-portfolio/actions/runs/38742141809) passes npm ci, build and checks, then stops at configure-pages with “Get Pages site failed” / Not Found because Pages is not enabled. The browser is signed out, so account settings cannot be completed here. Use the successful deployment output as the authoritative URL and verify it before sharing or adding it to the CV. The approved CV remains unchanged.

## Publish with GitHub Pages

1. Push the reviewed source, `package-lock.json`, and `.github/workflows/deploy.yml` to `main` in the intended repository.
2. Open the repository's **Settings → Pages**. Under **Build and deployment → Source**, choose **GitHub Actions**. This requires repository admin or maintainer access.
3. In **Actions**, run **Deploy portfolio to GitHub Pages** manually if the `main` push has not already triggered it. The workflow runs `npm ci`, builds with `npm run build`, uploads only `dist`, and deploys using GitHub's short-lived token. No repository secret is needed.
4. Follow the workflow's `github-pages` deployment URL. Test the page, mobile navigation, assets, and PDF there. Relative asset and PDF links support the `/david-farcas-portfolio/` project path without build-time URL rewriting.
5. Future pushes to `main` publish automatically. To roll back, revert the relevant source commit and push normally. Never force-push to repair a deployment.

If command-line authentication blocks publication, sign into GitHub using an approved Git credential manager (or install GitHub CLI and run `gh auth login`), then retry the ordinary push. If repository settings are unavailable, the minimal user action is step 2. Do not buy a domain or change DNS as part of these steps.

## Alternatives

| Option | Fit and tradeoff |
| --- | --- |
| GitHub Pages | Recommended for this static site. Public-repository hosting is available on GitHub Free; custom Actions builds keep generated files out of source branches. No server functions. |
| Cloudflare Pages | Good alternative when per-branch previews matter. Connect GitHub, use `main`, build `npm run build`, output `dist`, and use the same relative links for root hosting. Requires authorizing another provider. Current Free limits include 500 builds per month; recheck limits when adopting it. |
| Vercel | Strong framework and preview workflow, but adds little for this small static build. Hobby is restricted to non-commercial personal use; assess the portfolio's intended use against current terms before choosing a plan. Use build `npm run build`, output `dist`, root base path. |
| Sites | The installed Sites skill supports static artifacts, source synchronization, and integrated hosting; new Sites start private. Useful for an in-app preview, but the GitHub checkout must remain the portable source of record. A private Sites deployment is not evidence of a publicly accessible portfolio. The owning agent records any actual deployment separately. |

A custom domain is optional and can be considered after launch. Ownership is unconfirmed. Changing providers only needs the static artifact and the appropriate base path; no application backend or browser API key is required.

## Official sources

- [GitHub Pages publishing source and access](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub custom workflow contract and deployment permissions](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- [Cloudflare Pages Git integration and branch previews](https://developers.cloudflare.com/pages/configuration/git-integration/)
- [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/)
- [Vercel Hobby plan](https://vercel.com/docs/plans/hobby)

Provider limits and terms can change; consult these sources before migration or paid use.
