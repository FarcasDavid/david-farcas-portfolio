import { readFile } from "node:fs/promises";
import path from "node:path";

/** Expand source-root-relative includes at build time; never fetch content in the browser. */
export async function assembleHtml(sourceRoot, entry = "index.html") {
  const root = path.resolve(sourceRoot);
  async function render(file, ancestors = []) {
    const absolute = path.resolve(root, file);
    const relative = path.relative(root, absolute);
    if (relative.startsWith("..") || path.isAbsolute(relative)) {
      throw new Error(`HTML include escapes the source directory: ${file}`);
    }
    if (ancestors.includes(absolute)) throw new Error(`Circular HTML include: ${file}`);
    const source = await readFile(absolute, "utf8");
    const includes = [...source.matchAll(/<!--\s*include:\s*([^\s]+)\s*-->/g)];
    let output = "";
    let cursor = 0;
    for (const include of includes) {
      output += source.slice(cursor, include.index);
      output += await render(include[1], [...ancestors, absolute]);
      cursor = include.index + include[0].length;
    }
    return output + source.slice(cursor);
  }
  return render(entry);
}
