import { readFileSync, mkdirSync, writeFileSync, createWriteStream } from "node:fs";
import { get } from "node:https";
import path from "node:path";

const R2 = "https://pub-6b086f2686134300918c3ecd2486025c.r2.dev";
const media = readFileSync("src/media.ts", "utf8");
const block = media.match(/const categoryGalleries[\s\S]*?^};/m)[0];
const cats = [...block.matchAll(/(\w+):\s*\[([\s\S]*?)\],?/g)].filter((m) => m[1] !== "categoryGalleries");

const list = [];
for (const [, slug, body] of cats) {
  const paths = [...body.matchAll(/^\s*"([^"]+)"/gm)].map((m) => m[1]);
  for (const key of paths) {
    const n = Number(key.match(/\/(\d+)\./)?.[1]);
    list.push({ slug, key, n, url: `${R2}/${key}` });
  }
}

writeFileSync("scripts/gallery-manifest.json", JSON.stringify(list, null, 2));
console.log("total", list.length);
for (const slug of [...new Set(list.map((i) => i.slug))]) {
  console.log(slug, list.filter((i) => i.slug === slug).length);
}
