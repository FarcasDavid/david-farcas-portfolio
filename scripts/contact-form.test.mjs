import assert from "node:assert/strict";
import test from "node:test";
import { initContactForm } from "../src/scripts/contact/contact-form.js";
import { createFormSubmitDelivery } from "../src/scripts/contact/formsubmit-delivery.js";

const message = {
  name: "QA Visitor",
  email: "qa@example.com",
  subject: "Portfolio enquiry",
  message: "A synthetic regression test. No email leaves this process.",
};
const flush = () => new Promise((resolve) => setImmediate(resolve));

// Import the public initializer. Only browser capabilities, HTTP and timers
// are replaced; validation, delivery parsing and pending-send behavior are real.
function createContact({ clipboardUnavailable = false } = {}) {
  let now = 0;
  let nextTimer = 0;
  const timers = new Map();
  const requests = [];
  const copied = [];
  let document;

  class Element {
    listeners = new Map();
    attributes = new Map();
    disabled = false;
    textContent = "";

    addEventListener(type, callback) {
      const listeners = this.listeners.get(type) || [];
      listeners.push(callback);
      this.listeners.set(type, listeners);
    }

    dispatch(type, event = {}) {
      return Promise.all(
        (this.listeners.get(type) || []).map((callback) => callback(event)),
      );
    }

    setAttribute(name, value) {
      this.attributes.set(name, value);
    }

    removeAttribute(name) {
      this.attributes.delete(name);
    }

    getAttribute(name) {
      return this.attributes.get(name) ?? null;
    }

    focus() {
      document.activeElement = this;
    }
  }

  const fields = Object.fromEntries(
    ["name", "email", "subject", "message", "_honey"].map((name) => [
      name,
      Object.assign(new Element(), {
        name,
        value: "",
        customError: "",
        setCustomValidity(error) {
          this.customError = error;
        },
      }),
    ]),
  );
  const requiredFields = Object.values(fields).filter(
    (field) => field.name !== "_honey",
  );
  const label = Object.assign(new Element(), { textContent: "Send message" });
  const sendButton = new Element();
  const copyButton = new Element();
  const status = new Element();
  const dialog = new Element();
  const openers = Array.from({ length: 3 }, () => new Element());
  const closeButton = new Element();
  const controls = [...Object.values(fields), sendButton, copyButton];
  const form = Object.assign(new Element(), {
    action: "https://formsubmit.co/ajax/farcas.david@yahoo.com",
    elements: fields,
    querySelectorAll(selector) {
      if (selector === "[required]") return requiredFields;
      if (selector === "input, textarea, button") return controls;
      throw new Error(`Unexpected form selector: ${selector}`);
    },
    querySelector(selector) {
      if (selector === "[data-send-label]") return label;
      throw new Error(`Unexpected form selector: ${selector}`);
    },
    reportValidity() {
      return requiredFields.every(
        (field) =>
          field.value &&
          !field.customError &&
          (field.name !== "email" ||
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)),
      );
    },
    reset() {
      Object.values(fields).forEach((field) => {
        field.value = "";
      });
    },
  });
  const bodyClasses = new Set();
  dialog.open = false;
  dialog.showModal = () => {
    dialog.open = true;
    fields.name.focus();
  };
  dialog.close = () => {
    dialog.open = false;
    return dialog.dispatch("close");
  };
  document = {
    activeElement: null,
    body: {
      classList: {
        add: (name) => bodyClasses.add(name),
        remove: (name) => bodyClasses.delete(name),
      },
    },
    querySelector(selector) {
      return (
        {
          "#contact-form-dialog": dialog,
          "#contact-form": form,
          "#contact-form-status": status,
          "[data-copy-message]": copyButton,
        }[selector] ?? null
      );
    },
    querySelectorAll(selector) {
      return (
        {
          "[data-open-contact-form]": openers,
          "[data-close-contact-form]": [closeButton],
        }[selector] ?? []
      );
    },
  };

  const window = {
    location: {
      origin: "https://portfolio.example.test",
      pathname: "/",
      assign() {
        throw new Error("Direct contact submission must not navigate");
      },
    },
    setTimeout(callback, delay) {
      const id = ++nextTimer;
      timers.set(id, { callback, at: now + delay });
      return id;
    },
    clearTimeout(id) {
      timers.delete(id);
    },
  };

  form.setAttribute("data-recipient", "farcas.david@yahoo.com");
  const controller = initContactForm({
    document,
    window,
    async copyText(value) {
      if (clipboardUnavailable) throw new Error("Clipboard unavailable");
      copied.push(value);
    },
    deliverMessage: createFormSubmitDelivery({
      fetch(url, options) {
        return new Promise((resolve, reject) => {
          options.signal?.addEventListener(
            "abort",
            () => reject(new DOMException("Request aborted", "AbortError")),
            { once: true },
          );
          requests.push({
            url,
            options,
            accept(
              body = { success: true },
              { ok = true, malformed = false } = {},
            ) {
              resolve({
                ok,
                async json() {
                  if (malformed) throw new SyntaxError("Invalid response JSON");
                  return body;
                },
              });
            },
            fail() {
              reject(new TypeError("Network unavailable"));
            },
          });
        });
      }
    }),
  });

  return {
    controller,
    fields,
    form,
    label,
    sendButton,
    copyButton,
    status,
    dialog,
    openers,
    closeButton,
    document,
    requests,
    copied,
    controls,
    fill(values = message) {
      Object.entries(values).forEach(([key, value]) => {
        fields[key].value = value;
      });
    },
    values() {
      return Object.fromEntries(
        requiredFields.map((field) => [field.name, field.value]),
      );
    },
    submit() {
      return form.dispatch("submit", { preventDefault() {} });
    },
    async advance(milliseconds) {
      const end = now + milliseconds;
      while (true) {
        const next = [...timers.entries()]
          .filter(([, timer]) => timer.at <= end)
          .sort((a, b) => a[1].at - b[1].at)[0];
        if (!next) break;
        now = next[1].at;
        timers.delete(next[0]);
        next[1].callback();
        await flush();
      }
      now = end;
      await flush();
    },
  };
}

