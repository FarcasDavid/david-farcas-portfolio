/** Contact UI owns dialog focus, validation and the pending-send lifecycle.
 * deliverMessage is an injected provider adapter; copyText is a browser capability.
 */
export function initContactForm({ document, window, deliverMessage, copyText }) {
  for (const button of document.querySelectorAll("[data-copy-email]")) {
    button.addEventListener("click", async () => {
      const email = button.dataset.copyEmail || "farcas.david@yahoo.com";
      const status = document.querySelector("#copy-status");
      try {
        await copyText(email);
        if (status) status.textContent = "Email address copied.";
      } catch {
        if (status)
          status.textContent = `Copy unavailable. Email ${email}, or use the email button.`;
      }
    });
  }

  const contactDialog = document.querySelector("#contact-form-dialog");
  const contactForm = document.querySelector("#contact-form");
  const contactFormStatus = document.querySelector("#contact-form-status");
  if (!contactDialog || !contactForm || !contactFormStatus) return { close() {} };
  const recipient = contactForm.getAttribute("data-recipient");
  let restoreFocusAfterClose = true;
  let contactFormOpener;
  function close({ restoreFocus = true } = {}) {
    if (!contactDialog.open) return;
    restoreFocusAfterClose = restoreFocus;
    contactDialog.close();
  }
  let contactFormSending = false;

  for (const button of document.querySelectorAll("[data-open-contact-form]")) {
    button.addEventListener("click", () => {
      contactFormOpener = button;
      contactDialog.showModal();
      document.body.classList.add("has-contact-dialog");
    });
  }
  for (const button of document.querySelectorAll("[data-close-contact-form]")) {
    button.addEventListener("click", () => close());
  }
  contactDialog?.addEventListener("close", () => {
    document.body.classList.remove("has-contact-dialog");
    if (restoreFocusAfterClose) contactFormOpener?.focus({ preventScroll: true });
    restoreFocusAfterClose = true;
  });

  function contactMessage() {
    for (const field of contactForm.querySelectorAll("[required]")) {
      field.setCustomValidity(
        field.value.trim() ? "" : "Please fill in this field.",
      );
    }
    if (!contactForm.reportValidity()) return;
    const fieldValue = (name) => contactForm.elements[name].value.trim();
    const name = fieldValue("name").replace(/[\r\n]+/g, " ");
    const email = fieldValue("email");
    const subject = fieldValue("subject").replace(/[\r\n]+/g, " ");
    const message = fieldValue("message");
    const body = `Name: ${name}\r\nEmail: ${email}\r\n\r\n${message}`;
    return {
      name,
      email,
      subject,
      message,
      copy: `To: ${recipient}\nSubject: ${subject}\n\n${body}`,
    };
  }
  contactForm?.addEventListener("input", (event) => {
    event.target.setCustomValidity?.("");
    contactFormStatus.textContent = "";
  });
  contactForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (contactFormSending) return;
    const message = contactMessage();
    if (!message) return;
    const controls = [...contactForm.querySelectorAll("input, textarea, button")];
    const label = contactForm.querySelector("[data-send-label]");
    contactFormSending = true;
    contactForm.setAttribute("aria-busy", "true");
    controls.forEach((control) => {
      control.disabled = true;
    });
    label.textContent = "Sending…";
    contactFormStatus.textContent = "Thanks — sending your message now.";
    // Delivery can finish after a short client deadline. Keep the original request
    // alive rather than showing a false failure or encouraging a duplicate send.
    const slowNotice = window.setTimeout(() => {
      contactFormStatus.textContent =
        "Still sending — confirmation is taking a little longer. No need to send again.";
    }, 8000);
    try {
      const outcome = await deliverMessage({
        endpoint: contactForm.action,
        draft: message,
        honeypot: contactForm.elements._honey.value,
        pageUrl: `${window.location.origin}${window.location.pathname}#contact`,
      });
      if (outcome === "activation-required") {
        contactFormStatus.textContent =
          "Email delivery is awaiting David’s inbox activation. Your message is still here; please try again later or use Copy message.";
      } else if (outcome === "accepted") {
        contactFormStatus.textContent =
          "Message sent. Thanks for reaching out — I’ll get back to you by email.";
        contactForm.reset();
      } else {
        throw new Error("The delivery service did not accept the message.");
      }
    } catch {
      contactFormStatus.textContent =
        "Delivery couldn’t be confirmed. Your message may have been sent, so please wait before trying again. Your text is still here to copy.";
    } finally {
      window.clearTimeout(slowNotice);
      contactFormSending = false;
      contactForm.removeAttribute("aria-busy");
      controls.forEach((control) => {
        control.disabled = false;
      });
      label.textContent = "Send message";
    }
  });
  document
    .querySelector("[data-copy-message]")
    ?.addEventListener("click", async () => {
      if (contactFormSending) return;
      const draft = contactMessage();
      if (!draft) return;
      try {
        await copyText(draft.copy);
        contactFormStatus.textContent =
          "Message copied. Paste it into an email to farcas.david@yahoo.com when you’re ready.";
      } catch {
        contactFormStatus.textContent =
          "Copy is unavailable in this browser. Your message is still here; select and copy it, then email farcas.david@yahoo.com.";
      }
    });

  return { close };
}
