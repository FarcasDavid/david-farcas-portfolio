import assert from "node:assert/strict";
import test from "node:test";
import { initTheme } from "../src/scripts/appearance/theme-controller.js";

function createTheme({ stored, blockedStorage = false, reducedMotion = false, transitions = false } = {}) {
  const buttons = Array.from({ length: 2 }, () => Object.assign(new EventTarget(), {
    attributes: new Map(),
    setAttribute(name, value) { this.attributes.set(name, value); },
  }));
  const classes = new Set();
  const document = {
    documentElement: {
      dataset: {},
      classList: { add: name => classes.add(name), remove: name => classes.delete(name) },
    },
    querySelectorAll: () => buttons,
  };
  const timers = new Map();
  const writes = [];
  const pendingTransitions = [];
  let nextTimer = 0;
  const window = {
    matchMedia: () => ({ matches: reducedMotion }),
    localStorage: {
      getItem(key) {
        assert.equal(key, "portfolio-theme");
        if (blockedStorage) throw new Error("Storage blocked");
        return stored;
      },
      setItem(key, value) {
        if (blockedStorage) throw new Error("Storage blocked");
        writes.push([key, value]);
      },
    },
    setTimeout(callback, delay) { timers.set(++nextTimer, { callback, delay }); return nextTimer; },
    clearTimeout(id) { timers.delete(id); },
  };
  if (transitions) {
    document.startViewTransition = update => {
      const transition = {
        update,
        skipped: false,
        ready: Promise.resolve(),
        finished: Promise.resolve(),
        skipTransition() { this.skipped = true; },
      };
      pendingTransitions.push(transition);
      return transition;
    };
  }
  initTheme({ document, window });
  return {
    document, buttons, classes, timers, writes, pendingTransitions,
    click(index = 0) { buttons[index].dispatchEvent(new Event("click")); },
    runTimers() { for (const [id, { callback }] of [...timers]) { timers.delete(id); callback(); } },
  };
}

function assertTheme(app, theme) {
  assert.equal(app.document.documentElement.dataset.theme, theme);
  for (const button of app.buttons) {
    assert.equal(button.attributes.get("aria-pressed"), String(theme === "light"));
    assert.equal(button.attributes.get("aria-label"), `Switch to ${theme === "light" ? "dark" : "light"} theme`);
  }
}

test("stored light is restored and missing or unrecognized preferences default to dark", () => {
  assertTheme(createTheme({ stored: "light" }), "light");
  for (const stored of [undefined, null, "dark", "unexpected"])
    assertTheme(createTheme({ stored }), "dark");
});

test("each toggle updates all accessible controls and persists the actual preference", () => {
  const app = createTheme({ stored: "light", reducedMotion: true });
  app.click();
  assertTheme(app, "dark");
  app.click(1);
  assertTheme(app, "light");
  assert.deepEqual(app.writes, [["portfolio-theme", "dark"], ["portfolio-theme", "light"]]);
});

test("blocked storage does not prevent local theme changes", () => {
  const app = createTheme({ blockedStorage: true });
  assertTheme(app, "dark");
  assert.doesNotThrow(() => app.click());
  assertTheme(app, "light");
  app.click();
  assertTheme(app, "dark");
});

test("reduced motion bypasses both native transitions and fallback animation", () => {
  const app = createTheme({ reducedMotion: true, transitions: true });
  app.click();
  assertTheme(app, "light");
  assert.equal(app.pendingTransitions.length, 0);
  assert.equal(app.timers.size, 0);
  assert.equal(app.classes.has("theme-changing"), false);
});

test("fallback transitions keep only the latest cleanup and finish with current theme", () => {
  const app = createTheme();
  app.click();
  assertTheme(app, "light");
  assert(app.classes.has("theme-changing"));
  app.click();
  assertTheme(app, "dark");
  assert.equal(app.timers.size, 1);
  app.runTimers();
  assert.equal(app.classes.has("theme-changing"), false);
  assertTheme(app, "dark");
});

test("rapid native toggles preserve final intent when skipped callbacks finish late", () => {
  const app = createTheme({ transitions: true });
  app.click();
  app.click();
  assert.equal(app.pendingTransitions.length, 2);
  assert.equal(app.pendingTransitions[0].skipped, true);
  // A skipped transition can still invoke its update after a newer request.
  app.pendingTransitions[1].update();
  app.pendingTransitions[0].update();
  assertTheme(app, "dark");
  assert.equal(app.writes.at(-1)[1], "dark");
  app.click();
  app.pendingTransitions[2].update();
  assertTheme(app, "light");
  assert.equal(app.timers.size, 0);
});