test("a message accepted after 25 seconds stays pending and prevents duplicate submissions", async () => {
  const contact = createContact();
  contact.fill();
  const submitted = contact.submit();
  assert.equal(contact.requests.length, 1);
  assert.equal(contact.requests[0].url, "https://formsubmit.co/ajax/farcas.david@yahoo.com");
  assert.equal(contact.requests[0].options.method, "POST");
  assert.equal(contact.requests[0].options.credentials, "omit");
  assert.equal(contact.requests[0].options.keepalive, true);
  assert.equal(JSON.parse(contact.requests[0].options.body)._url, "https://portfolio.example.test/#contact");
  assert.match(
    contact.status.textContent,
    /sending/i,
    "Feedback must appear immediately",
  );
  assert.equal(contact.form.getAttribute("aria-busy"), "true");

  await contact.advance(25_000);
  assert.doesNotMatch(
    contact.status.textContent,
    /timed out|couldn.t be submitted|failed/i,
    "A pending delivery must not be reported as a timeout or invite duplicate retries",
  );
  assert.equal(contact.form.getAttribute("aria-busy"), "true");
  assert.equal(contact.sendButton.disabled, true);
  assert.deepEqual(contact.values(), message);
  await contact.submit();
  assert.equal(
    contact.requests.length,
    1,
    "A pending request must keep the duplicate guard",
  );

  contact.requests[0].accept({ success: "true" });
  await submitted;
  assert.match(contact.status.textContent, /message (?:sent|submitted)/i);
  assert.equal(contact.form.getAttribute("aria-busy"), null);
  assert.equal(contact.sendButton.disabled, false);
  assert(Object.values(contact.values()).every((value) => value === ""));
});

test("navigation can close the dialog without focusing a hidden opener", async () => {
  const contact = createContact();
  await contact.openers[0].dispatch("click");
  assert.equal(contact.dialog.open, true);
  contact.controller.close({ restoreFocus: false });
  assert.equal(contact.dialog.open, false);
  assert.notEqual(contact.document.activeElement, contact.openers[0]);
  await contact.openers[1].dispatch("click");
  await contact.closeButton.dispatch("click");
  assert.equal(contact.document.activeElement, contact.openers[1]);
});

test("a request still awaiting confirmation after two minutes remains locked until accepted", async () => {
  const contact = createContact();
  contact.fill();
  const submitted = contact.submit();
  const initialStatus = contact.status.textContent;

  await contact.advance(120_000);
  assert.notEqual(
    contact.status.textContent,
    initialStatus,
    "Slow delivery needs reassurance",
  );
  assert.match(contact.status.textContent, /still sending|taking.*longer/i);
  assert.doesNotMatch(
    contact.status.textContent,
    /timed out|failed|message sent/i,
  );
  assert.equal(contact.form.getAttribute("aria-busy"), "true");
  assert(contact.controls.every((control) => control.disabled));
  await contact.submit();
  await contact.copyButton.dispatch("click");
  assert.equal(contact.requests.length, 1, "Do not resend a pending message");
  assert.equal(
    contact.copied.length,
    0,
    "Do not race copying with a pending send",
  );

  contact.requests[0].accept({ success: true });
  await submitted;
  assert.match(contact.status.textContent, /^Message sent\./);
  assert(contact.controls.every((control) => !control.disabled));
});

for (const success of [true, "true"]) {
  test(`explicit ${typeof success} acceptance confirms success and clears the form`, async () => {
    const contact = createContact();
    contact.fill();
    const submitted = contact.submit();
    assert.doesNotMatch(contact.status.textContent, /^Message sent\./);
    contact.requests[0].accept({ success });
    await submitted;

    assert.match(contact.status.textContent, /^Message sent\./);
    assert(Object.values(contact.values()).every((value) => value === ""));
    assert.equal(contact.form.getAttribute("aria-busy"), null);
    assert(contact.controls.every((control) => !control.disabled));
    const confirmedStatus = contact.status.textContent;
    await contact.advance(120_000);
    assert.equal(
      contact.status.textContent,
      confirmedStatus,
      "A stale slow notice must not replace success",
    );
  });
}

