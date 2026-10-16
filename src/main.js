const navigation = document.querySelector("#navigation");
const menuToggle = document.querySelector(".menu-toggle");
const tabs = [
  ...document.querySelectorAll('#navigation [role="tab"][data-view]'),
];
const panels = [...document.querySelectorAll('.view[role="tabpanel"]')];
const panelById = new Map(panels.map((panel) => [panel.id, panel]));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let activeView;

const themeButtons = [...document.querySelectorAll("[data-theme-toggle]")];
function selectTheme(theme) {
  document.documentElement.dataset.theme = theme;
  for (const button of themeButtons) {
    button.setAttribute(
      "aria-label",
      `Switch to ${theme === "light" ? "dark" : "light"} theme`,
    );
    button.setAttribute("aria-pressed", String(theme === "light"));
  }
}

let savedTheme = "dark";
try {
  if (window.localStorage.getItem("portfolio-theme") === "light")
    savedTheme = "light";
} catch {
  // Theme switching still works when browser storage is unavailable.
}
selectTheme(savedTheme);
for (const button of themeButtons) {
  button.addEventListener("click", () => {
    const theme =
      document.documentElement.dataset.theme === "light" ? "dark" : "light";
    selectTheme(theme);
    try {
      window.localStorage.setItem("portfolio-theme", theme);
    } catch {
      /* Keep the in-page choice. */
    }
  });
}

function closeMenu({ restoreFocus = false } = {}) {
  if (!menuToggle || !navigation) return;
  menuToggle.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
  if (restoreFocus) menuToggle.focus();
}

function routeFromHash() {
  try {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (panelById.has(id)) return { view: id };
    const target = document.getElementById(id);
    if (target?.matches("[data-experience-case]")) {
      const view = target.closest(".view")?.id;
      if (panelById.has(view)) return { view, target: id };
    }
  } catch {
    // Malformed or unknown fragments fall back to the overview.
  }
}

let pendingViewScroll;

function selectView(
  id,
  { history = "none", focusPanel = false, scroll = true, target } = {},
) {
  const selectedPanel = panelById.get(id);
  if (!selectedPanel) return;
  const contactDialog = document.querySelector("#contact-form-dialog");
  if (id !== "contact" && contactDialog?.open) contactDialog.close();
  activeView = id;

  for (const tab of tabs) {
    const selected = tab.dataset.view === id;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
    tab.classList.toggle("is-active", selected);
  }

  for (const panel of panels) {
    const selected = panel === selectedPanel;
    panel.hidden = !selected;
    panel.classList.toggle("is-active", selected);
    panel.tabIndex = -1;
  }

  document.body.dataset.view = id;
  const targetElement = target ? document.getElementById(target) : undefined;
  const validTarget =
    targetElement?.matches("[data-experience-case]") &&
    targetElement.closest(".view") === selectedPanel
      ? targetElement
      : undefined;
  const fragment = validTarget?.id || id;
  if (history !== "none" && window.location.hash !== `#${fragment}`) {
    const url = `${window.location.pathname}${window.location.search}#${fragment}`;
    window.history[history === "replace" ? "replaceState" : "pushState"](
      { view: id, target: validTarget?.id },
      "",
      url,
    );
  }

  closeMenu();
  window.cancelAnimationFrame(pendingViewScroll);
  if (validTarget) {
    pendingViewScroll = window.requestAnimationFrame(() => {
      validTarget.focus({ preventScroll: true });
      // On a stacked mobile layout, land on the fact itself rather than the prose above it.
      const scrollTarget = window.matchMedia("(max-width: 760px)").matches
        ? validTarget.querySelector("[data-case-evidence]") || validTarget
        : validTarget;
      scrollTarget.scrollIntoView({
        block: "start",
        behavior: reducedMotion.matches ? "instant" : "smooth",
      });
    });
  } else {
    if (scroll) window.scrollTo({ top: 0, behavior: "instant" });
    if (focusPanel) selectedPanel.focus({ preventScroll: true });
  }
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-view], button[data-view]");
  if (!link || !panelById.has(link.dataset.view)) return;
  if (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  )
    return;
  event.preventDefault();
  selectView(link.dataset.view, {
    history: "push",
    focusPanel: link.getAttribute("role") !== "tab",
    target: link.dataset.target,
  });
});

document
  .querySelector('a[href="#main"]')
  ?.addEventListener("click", (event) => {
    const main = document.querySelector("#main");
    if (!main) return;
    event.preventDefault();
    main.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  });

navigation?.addEventListener("keydown", (event) => {
  const tab = event.target.closest('[role="tab"][data-view]');
  if (!tab || !tabs.includes(tab)) return;
  const current = tabs.indexOf(tab);
  let next;
  switch (event.key) {
    case "ArrowRight":
      next = (current + 1) % tabs.length;
      break;
    case "ArrowLeft":
      next = (current - 1 + tabs.length) % tabs.length;
      break;
    case "Home":
      next = 0;
      break;
    case "End":
      next = tabs.length - 1;
      break;
    case " ":
      event.preventDefault();
      selectView(tab.dataset.view, { history: "push" });
      return;
    default:
      return;
  }
  event.preventDefault();
  tabs[next].focus({ preventScroll: true });
  selectView(tabs[next].dataset.view, { history: "push" });
});

