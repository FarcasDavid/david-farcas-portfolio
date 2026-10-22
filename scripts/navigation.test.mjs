import assert from "node:assert/strict";
import test from "node:test";
import { resolvePortfolioRoute } from "../src/scripts/navigation/portfolio-routes.js";
import { initViewNavigation } from "../src/scripts/navigation/view-navigation.js";

const views = ["about", "experience", "contact"];
const routeContext = {
  views: new Set(views),
  targets: new Map([
    ["about-me", "about"],
    ["tech-stack", "about"],
    ["experience-email", "experience"],
    ["experience-calls", "experience"],
    ["experience-platform", "experience"],
  ]),
};

test("routes resolve current views, supported deep links, and saved legacy links", () => {
  for (const view of views)
    assert.deepEqual(resolvePortfolioRoute(`#${view}`, routeContext), { view });
  for (const [target, view] of routeContext.targets)
    assert.deepEqual(resolvePortfolioRoute(`#${target}`, routeContext), { view, target });
  assert.deepEqual(resolvePortfolioRoute("#home", routeContext), { view: "about" });
  for (const hash of ["#stack", "#toolkit", "#tech%2Dstack"])
    assert.deepEqual(resolvePortfolioRoute(hash, routeContext), { view: "about", target: "tech-stack" });
});

test("malformed, unknown, and unavailable destinations cannot resolve", () => {
  for (const hash of ["", "#", "#%E0%A4%A", "#missing", "#constructor", "#__proto__"])
    assert.equal(resolvePortfolioRoute(hash, routeContext), undefined);
  assert.equal(resolvePortfolioRoute("#home", { views: new Set(), targets: new Map() }), undefined);
  assert.equal(resolvePortfolioRoute("#stack", { views: new Set(views), targets: new Map() }), undefined);
  assert.equal(resolvePortfolioRoute("#orphan", {
    views: new Set(views), targets: new Map([["orphan", "missing"]]),
  }), undefined);
});

// Only DOM, event, history, and animation-frame capabilities are replaced.
// Routing, selection, focus decisions, and scroll cancellation run unchanged.
function createNavigation({ hash = "", mobile = false, reducedMotion = false } = {}) {
  let document;
  const scrolls = [];
  class Element extends EventTarget {
    constructor(id, { view, panel, target = false, role } = {}) {
      super();
      this.id = id;
      this.dataset = view ? { view } : {};
      this.panel = panel;
      this.isTarget = target;
      this.attributes = new Map(role ? [["role", role]] : []);
      this.classes = new Set();
      this.classList = {
        add: value => this.classes.add(value),
        toggle: (value, selected) => selected ? this.classes.add(value) : this.classes.delete(value),
      };
      this.style = {};
      this.offsetWidth = 100;
      this.offsetHeight = 40;
      this.offsetLeft = 0;
      this.offsetTop = 0;
    }
    setAttribute(name, value) { this.attributes.set(name, String(value)); }
    getAttribute(name) { return this.attributes.get(name) ?? null; }
    prepend(child) { this.indicator = child; }
    closest(selector) {
      if (selector === ".view") return this.panel;
      if (selector.includes("data-view") && this.dataset.view) {
        return !selector.includes('role="tab"') || this.getAttribute("role") === "tab" ? this : null;
      }
      return null;
    }
    matches() { return this.isTarget; }
    querySelector() { return this.evidence ?? null; }
    focus() { document.activeElement = this; }
    scrollIntoView(options) { scrolls.push({ id: this.id, ...options }); }
  }
  const panels = views.map(id => new Element(id));
  const tabs = views.map((view, index) => {
    const tab = new Element(`tab-${view}`, { view, role: "tab" });
    tab.offsetLeft = index * 100;
    return tab;
  });
  const targets = [...routeContext.targets].map(([id, view]) => {
    const target = new Element(id, { panel: panels.find(panel => panel.id === view), target: true });
    if (view === "experience") target.evidence = new Element(`${id}-evidence`);
    return target;
  });
  const navigation = new Element("navigation");
  const main = new Element("main");
  const skip = new Element("skip");
  const all = [navigation, main, ...tabs, ...panels, ...targets];
  document = Object.assign(new EventTarget(), {
    body: { dataset: {} },
    activeElement: null,
    querySelector(selector) {
      if (selector === 'a[href="#main"]') return skip;
      return all.find(element => `#${element.id}` === selector) ?? null;
    },
    querySelectorAll(selector) {
      if (selector.startsWith("#navigation")) return tabs;
      if (selector.startsWith(".view")) return panels;
      return targets;
    },
    getElementById(id) { return all.find(element => element.id === id) ?? null; },
    createElement() { return new Element(""); },
  });
  const frames = new Map();
  let nextFrame = 0;
  const location = { pathname: "/portfolio/", search: "?preview=1", hash };
  const history = [location.pathname + location.search + hash];
  let historyIndex = 0;
  const moveLocation = url => { location.hash = new URL(url, "https://example.test").hash; };
  const window = Object.assign(new EventTarget(), {
    location,
    matchMedia(query) { return { matches: query.includes("reduced-motion") ? reducedMotion : mobile }; },
    history: {
      pushState(state, title, url) {
        history.splice(historyIndex + 1);
        history.push(url);
        historyIndex++;
        moveLocation(url);
      },
      replaceState(state, title, url) { history[historyIndex] = url; moveLocation(url); },
    },
    requestAnimationFrame(callback) { frames.set(++nextFrame, callback); return nextFrame; },
    cancelAnimationFrame(id) { frames.delete(id); },
    scrollTo(options) { scrolls.push({ id: "window", ...options }); },
  });
  function dispatch(receiver, type, target, properties = {}) {
    const event = new Event(type, { cancelable: true });
    Object.defineProperty(event, "target", { value: target });
    Object.assign(event, properties);
    receiver.dispatchEvent(event);
    return event;
  }
  const changes = [];
  initViewNavigation({ document, window, onViewChange: view => changes.push(view) });
  return {
    document, window, panels, tabs, targets, navigation, scrolls, history, changes,
    click(view, { target, ...modifiers } = {}) {
      const link = new Element("link", { view });
      if (target) link.dataset.target = target;
      return dispatch(document, "click", link, { button: 0, ...modifiers });
    },
    key(view, key) { return dispatch(navigation, "keydown", tabs.find(tab => tab.dataset.view === view), { key }); },
    traverse(delta) {
      historyIndex += delta;
      moveLocation(history[historyIndex]);
      window.dispatchEvent(new Event("popstate"));
      window.dispatchEvent(new Event("hashchange"));
    },
    flushFrames() {
      for (const [id, callback] of [...frames]) { frames.delete(id); callback(); }
    },
    skip() { return dispatch(skip, "click", skip); },
  };
}

