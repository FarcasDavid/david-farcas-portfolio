# Direct contact-form delivery

Researched on 16 October 2026 against provider documentation. David has since confirmed activation and receipt of real emails. Slow browser acknowledgements remain an observed service limitation; inbox receipt and browser acknowledgement are separate events.

## Recommendation

Use a hosted form endpoint for the existing static portfolio. A visitor can press **Send message**, stay on the website, and have the form service email David. The visitor's address belongs in **Reply-To**, not the sender field. No Yahoo password or browser-side mail credential is needed.

For the smallest setup on the present `chatgpt.site` preview, **FormSubmit** can be integrated using the approved recipient address and then activated through a confirmation email. It requires no account or sending domain. Its API supports cross-origin AJAX, and its documentation advertises free unlimited forms/submissions. It also provides a hidden `_honey` field and a recipient-hiding string after activation. These are provider claims, not a delivery SLA. [Setup](https://formsubmit.co/), [API and options](https://formsubmit.co/documentation).

**Recipient activation:** first-time setup requires David to open a confirmation email. That step is now complete for the tested Sites form, and David confirmed actual inbox receipt. For any newly activated form, FormSubmit holds submissions for up to 30 days until confirmation. [Activation and troubleshooting](https://formsubmit.co/help).

For a service with an account and dashboard, **Formspree** is a reasonable alternative: create an account, verify the target inbox, create a form, and provide its public `/f/{form_id}` endpoint. No sending domain is needed for the standard provider notifications. The free plan currently allows **50 submissions/month** with a **30-day submission archive**; the provider describes free as testing/development and Personal as suitable for a portfolio. [Pricing](https://formspree.io/plans), [account verification and form setup](https://help.formspree.io/articles/building-your-form/building-an-html-form), [target-email verification](https://help.formspree.io/articles/form-and-project-settings/changing-a-form-email-address).

## Other evaluated options

| Option | Owner setup | Fit for this portfolio |
| --- | --- | --- |
| Web3Forms | Verify the recipient email and create a form access key. | Good static-site integration, **250 submissions/month** free; a provider-assigned public access key is explicitly safe in client code. Its documentation warns that some free hosted subdomains are blocked, so compatibility with this exact Sites origin must be tested before committing to it. |
| Worker + Resend | Cloudflare and Resend accounts; secure server-side API key; verified sending domain for normal production use. | More infrastructure than this single form needs. `resend.dev` only supports testing to the account's own address; it should not become a production-domain workaround. |
| Cloudflare native email binding | Cloudflare account, onboarded sending domain, verified destination address. | Can send to verified destinations on the free plan, but still requires a domain and DNS setup the user has not authorized. |

Sources: [Web3Forms pricing](https://web3forms.com/pricing), [public-key and inbox setup](https://web3forms.com/), [hosted-domain restrictions](https://docs.web3forms.com/getting-started/troubleshooting), [Resend testing restrictions](https://resend.com/docs/knowledge-base/403-error-resend-dev-domain), [Cloudflare email send bindings](https://developers.cloudflare.com/email-service/configuration/send-bindings/), [Cloudflare email service](https://developers.cloudflare.com/email-service/).

## Submission behavior and verification

Implementation requirements:

- Submit over HTTPS with AJAX, show a pending state, and prevent duplicate submits while a request is active.
- Validate required name, email, subject, and message fields; bound lengths and reject whitespace-only content.
- Treat a successful response as **accepted by the delivery service**, not proof that Yahoo placed it in the inbox.
- Keep message text after failure or a timeout; provide retry and copy-message controls. Do not silently open an email client.
- Distinguish pending activation from active delivery in the public form, configuration, and handoff. Never display an unconditional delivery promise while recipient verification is outstanding.
- Use a honeypot alongside provider filtering. Client-only throttling is a usability feature, not durable spam protection. Add a supported CAPTCHA if actual abuse warrants it.
- Keep provider configuration and data-processing details in technical documentation. Per David's preference, the form UI does not need provider branding or a provider-attribution line. Collect only the message fields; do not add marketing enrollment or attachments.
- After activation, test from the deployed Sites origin and the eventual public host, including real Yahoo receipt, Reply-To, error handling, and mobile behavior.

FormSubmit's documentation recommends leaving reCAPTCHA enabled for its standard hosted flow and warns that disabling it can introduce additional anti-abuse limitations. Its autoresponder is unavailable for AJAX forms. Do not promise CAPTCHA or autoresponse behavior that has not been tested with its AJAX endpoint. [FormSubmit options](https://formsubmit.co/documentation).

For Web3Forms AJAX, use JSON or `FormData`, rather than URL-encoded data, to avoid redirect/CORS errors. Its endpoint is designed for client-side requests and should not be proxied through a free server integration. Its public key is a recipient alias, not a secret sending credential. Free features include honeypot protection and hCaptcha; domain restriction is paid. [AJAX example](https://docs.web3forms.com/how-to-guides/html-and-javascript), [troubleshooting](https://docs.web3forms.com/getting-started/troubleshooting), [pricing](https://web3forms.com/pricing).

Formspree provides AJAX on all plans and uses public form IDs for submissions. Its API keys are for reading/managing stored submissions and are not required to submit a contact form. `_gotcha` is its supported honeypot field. [AJAX documentation](https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax), [API keys](https://help.formspree.io/articles/the-forms-api/api-keys), [honeypot](https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering/).

## Slow acknowledgements and timeout handling

The official AJAX guide documents the normal `POST /ajax/{recipient}` JSON flow. It does not document a separate asynchronous enqueue endpoint, job identifier, idempotency key, acknowledgement deadline, or delivery-status polling API. The separate API reads archived submissions and requires an emailed API key; its limited archive access is unsuitable for browser-side send-status polling. No documented faster acceptance path was found. [AJAX guide](https://formsubmit.co/ajax-documentation), [archive API](https://formsubmit.co/api-documentation).

**Engineering conclusion:** a static frontend can acknowledge the button press immediately, but it cannot confirm service acceptance before receiving a usable response. It cannot make the provider acknowledge faster. A timeout or aborted response does not establish whether an already-submitted message was processed. `no-cors` hides response data and cannot solve that uncertainty. Fetch resolves on response headers and reading JSON may still take additional time. [Fetch response and cancellation behavior](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

Recommended interaction: show **Sending…** immediately; show a calm progress update if the request takes several seconds; keep the original request pending without an artificial client deadline; confirm success only from an explicit accepted response. After a genuine network failure or unusable response, preserve all fields and say the website could not confirm sending and the message may have arrived. Do not automatically retry, clear the draft, or announce success. A manual retry may create a duplicate. These are application decisions, not provider guarantees. If fast durable acceptance becomes essential, add a backend that acknowledges after securely storing a job, or select and test a different provider.

## Moving the website

FormSubmit supports cross-origin AJAX, and the form uses an absolute service endpoint rather than a host-specific server route. That makes the existing static implementation portable to GitHub Pages. Its `_url` field should continue to be generated from the actual deployed location, including the project path on Pages. [FormSubmit cross-origin support](https://formsubmit.co/documentation), [exact form URL](https://formsubmit.co/help).

**Activation portability is not guaranteed by the documentation.** The help page explicitly requires reactivation after changing the recipient email, but does not specify whether changing the website origin or page URL reuses the existing activation. It also describes multiple active forms per recipient. Therefore preserve the recipient/endpoint, test one intentional submission from the new final origin, and complete confirmation again if requested. Do not claim that Sites activation automatically covers Pages or a future custom domain. [Activation help](https://formsubmit.co/help).

GitHub Pages serves static output; it does not run a mail backend. Publish the existing production artifact using the repository's Actions workflow and configure **Settings → Pages → Source: GitHub Actions**. A project site uses the repository path, so assets/CV links need the existing base-path build configuration. [Pages publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [static hosting limits](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

A custom domain can be added later without replacing this contact integration: configure the owned domain in repository Pages settings, then its DNS, then HTTPS and a submission test. When deploying with custom Actions, GitHub ignores a `CNAME` artifact and uses repository settings. Domain purchase, DNS changes, and any charges still need specific user authorization. [GitHub custom-domain configuration](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Research boundary

This research did not create provider accounts, request activation emails, send test messages, change DNS, or authorize charges. The activation/receipt status below is based on David's explicit confirmation relayed by the coordinating agent; latency changes and deployment are owned by that agent.

## Implementation status — 16 October 2026

FormSubmit AJAX is configured in the native contact dialog. Both Email circles open that dialog. The primary action submits directly from the website; it never launches an email client. The four bounded required fields, provider-supported honeypot, Reply-To email, subject and exact form URL are included. Controls lock during a request. Explicit acceptance clears the form; activation and errors preserve it. A provider response is acceptance for processing, not proof of Yahoo inbox delivery. The previous 20-second frontend abort has been removed. Sending feedback appears immediately, slow reassurance appears after eight seconds, and only explicit acceptance produces “Message sent”. The original request continues, including through longer responses; no automatic retry is made. A delayed 25-second success and a still-pending 120-second request are covered by regression tests. A direct API retest after activation returned HTTP 200 with explicit success in 0.724 seconds.

The private Sites update is deployed. David activated the recipient and confirmed receipt of real emails after initial setup. Delivery is working for the tested Sites origin; fast browser acknowledgement is not guaranteed. No email-service credentials are present in the browser or repository. The deployment audience remains owner-private; public Pages hosting is a separate existing setup task. Any move to Pages or a custom domain needs a new-origin submission test.

## Public Pages verification — 16 October 2026

The public portfolio is live at https://farcasdavid.github.io/david-farcas-portfolio/. A first browser submission requested origin-specific activation; David confirmed activation through Yahoo. A subsequent public-origin browser submission returned explicit acceptance and the “Message sent” state, cleared the form, and stayed on site. No inbox access was used by the agent. Test again from any future custom domain, activating it if requested.