function restoreView() {
  const route = routeFromHash();
  if (route) selectView(route.view, { target: route.target, scroll: true });
  else if (window.location.hash !== "#main" && panelById.has("home")) {
    selectView("home", { history: "replace" });
  }
}

window.addEventListener("popstate", restoreView);
window.addEventListener("hashchange", restoreView);
if (panels.length) {
  const initialRoute = routeFromHash();
  selectView(
    initialRoute?.view || (panelById.has("home") ? "home" : panels[0].id),
    {
      history: "replace",
      scroll: false,
      target: initialRoute?.target,
    },
  );
}

menuToggle?.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  navigation?.classList.toggle("is-open", open);
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuToggle?.getAttribute("aria-expanded") === "true"
  ) {
    closeMenu({ restoreFocus: true });
  }
});

const skills = {
  python: {
    title: "Python",
    description:
      "The connective tissue across my work: retrieval pipelines, language models, evaluation, APIs, and data processing.",
    proof:
      "Used across both recent AI systems and earlier AI applications and platform engineering at RebelDot.",
  },
  rag: {
    title: "RAG",
    description:
      "Turn past agent replies into reusable knowledge, retrieve relevant evidence, and draft answers with sources for human review.",
    proof:
      "Reported outcomes for the integrated knowledge pipeline: correct drafting 45% → 88%; top-5 retrieval 70% → 91%.",
  },
  dspy: {
    title: "DSPy / GEPA",
    description:
      "Make prompt optimization repeatable against explicit metrics instead of relying on ad hoc edits and intuition.",
    proof:
      "Classification and safety metrics for email assistance; macro-F1 and Cohen’s kappa for call-quality evaluation.",
  },
  bedrock: {
    title: "AWS Bedrock",
    description:
      "Connect Claude models to useful application flows, including Haiku reranking before source-cited email drafting.",
    proof:
      "AWS Bedrock in the RAG assistant, plus cross-region load balancing and LLM caching in earlier cloud AI work.",
  },
  postgres: {
    title: "PostgreSQL / pgvector",
    description:
      "Bring structured data and vector retrieval together, then make the underlying queries fast enough for usable applications.",
    proof:
      "pgvector retrieval for the email assistant; separate platform work reduced 2.5M-row queries from 25 seconds to under 2.",
  },
  fastapi: {
    title: "FastAPI",
    description:
      "Expose AI capabilities through clear Python APIs and connect model workflows to the applications people actually use.",
    proof:
      "Delivered AI applications alongside Streamlit, cloud infrastructure, authentication, and automated delivery practices.",
  },
  huggingface: {
    title: "HuggingFace Transformers",
    description:
      "Use focused language models for grounding, semantic clustering, and evidence verification alongside larger models.",
    proof:
      "DeBERTa NLI flags unsupported call-scoring reasoning; MPNet and DeBERTa support the agent-reply knowledge pipeline.",
  },
};

const skillButtons = [...document.querySelectorAll("button[data-skill]")];
function selectSkill(id) {
  const skill = skills[id];
  if (!skill) return;
  for (const button of skillButtons) {
    const selected = button.dataset.skill === id;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  }
  const title = document.querySelector("#skill-title");
  const description = document.querySelector("#skill-description");
  const proof = document.querySelector("#skill-proof");
  if (title) title.textContent = skill.title;
  if (description) description.textContent = skill.description;
  if (proof) proof.textContent = skill.proof;
  document.body.dataset.activeSkill = id;
}

for (const button of skillButtons) {
  button.addEventListener("click", () => selectSkill(button.dataset.skill));
}
const initialSkill =
  skillButtons.find(
    (button) => button.getAttribute("aria-pressed") === "true",
  ) || skillButtons[0];
if (initialSkill) selectSkill(initialSkill.dataset.skill);

const stages = {
  prepare: {
    index: "01",
    title: "Start with data you can trust.",
    description:
      "Garbage in, garbage out. I collect relevant inputs, clean and validate them, and prepare a consistent foundation for the model.",
  },
  inference: {
    index: "02",
    title: "Turn inputs into useful output.",
    description:
      "I shape the model workflow around the problem, with clear inputs, outputs, and constraints. Prepared data becomes predictions or generated results.",
  },
  evaluate: {
    index: "03",
    title: "Define success. Test. Refine.",
    description:
      "I test against representative examples, inspect failure cases, and compare changes against measurable baselines. Quality is checked, not assumed.",
  },
  deliver: {
    index: "04",
    title: "Make it useful. Keep improving.",
    description:
      "I connect the model to an application with clear interfaces, validation, and practical safeguards. Feedback and monitoring guide the next improvement.",
  },
};