function assertSelected(app, expected) {
  assert.equal(app.document.body.dataset.view, expected);
  assert.deepEqual(app.panels.filter(panel => !panel.hidden).map(panel => panel.id), [expected]);
  for (const tab of app.tabs) {
    assert.equal(tab.getAttribute("aria-selected"), String(tab.dataset.view === expected));
    assert.equal(tab.tabIndex, tab.dataset.view === expected ? 0 : -1);
  }
}

test("initial aliases canonicalize without adding history and unknown hashes fall back", () => {
  for (const hash of ["#stack", "#toolkit"]) {
    const app = createNavigation({ hash });
    assertSelected(app, "about");
    assert.equal(app.window.location.hash, "#tech-stack");
    assert.equal(app.history.length, 1);
    app.flushFrames();
    assert.equal(app.document.activeElement.id, "tech-stack");
  }
  for (const hash of ["#home", "#unknown", "#%broken"]) {
    const app = createNavigation({ hash });
    assertSelected(app, "about");
    assert.equal(app.window.location.hash, "#about");
  }
});

test("view links preserve URL context, focus their panel, and support history traversal", () => {
  const app = createNavigation();
  assert(app.click("experience").defaultPrevented);
  assertSelected(app, "experience");
  assert.equal(app.document.activeElement.id, "experience");
  assert.equal(app.history.at(-1), "/portfolio/?preview=1#experience");
  app.click("contact");
  app.traverse(-1);
  assertSelected(app, "experience");
  app.traverse(1);
  assertSelected(app, "contact");
  assert(app.changes.includes("experience"));
});

test("tab keyboard navigation wraps, supports Home/End/Space, and preserves focus", () => {
  const app = createNavigation();
  for (const [from, key, to] of [
    ["about", "ArrowLeft", "contact"], ["contact", "ArrowRight", "about"],
    ["about", "End", "contact"], ["contact", "Home", "about"],
    ["about", "ArrowRight", "experience"],
  ]) {
    assert(app.key(from, key).defaultPrevented);
    assertSelected(app, to);
    assert.equal(app.document.activeElement.id, `tab-${to}`);
  }
  assert(app.key("experience", " ").defaultPrevented);
  assertSelected(app, "experience");
  assert.equal(app.key("experience", "Escape").defaultPrevented, false);
});

test("modified clicks remain native and invalid cross-panel targets are ignored", () => {
  const app = createNavigation();
  for (const modifier of [{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }]) {
    assert.equal(app.click("experience", modifier).defaultPrevented, false);
    assertSelected(app, "about");
  }
  app.click("contact", { target: "experience-email" });
  assertSelected(app, "contact");
  assert.equal(app.window.location.hash, "#contact");
  app.flushFrames();
  assert(!app.scrolls.some(scroll => scroll.id === "experience-email"));
});

test("rapid navigation cancels old evidence scrolling and mobile targets use reduced motion", () => {
  const app = createNavigation({ mobile: true, reducedMotion: true });
  app.click("experience", { target: "experience-email" });
  app.click("contact");
  app.flushFrames();
  assert.equal(app.document.activeElement.id, "contact");
  assert(!app.scrolls.some(scroll => scroll.id.startsWith("experience-")));
  app.click("experience", { target: "experience-calls" });
  app.flushFrames();
  assert.equal(app.document.activeElement.id, "experience-calls");
  assert.deepEqual(app.scrolls.at(-1), { id: "experience-calls-evidence", block: "start", behavior: "instant" });
});

test("desktop deep links scroll to their article and skip link focuses main", () => {
  const app = createNavigation({ hash: "#experience-platform" });
  assertSelected(app, "experience");
  app.flushFrames();
  assert.deepEqual(app.scrolls.at(-1), { id: "experience-platform", block: "start", behavior: "smooth" });
  assert(app.skip().defaultPrevented);
  assert.equal(app.document.activeElement.id, "main");
  assert.equal(app.scrolls.at(-1).top, 0);
});
