import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import { Script } from "node:vm";

const html = await readFile("dist/index.html", "utf8");
const css = await readFile("dist/styles.css", "utf8");
const script = await readFile("dist/main.js", "utf8");
new Script(script, { filename: "dist/main.js" });

function decodeEntities(value) {
  return value.replace(
    /&(quot|apos|amp|lt|gt|#39);/g,
    (_, entity) =>
      ({
        quot: '"',
        apos: "'",
        amp: "&",
        lt: "<",
        gt: ">",
        "#39": "'",
      })[entity],
  );
}

function textContent(markup) {
  return decodeEntities(markup.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function attributes(tag) {
  const content = tag.replace(/^<\/?[\w-]+/, "").replace(/\/?>$/, "");
  return Object.fromEntries(
    [
      ...content.matchAll(
        /([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g,
      ),
    ].map(([, key, double, single, unquoted]) => [
      key,
      decodeEntities(double ?? single ?? unquoted ?? ""),
    ]),
  );
}

const tags = [...html.matchAll(/<[a-z][^>]*>/gi)].map(([tag]) => ({
  tag,
  attrs: attributes(tag),
}));
const ids = tags
  .filter(({ attrs }) => "id" in attrs)
  .map(({ attrs }) => attrs.id);
assert.equal(ids.length, new Set(ids).size, "Duplicate IDs");

for (const { attrs } of tags) {
  for (const href of [attrs.href, attrs.src].filter(Boolean)) {
    if (href.startsWith("#"))
      assert(
        ids.includes(decodeURIComponent(href.slice(1))),
        `Missing anchor ${href}`,
      );
    else if (href.startsWith("./"))
      await stat("dist/" + href.slice(2).split(/[?#]/)[0]);
  }
  if (attrs.target === "_blank")
    assert(
      attrs.rel?.split(/\s+/).includes("noopener"),
      "External new-tab links need noopener",
    );
  for (const [, asset] of (attrs.style || "").matchAll(
    /url\(['"]?(\.\/[^)'"\s]+)['"]?\)/g,
  )) {
    await stat("dist/" + asset.slice(2));
  }
}

const views = ["home", "experience", "stack", "about", "contact"];
const tabs = tags.filter(({ attrs }) => attrs.role === "tab");
const panels = tags.filter(({ attrs }) => attrs.role === "tabpanel");
assert.equal(tabs.length, views.length, "Expected five navigation tabs");
assert.equal(panels.length, views.length, "Expected five application panels");
assert(
  tags.some(({ attrs }) => attrs.role === "tablist" && attrs["aria-label"]),
  "Tab navigation needs a named tablist",
);
for (const view of views) {
  const tab = tabs.find(({ attrs }) => attrs["data-view"] === view)?.attrs;
  const panel = panels.find(({ attrs }) => attrs.id === view)?.attrs;
  assert(tab && panel, `Missing ${view} tab or panel`);
  assert.equal(tab.id, `tab-${view}`, `Unexpected tab ID for ${view}`);
  assert.equal(tab.href, `#${view}`, `Tab must support deep linking: ${view}`);
  assert.equal(tab["aria-controls"], view);
  assert.equal(panel["aria-labelledby"], tab.id);
  assert.equal(tab["aria-selected"], String(view === "home"));
  assert.equal(tab.tabindex, view === "home" ? "0" : "-1");
  assert.equal(
    "hidden" in panel,
    view !== "home",
    `Initial visibility is wrong for ${view}`,
  );
}
assert(
  !tags.some(({ attrs }) => attrs["data-view"] === "projects"),
  "Personal projects are not part of this application",
);

for (const skill of [
  "python",
  "rag",
  "dspy",
  "bedrock",
  "postgres",
  "fastapi",
  "huggingface",
]) {
  const buttons = tags.filter(({ attrs }) => attrs["data-skill"] === skill);
  assert.equal(buttons.length, 1, `Expected one ${skill} skill button`);
  assert(
    buttons[0].tag.startsWith("<button"),
    `${skill} must be an accessible native button`,
  );
  assert(
    ["true", "false"].includes(buttons[0].attrs["aria-pressed"]),
    `${skill} needs a pressed state`,
  );
}
const workflowStages = ["prepare", "inference", "evaluate", "deliver"];
assert.equal(
  tags.filter(({ attrs }) => "data-stage" in attrs).length,
  workflowStages.length,
  "Expected four workflow stages",
);
for (const stage of workflowStages) {
  const button = tags.find(({ attrs }) => attrs["data-stage"] === stage);
  assert(button?.tag.startsWith("<button"), `Missing ${stage} pipeline button`);
  assert(
    ["true", "false"].includes(button.attrs["aria-pressed"]),
    `${stage} needs a pressed state`,
  );
  const markup = [
    ...html.matchAll(/<button\b[^>]*>[\s\S]*?<\/button\s*>/g),
  ].find(
    ([markup]) =>
      attributes(markup.match(/^<button\b[^>]*>/)[0])["data-stage"] === stage,
  )?.[0];
  assert(
    new RegExp(`\\b${stage}\\b`, "i").test(textContent(markup)),
    `The ${stage} workflow button needs its visible label`,
  );
}
for (const id of [
  "skill-title",
  "skill-description",
  "skill-proof",
  "stage-title",
  "stage-description",
]) {
  assert(ids.includes(id), `Missing interactive content target #${id}`);
}

const anchors = [...html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a\s*>/g)].map(
  ([anchor]) => ({ anchor, attrs: attributes(anchor.match(/^<a\b[^>]*>/)[0]) }),
);
for (const id of [
  "experience-email",
  "experience-calls",
  "experience-platform",
]) {
  const caseStudy = tags.find(({ attrs }) => attrs.id === id);
  assert(
    caseStudy?.tag.startsWith("<article") &&
      "data-experience-case" in caseStudy.attrs,
    `Missing experience article #${id}`,
  );
  assert.equal(
    caseStudy.attrs.tabindex,
    "-1",
    `Experience article #${id} needs programmatic focus`,
  );
  const caseMarkup = [
    ...html.matchAll(/<article\b[^>]*>[\s\S]*?<\/article\s*>/g),
  ].find(
    ([markup]) => attributes(markup.match(/^<article\b[^>]*>/)[0]).id === id,
  )?.[0];
  assert(
    caseMarkup && /\bdata-case-evidence\b/.test(caseMarkup),
    `Experience article #${id} needs a mobile evidence target`,
  );
  const evidenceLinks = anchors.filter(
    ({ attrs }) => attrs["data-target"] === id,
  );
  assert.equal(
    evidenceLinks.length,
    1,
    `Expected one overview evidence link to #${id}`,
  );
  assert.equal(
    evidenceLinks[0].attrs.href,
    `#${id}`,
    `Evidence link to #${id} needs a shareable fragment`,
  );
  assert.equal(
    evidenceLinks[0].attrs["data-view"],
    "experience",
    `Evidence link to #${id} must reveal Experience`,
  );
}
assert(!/Email\s+David/i.test(html), "Email action labels should read Email");
const emailCircles = tags.filter(
  ({ attrs }) =>
    attrs["aria-label"] === "Email" &&
    attrs.class?.split(/\s+/).includes("circle-link"),
);
assert.equal(
  emailCircles.length,
  2,
  "Overview and Contact need an Email circle",
);
for (const { tag, attrs } of emailCircles) {
  assert(
    tag.startsWith("<button") && "data-open-contact-form" in attrs,
    "Email circles must open the contact form using native buttons",
  );
}
for (const href of [
  "https://github.com/FarcasDavid",
  "https://www.linkedin.com/in/farcas-david/",
  "https://www.instagram.com/david.seiph/",
  "mailto:farcas.david@yahoo.com",
  "tel:+40720806333",
  "./cv/David_Farcas_2026_CV.pdf",
]) {
  const links = anchors.filter(({ attrs }) => attrs.href === href);
  assert(links.length > 0, `Missing approved contact destination ${href}`);
  if (href.startsWith("https:") || href.endsWith(".pdf")) {
    assert(
      links.some(
        ({ attrs, anchor }) =>
          attrs["aria-label"] &&
          (/<svg\b/.test(anchor) || /class="brand-icon"/.test(anchor)),
      ),
      `Expected an accessible logo button for ${href}`,
    );
  }
}
for (const { attrs } of anchors.filter(
  ({ attrs }) => attrs.href === "./cv/David_Farcas_2026_CV.pdf",
)) {
  assert("download" in attrs, "CV actions must download the approved PDF");
}
assert(
  tags.some(
    ({ tag, attrs }) =>
      tag.startsWith("<button") &&
      "data-theme-toggle" in attrs &&
      attrs["aria-label"],
  ),
  "Theme control needs an accessible name",
);

const contactOpeners = tags.filter(
  ({ attrs }) => "data-open-contact-form" in attrs,
);
assert.equal(
  contactOpeners.length,
  3,
  "Overview and Contact need three form entry points",
);
for (const { tag, attrs } of contactOpeners) {
  assert(
    tag.startsWith("<button"),
    "Contact form actions must be native buttons",
  );
  assert.equal(
    attrs.type,
    "button",
    "Opening the contact form must not submit a form",
  );
  assert.equal(attrs["aria-controls"], "contact-form-dialog");
}
const dialog = [...html.matchAll(/<dialog\b[^>]*>[\s\S]*?<\/dialog\s*>/g)].find(
  ([markup]) =>
    attributes(markup.match(/^<dialog\b[^>]*>/)[0]).id ===
    "contact-form-dialog",
)?.[0];
assert(dialog, "Contact form needs a native dialog");
const dialogAttributes = attributes(dialog.match(/^<dialog\b[^>]*>/)[0]);
assert(
  dialogAttributes["aria-label"] ||
    ids.includes(dialogAttributes["aria-labelledby"]),
  "Contact dialog needs an accessible name",
);
assert(!("open" in dialogAttributes), "Contact dialog starts closed");
const contactForm = [
  ...dialog.matchAll(/<form\b[^>]*>[\s\S]*?<\/form\s*>/g),
].find(
  ([markup]) =>
    attributes(markup.match(/^<form\b[^>]*>/)[0]).id === "contact-form",
)?.[0];
assert(contactForm, "Contact dialog needs form#contact-form");
const formAttributes = attributes(contactForm.match(/^<form\b[^>]*>/)[0]);
assert.equal(
  formAttributes.action,
  "https://formsubmit.co/ajax/farcas.david@yahoo.com",
  "Contact form must use the configured FormSubmit AJAX destination",
);
assert.equal(
  formAttributes.method?.toLowerCase(),
  "post",
  "Contact form must submit using POST",
);
const fields = [...contactForm.matchAll(/<(?:input|textarea)\b[^>]*>/g)].map(
  ([tag]) => ({ tag, attrs: attributes(tag) }),
);
const honeypot = fields.find(({ attrs }) => attrs.name === "_honey");
assert(
  honeypot?.tag.startsWith("<input"),
  "Contact form needs the FormSubmit honeypot",
);
assert(
  !("required" in honeypot.attrs),
  "The honeypot must remain optional for human visitors",
);
assert(
  !fields.some(({ attrs }) =>
    /^(?:api[_-]?key|access[_-]?key|secret|secret[_-]?key|token)$/i.test(
      attrs.name || "",
    ),
  ),
  "Public contact markup must not contain secret-key fields",
);
const labels = [
  ...contactForm.matchAll(/<label\b[^>]*>[\s\S]*?<\/label\s*>/g),
].map(([label]) => ({
  label,
  attrs: attributes(label.match(/^<label\b[^>]*>/)[0]),
}));
for (const name of ["name", "email", "subject", "message"]) {
  const field = fields.find(({ attrs }) => attrs.name === name);
  assert(field, `Contact form needs a ${name} field`);
  assert("required" in field.attrs, `Contact ${name} field must be required`);
  assert(
    field.attrs.id &&
      labels.some(
        ({ label, attrs }) =>
          (attrs.for === field.attrs.id ||
            label.includes(`id="${field.attrs.id}"`)) &&
          textContent(label),
      ),
    `Contact ${name} field needs an associated visible label`,
  );
  if (name === "email")
    assert.equal(
      field.attrs.type,
      "email",
      "Email field needs native email validation",
    );
  if (name === "message")
    assert(field.tag.startsWith("<textarea"), "Message field needs a textarea");
}
const submitButton = [
  ...contactForm.matchAll(/<button\b[^>]*>[\s\S]*?<\/button\s*>/g),
].find(
  ([markup]) =>
    attributes(markup.match(/^<button\b[^>]*>/)[0]).type === "submit",
)?.[0];
assert(
  submitButton && textContent(submitButton) === "Send message",
  "The direct contact submission action must read Send message",
);

const source = await readFile("public/cv/David_Farcas_2026_CV.pdf");
const built = await readFile("dist/cv/David_Farcas_2026_CV.pdf");
assert(source.equals(built), "Built CV differs from approved CV");
assert.equal(
  createHash("sha256").update(source).digest("hex"),
  "e723ecc57ccd175d901a3450ab2ae83266e252335c80300e98c3bba16000853d",
);
assert.equal((html.match(/<h1\b/g) || []).length, 1);
for (const term of [
  "RAG",
  "DSPy",
  "GEPA",
  "HuggingFace Transformers",
  "FastAPI",
  "PostgreSQL",
  "AWS Bedrock",
]) {
  assert(html.includes(term), `Missing searchable skill name: ${term}`);
}
assert(
  css.includes("prefers-reduced-motion"),
  "Motion must respect the browser preference",
);
assert(css.includes("focus-visible"), "Keyboard focus must remain visible");
console.log(
  "Passed: five accessible tab/panel mappings, four workflow stages, FormSubmit contact form, interactive controls, logo/contact links, local assets, unique IDs, searchable skills, motion/focus support, approved CV integrity.",
);
