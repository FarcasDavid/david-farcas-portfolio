import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import { Script } from "node:vm";

const html = await readFile("dist/index.html", "utf8");
const css = await readFile("dist/styles.css", "utf8");
const script = await readFile("dist/main.js", "utf8");
new Script(script, { filename: "dist/main.js" });

function attributes(tag) {
  const content = tag.replace(/^<\/?[\w-]+/, "").replace(/\/?>$/, "");
  return Object.fromEntries(
    [
      ...content.matchAll(
        /([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g,
      ),
    ].map(([, key, double, single, unquoted]) => [
      key,
      double ?? single ?? unquoted ?? "",
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
for (const stage of ["ingest", "retrieve", "evaluate", "deliver"]) {
  const button = tags.find(({ attrs }) => attrs["data-stage"] === stage);
  assert(button?.tag.startsWith("<button"), `Missing ${stage} pipeline button`);
  assert(
    ["true", "false"].includes(button.attrs["aria-pressed"]),
    `${stage} needs a pressed state`,
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
for (const { attrs } of anchors.filter(({ attrs }) =>
  attrs.href?.endsWith(".pdf"),
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
  "Passed: five accessible tab/panel mappings, interactive controls, logo/contact links, local assets, unique IDs, searchable skills, motion/focus support, approved CV integrity.",
);