const stageButtons = [...document.querySelectorAll("button[data-stage]")];
function selectStage(id) {
  const stage = stages[id];
  if (!stage) return;
  for (const button of stageButtons) {
    const selected = button.dataset.stage === id;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
    button
      .closest(".pipeline, .system-map, [data-pipeline]")
      ?.setAttribute("data-active-stage", id);
  }
  const title = document.querySelector("#stage-title");
  const description = document.querySelector("#stage-description");
  const index = document.querySelector("#stage-index");
  if (title) title.textContent = stage.title;
  if (description) description.textContent = stage.description;
  if (index) index.textContent = stage.index;
  document.body.dataset.activeStage = id;
}

for (const button of stageButtons) {
  button.addEventListener("click", () => selectStage(button.dataset.stage));
}
const initialStage =
  stageButtons.find(
    (button) => button.getAttribute("aria-pressed") === "true",
  ) || stageButtons[0];
if (initialStage) selectStage(initialStage.dataset.stage);

for (const button of document.querySelectorAll("[data-copy-email]")) {
  button.addEventListener("click", async () => {
    const email = button.dataset.copyEmail || "farcas.david@yahoo.com";
    const status = document.querySelector("#copy-status");
    try {
      await navigator.clipboard.writeText(email);
      if (status) status.textContent = "Email address copied.";
    } catch {
      if (status)
        status.textContent = `Copy unavailable. Email ${email}, or use the email button.`;
    }
  });
}

const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
for (const field of document.querySelectorAll(
  ".interactive-field, .skill-button",
)) {
  let frame;
  field.addEventListener("pointermove", (event) => {
    if (reducedMotion.matches || !finePointer.matches) return;
    window.cancelAnimationFrame(frame);
    frame = window.requestAnimationFrame(() => {
      const bounds = field.getBoundingClientRect();
      field.style.setProperty(
        "--pointer-x",
        `${event.clientX - bounds.left}px`,
      );
      field.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
    });
  });
  field.addEventListener("pointerleave", () => {
    window.cancelAnimationFrame(frame);
    field.style.removeProperty("--pointer-x");
    field.style.removeProperty("--pointer-y");
  });
}

// FormSubmit delivers messages server-side; no mailbox credentials live in the browser.
const contactDialog = document.querySelector("#contact-form-dialog");
const contactForm = document.querySelector("#contact-form");
const contactFormStatus = document.querySelector("#contact-form-status");
let contactFormOpener;
let contactFormSending = false;

for (const button of document.querySelectorAll("[data-open-contact-form]")) {
  button.addEventListener("click", () => {
    contactFormOpener = button;
    contactDialog.showModal();
    document.body.classList.add("has-contact-dialog");
  });
}
for (const button of document.querySelectorAll("[data-close-contact-form]")) {
  button.addEventListener("click", () => contactDialog.close());
}
contactDialog?.addEventListener("close", () => {
  document.body.classList.remove("has-contact-dialog");
  contactFormOpener?.focus({ preventScroll: true });
});

function contactMessage() {
  for (const field of contactForm.querySelectorAll("[required]")) {
    field.setCustomValidity(
      field.value.trim() ? "" : "Please fill in this field.",
    );
  }
  if (!contactForm.reportValidity()) return;
  const values = new FormData(contactForm);
  const name = values
    .get("name")
    .trim()
    .replace(/[\r\n]+/g, " ");
  const email = values.get("email").trim();
  const subject = values
    .get("subject")
    .trim()
    .replace(/[\r\n]+/g, " ");
  const message = values.get("message").trim();
  const body = `Name: ${name}\r\nEmail: ${email}\r\n\r\n${message}`;
  return {
    name,
    email,
    subject,
    message,
    copy: `To: farcas.david@yahoo.com\nSubject: ${subject}\n\n${body}`,
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
  const payload = {
    name: message.name,
    email: message.email,
    subject: message.subject,
    message: message.message,
    _subject: `Portfolio — ${message.subject}`,
    _template: "table",
    _honey: contactForm.elements._honey.value,
    _url: `${window.location.origin}${window.location.pathname}#contact`,
  };
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
    const response = await fetch(contactForm.action, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      credentials: "omit",
      keepalive: true,
    });
    const result = await response.json();
    if (!response.ok) throw new Error("The delivery service is unavailable.");
    const activationPending = /activat|confirm.*email|email.*confirm/i.test(
      result.message || "",
    );
    if (activationPending) {
      contactFormStatus.textContent =
        "Email delivery is awaiting David’s inbox activation. Your message is still here; please try again later or use Copy message.";
    } else if (result.success === true || result.success === "true") {
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
      await navigator.clipboard.writeText(draft.copy);
      contactFormStatus.textContent =
        "Message copied. Paste it into an email to farcas.david@yahoo.com when you’re ready.";
    } catch {
      contactFormStatus.textContent =
        "Copy is unavailable in this browser. Your message is still here; select and copy it, then email farcas.david@yahoo.com.";
    }
  });
