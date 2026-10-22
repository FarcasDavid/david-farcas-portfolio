import { resolvePortfolioRoute } from "./portfolio-routes.js";

const DEEP_LINK_SELECTOR = "[data-experience-case], #about-me, #tech-stack";

export function initViewNavigation({ document, window, onViewChange = () => {} }) {
  const navigation = document.querySelector("#navigation");
  const tabs = [...document.querySelectorAll('#navigation [role="tab"][data-view]')];
  const panels = [...document.querySelectorAll('.view[role="tabpanel"]')];
  const panelById = new Map(panels.map(panel => [panel.id, panel]));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let navIndicator;
  function updateNavIndicator() {
    const tab = tabs.find(
      (item) => item.getAttribute("aria-selected") === "true",
    );
    if (!tab || !navIndicator) return;
    navIndicator.style.width = `${tab.offsetWidth}px`;
    navIndicator.style.height = `${tab.offsetHeight}px`;
    navIndicator.style.transform = `translate(${tab.offsetLeft}px, ${tab.offsetTop}px)`;
  }
  if (navigation && tabs.length) {
    navIndicator = document.createElement("span");
    navIndicator.className = "nav-indicator";
    navIndicator.setAttribute("aria-hidden", "true");
    navigation.prepend(navIndicator);
    navigation.classList.add("has-indicator");
    if ("ResizeObserver" in window) {
      new window.ResizeObserver(updateNavIndicator).observe(navigation);
    }
    window.addEventListener("resize", updateNavIndicator);
    document.fonts?.ready.then(updateNavIndicator);
  }

  function routeFromHash() {
    const targets = new Map();
    for (const target of document.querySelectorAll(DEEP_LINK_SELECTOR)) {
      const view = target.closest('.view')?.id;
      if (panelById.has(view)) targets.set(target.id, view);
    }
    return resolvePortfolioRoute(window.location.hash, { views: new Set(panelById.keys()), targets });
  }

  let pendingViewScroll;

  function selectView(
    id,
    { history = "none", focusPanel = false, scroll = true, target } = {},
  ) {
    const selectedPanel = panelById.get(id);
    if (!selectedPanel) return;
    onViewChange(id);

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
      targetElement?.matches(DEEP_LINK_SELECTOR) &&
      targetElement.closest(".view") === selectedPanel
        ? targetElement
        : undefined;
    selectedPanel.classList.toggle("is-targeted", Boolean(validTarget));
    updateNavIndicator();
    const fragment = validTarget?.id || id;
    if (history !== "none" && window.location.hash !== `#${fragment}`) {
      const url = `${window.location.pathname}${window.location.search}#${fragment}`;
      window.history[history === "replace" ? "replaceState" : "pushState"](
        { view: id, target: validTarget?.id },
        "",
        url,
      );
    }

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
    else if (window.location.hash !== "#main" && panelById.has("about")) {
      selectView("about", { history: "replace" });
    }
  }

  window.addEventListener("popstate", restoreView);
  window.addEventListener("hashchange", restoreView);
  if (panels.length) {
    const initialRoute = routeFromHash();
    selectView(
      initialRoute?.view || (panelById.has("about") ? "about" : panels[0].id),
      {
        history: "replace",
        scroll: false,
        target: initialRoute?.target,
      },
    );
  }

}
