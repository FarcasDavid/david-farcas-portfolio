export function decodeEntities(value) {
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

export function textContent(markup) {
  return decodeEntities(markup.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

export function attributes(tag) {
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

export function parseTags(html) {
  return [...html.matchAll(/<[a-z][^>]*>/gi)].map(([tag]) => ({ tag, attrs: attributes(tag) }));
}

export function hasClass(attrs, name) {
  return (attrs.class || "").split(/\s+/).includes(name);
}

/** Inspect one balanced source element; checks do not depend on attribute order. */
export function elementMarkup(html, matches) {
  const element = parseTags(html).find(({ attrs }) => matches(attrs));
  if (!element) return undefined;
  const start = html.indexOf(element.tag);
  const name = element.tag.match(/^<([\w-]+)/)[1];
  const tokens = new RegExp(`<\/?${name}\\b[^>]*>`, "gi");
  tokens.lastIndex = start;
  let depth = 0;
  for (let token; (token = tokens.exec(html));) {
    depth += token[0].startsWith("</") ? -1 : 1;
    if (depth === 0) return html.slice(start, tokens.lastIndex);
  }
  throw new Error(`Unclosed <${name}> in HTML output`);
}