const unsuccessfulResponses = [
  ["boolean rejection", { success: false }],
  ["string rejection", { success: "false" }],
  ["missing acceptance", {}],
  ["non-success HTTP response", { success: true }, { ok: false }],
  ["malformed JSON", undefined, { malformed: true }],
  ["null JSON", null],
];
for (const [name, response, options] of unsuccessfulResponses) {
  test(`${name} preserves the message without claiming a successful send`, async () => {
    const contact = createContact();
    contact.fill();
    const submitted = contact.submit();
    contact.requests[0].accept(response, options);
    await submitted;

    assert.deepEqual(contact.values(), message);
    assert.doesNotMatch(contact.status.textContent, /^Message sent\./);
    assert.match(contact.status.textContent, /couldn.t be confirmed/i);
    assert.equal(contact.form.getAttribute("aria-busy"), null);
    assert(contact.controls.every((control) => !control.disabled));
    const failureStatus = contact.status.textContent;
    await contact.advance(120_000);
    assert.equal(
      contact.status.textContent,
      failureStatus,
      "The slow notice must stop after failure",
    );
  });
}

test("an activation acknowledgement preserves input and does not claim delivery", async () => {
  const contact = createContact();
  contact.fill();
  const submitted = contact.submit();
  contact.requests[0].accept({
    success: true,
    message: "Please activate your email address",
  });
  await submitted;

  assert.deepEqual(contact.values(), message);
  assert.match(contact.status.textContent, /awaiting.*activation/i);
  assert.doesNotMatch(contact.status.textContent, /^Message sent\./);
  assert.equal(contact.form.getAttribute("aria-busy"), null);
  assert(contact.controls.every((control) => !control.disabled));
});

test("a genuine network failure preserves the message and allows a deliberate later retry", async () => {
  const contact = createContact();
  contact.fill();
  const submitted = contact.submit();
  contact.requests[0].fail();
  await submitted;

  assert.deepEqual(contact.values(), message);
  assert.match(contact.status.textContent, /couldn.t be confirmed/i);
  assert.match(
    contact.status.textContent,
    /may have been sent/i,
    "A lost acknowledgement does not prove delivery failed",
  );
  assert(contact.controls.every((control) => !control.disabled));
  const retried = contact.submit();
  assert.equal(contact.requests.length, 2);
  contact.requests[1].accept({ success: true });
  await retried;
  assert.match(contact.status.textContent, /^Message sent\./);
});

for (const [name, values] of [
  ["empty required fields", {}],
  ["whitespace-only name", { ...message, name: "   " }],
  ["whitespace-only message", { ...message, message: " \n " }],
  ["invalid email", { ...message, email: "invalid-address" }],
]) {
  test(`${name} cannot initiate a request`, async () => {
    const contact = createContact();
    contact.fill(values);
    await contact.submit();
    assert.equal(contact.requests.length, 0);
    assert.equal(contact.form.getAttribute("aria-busy"), null);
    assert(contact.controls.every((control) => !control.disabled));
  });
}

test("correcting an invalid field clears its error and allows submission", async () => {
  const contact = createContact();
  contact.fill({ ...message, name: " " });
  await contact.submit();
  contact.fields.name.value = message.name;
  await contact.form.dispatch("input", { target: contact.fields.name });
  const submitted = contact.submit();
  assert.equal(contact.requests.length, 1);
  contact.requests[0].accept();
  await submitted;
  assert.match(contact.status.textContent, /^Message sent\./);
});

test("Copy message keeps the complete draft without making a delivery request", async () => {
  const contact = createContact();
  contact.fill();
  await contact.copyButton.dispatch("click");
  assert.equal(contact.requests.length, 0);
  assert.equal(contact.copied.length, 1);
  for (const value of Object.values(message))
    assert(contact.copied[0].includes(value));
  assert.match(contact.status.textContent, /message copied/i);
  assert.deepEqual(contact.values(), message);
});

test("clipboard failure preserves the message and explains the fallback", async () => {
  const contact = createContact({ clipboardUnavailable: true });
  contact.fill();
  await contact.copyButton.dispatch("click");
  assert.equal(contact.requests.length, 0);
  assert.match(contact.status.textContent, /copy is unavailable/i);
  assert.deepEqual(contact.values(), message);
});

for (const index of [0, 1, 2]) {
  test(`contact entry point ${index + 1} opens the dialog and receives focus when it closes`, async () => {
    const contact = createContact();
    contact.fill();
    await contact.openers[index].dispatch("click");
    assert.equal(contact.dialog.open, true);
    await contact.closeButton.dispatch("click");
    assert.equal(contact.dialog.open, false);
    assert.equal(contact.document.activeElement, contact.openers[index]);
    assert.deepEqual(contact.values(), message);
  });
}
