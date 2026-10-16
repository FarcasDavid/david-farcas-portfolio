# Direct contact-form delivery

Researched on 16 October 2026 against provider documentation. This is implementation research, not a claim that delivery has been activated or verified.

## Recommendation

Use a hosted form endpoint for the existing static portfolio. A visitor can press **Send message**, stay on the website, and have the form service email David. The visitor's address belongs in **Reply-To**, not the sender field. No Yahoo password or browser-side mail credential is needed.

For the smallest setup on the present `chatgpt.site` preview, **FormSubmit** can be integrated using the approved recipient address and then activated through a confirmation email. It requires no account or sending domain. Its API supports cross-origin AJAX, and its documentation advertises free unlimited forms/submissions. It also provides a hidden `_honey` field and a recipient-hiding string after activation. These are provider claims, not a delivery SLA. [Setup](https://formsubmit.co/), [API and options](https://formsubmit.co/documentation).

**Unavoidable owner action:** David must open the recipient confirmation email and activate the form before normal delivery works. Until then, FormSubmit holds submissions for up to 30 days; each unactivated submission may trigger another activation email. We cannot truthfully report inbox delivery until David confirms receipt of a real test message. [Activation and troubleshooting](https://formsubmit.co/help).

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
- Include a short disclosure that submitted details are processed by the selected delivery provider, linked to that provider's privacy terms. Collect only the message fields; do not add marketing enrollment or attachments.
- After activation, test from the deployed Sites origin and the eventual public host, including real Yahoo receipt, Reply-To, error handling, and mobile behavior.

FormSubmit's documentation recommends leaving reCAPTCHA enabled for its standard hosted flow and warns that disabling it can introduce additional anti-abuse limitations. Its autoresponder is unavailable for AJAX forms. Do not promise CAPTCHA or autoresponse behavior that has not been tested with its AJAX endpoint. [FormSubmit options](https://formsubmit.co/documentation).

For Web3Forms AJAX, use JSON or `FormData`, rather than URL-encoded data, to avoid redirect/CORS errors. Its endpoint is designed for client-side requests and should not be proxied through a free server integration. Its public key is a recipient alias, not a secret sending credential. Free features include honeypot protection and hCaptcha; domain restriction is paid. [AJAX example](https://docs.web3forms.com/how-to-guides/html-and-javascript), [troubleshooting](https://docs.web3forms.com/getting-started/troubleshooting), [pricing](https://web3forms.com/pricing).

Formspree provides AJAX on all plans and uses public form IDs for submissions. Its API keys are for reading/managing stored submissions and are not required to submit a contact form. `_gotcha` is its supported honeypot field. [AJAX documentation](https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax), [API keys](https://help.formspree.io/articles/the-forms-api/api-keys), [honeypot](https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering/).

## Status boundary

This research did not create provider accounts, request activation emails, send test messages, change DNS, or authorize charges. The implementation and deployment status must be recorded separately after the chosen provider has been configured and tested.

## Implementation status — 16 October 2026

FormSubmit AJAX is configured in the native contact dialog. Both Email circles open that dialog. The primary action submits directly from the website; it never launches an email client. The four bounded required fields, provider-supported honeypot, Reply-To email, subject and exact form URL are included. Controls lock during a request. Explicit acceptance clears the form; activation, errors and a 20-second timeout preserve it. A provider response is acceptance for processing, not proof of Yahoo inbox delivery.

The private Sites update is deployed. One live setup submission was authorized by David and made from the hosted form; the response reported pending recipient activation and the form correctly retained its fields. FormSubmit has requested inbox confirmation. David must click its activation email in Yahoo (including Spam) and confirm receipt of the held setup message. Recipient activation and real inbox receipt remain unverified. No email-service credentials are present in the browser or repository. The deployment audience remains owner-private; public Pages hosting is a separate existing setup task.
