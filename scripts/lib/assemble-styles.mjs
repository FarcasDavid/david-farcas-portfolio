import { readFile } from "node:fs/promises";
import path from "node:path";

/** Bundle ordered local CSS imports so production serves one stylesheet. */
export async function assembleStyles(sourceRoot, entry = "styles.css") {
  const root = path.resolve(sourceRoot);
  async function bundle(file, ancestors = []) {
    const absolute = path.resolve(root, file);
    const relative = path.relative(root, absolute);
    if (relative.startsWith("..") || path.isAbsolute(relative)) {
      throw new Error(`CSS import escapes the source directory: ${file}`);
    }
    if (ancestors.includes(absolute)) throw new Error(`Circular CSS import: ${file}`);
    const source = await readFile(absolute, "utf8");
    const imports = [...source.matchAll(/@import\s+["']([^"']+)["']\s*;/g)];
    const rebase = (chunk) => chunk.replace(/url\((["']?)([^)'"\s]+)\1\)/g, (match, quote, url) => {
      if (/^(?:data:|https?:|\/|#)/.test(url)) return match;
      const target = path.resolve(path.dirname(absolute), url);
      return `url(${quote}${path.relative(root, target).split(path.sep).join("/")}${quote})`;
    });
    let output = "";
    let cursor = 0;
    for (const item of imports) {
      if (!item[1].startsWith(".")) throw new Error(`Only local CSS imports are supported: ${item[1]}`);
      output += rebase(source.slice(cursor, item.index));
      const imported = path.relative(root, path.resolve(path.dirname(absolute), item[1]));
      output += await bundle(imported, [...ancestors, absolute]);
      cursor = item.index + item[0].length;
    }
    return output + rebase(source.slice(cursor));
  }
  return bundle(entry);
}
