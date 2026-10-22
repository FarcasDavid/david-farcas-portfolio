import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { assembleHtml } from "./lib/assemble-html.mjs";
import { assembleStyles } from "./lib/assemble-styles.mjs";

const [html, css] = await Promise.all([
  assembleHtml("src"),
  assembleStyles("src"),
]);
await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
for (const asset of ["assets", "scripts", "favicon.svg", "main.js"]) {
  await cp(`src/${asset}`, `dist/${asset}`, { recursive: true });
}
await writeFile("dist/index.html", html);
await writeFile("dist/styles.css", css);
await cp("public", "dist", { recursive: true });
console.log("Built static portfolio into dist/");
