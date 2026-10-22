const legacyRoutes = {
  home: { view: "about" },
  stack: { view: "about", target: "tech-stack" },
  toolkit: { view: "about", target: "tech-stack" },
};

/** Resolve a fragment using only the views and targets present on this page. */
export function resolvePortfolioRoute(hash, { views, targets }) {
  let id;
  try {
    id = decodeURIComponent(hash.replace(/^#/, ""));
  } catch {
    return undefined;
  }
  const alias = Object.hasOwn(legacyRoutes, id) ? legacyRoutes[id] : undefined;
  if (alias) {
    if (!views.has(alias.view)) return undefined;
    if (alias.target && targets.get(alias.target) !== alias.view) return undefined;
    return { ...alias };
  }
  if (views.has(id)) return { view: id };
  const view = targets.get(id);
  if (views.has(view)) return { view, target: id };
  return undefined;
}
