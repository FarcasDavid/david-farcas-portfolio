import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { assembleHtml } from "./lib/assemble-html.mjs";
import { assembleStyles } from "./lib/assemble-styles.mjs";

async function fixture(t, files) {
  const root = await mkdtemp(path.join(os.tmpdir(), "portfolio-build-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  for (const [file, content] of Object.entries(files)) {
    await mkdir(path.dirname(path.join(root, file)), { recursive: true });
    await writeFile(path.join(root, file), content);
  }
  return root;
}

test("HTML assembly preserves static content and resolves nested includes", async (t) => {
  const root = await fixture(t, {
    "index.html": "<main><!-- include: pages/about.html --></main>",
    "pages/about.html": "<section><!-- include: sections/stack.html --></section>",
    "sections/stack.html": "<h2>Tech Stack</h2>",
  });
  assert.equal(await assembleHtml(root), "<main><section><h2>Tech Stack</h2></section></main>");
});

test("HTML assembly rejects missing, circular and outside-source includes", async (t) => {
  const root = await fixture(t, {
    "index.html": "<!-- include: missing.html -->",
    "cycle.html": "<!-- include: cycle.html -->",
    "escape.html": "<!-- include: ../outside.html -->",
  });
  await assert.rejects(assembleHtml(root), /ENOENT/);
  await assert.rejects(assembleHtml(root, "cycle.html"), /Circular/);
  await assert.rejects(assembleHtml(root, "escape.html"), /escapes/);
});

test("CSS assembly preserves cascade order and rebases URLs in every module", async (t) => {
  const root = await fixture(t, {
    "styles.css": '@import "./styles/base.css";\n@import "./styles/contact.css";\nfooter { background: url("./assets/footer.svg"); }',
    "styles/base.css": 'body { color: black; background: url("../assets/bg.svg"); }',
    "styles/contact.css": '@import "./form/fields.css";\nbody { color: white; }',
    "styles/form/fields.css": 'input { background: url("../../assets/field.svg"); }',
  });
  const css = await assembleStyles(root);
  assert(css.indexOf("color: black") < css.indexOf("color: white"));
  for (const asset of ["bg.svg", "field.svg", "footer.svg"]) assert(css.includes(`url("assets/${asset}")`));
  assert(!css.includes("@import"));
});

test("CSS assembly fails before output on missing or circular imports", async (t) => {
  const root = await fixture(t, {
    "styles.css": '@import "./missing.css";',
    "cycle.css": '@import "./cycle.css";',
    "escape.css": '@import "../outside.css";',
  });
  await assert.rejects(assembleStyles(root), /ENOENT/);
  await assert.rejects(assembleStyles(root, "cycle.css"), /Circular/);
  await assert.rejects(assembleStyles(root, "escape.css"), /escapes/);
});
