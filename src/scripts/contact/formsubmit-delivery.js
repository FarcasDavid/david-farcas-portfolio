/** Provider adapter. A rejected/unknown response never becomes a success. */
export function createFormSubmitDelivery({ fetch }) {
  return async function deliverMessage({ endpoint, draft, honeypot, pageUrl }) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: draft.name,
        email: draft.email,
        subject: draft.subject,
        message: draft.message,
        _subject: `Portfolio — ${draft.subject}`,
        _template: "table",
        _honey: honeypot,
        _url: pageUrl,
      }),
      credentials: "omit",
      keepalive: true,
    });
    const result = await response.json();
    if (!response.ok || !result || typeof result !== "object") {
      throw new Error("Email delivery could not be confirmed.");
    }
    if (/activat|confirm.*email|email.*confirm/i.test(result.message || "")) {
      return "activation-required";
    }
    if (result.success === true || result.success === "true") return "accepted";
    throw new Error("The delivery provider did not accept the message.");
  };
}
