import { readFileSync, writeFileSync } from "node:fs";

const media = readFileSync("src/media.ts", "utf8");
const labels = readFileSync("src/data/productLabels.ts", "utf8");
const block = media.match(/const categoryGalleries[\s\S]*?^};/m)[0];
const cats = [...block.matchAll(/(\w+):\s*\[([\s\S]*?)\]/g)];

const unnamed = [];
const bySlug = {};

for (const [, slug, body] of cats) {
  const paths = [...body.matchAll(/^\s*"([^"]+)"/gm)].map((m) => m[1]);
  const labelBlock = labels.match(new RegExp(`"${slug}":\\s*\\{([\\s\\S]*?)\\n  \\}`));
  const labeled = new Set(
    labelBlock ? [...labelBlock[1].matchAll(/"(\d+)":/g)].map((m) => Number(m[1])) : [],
  );
  bySlug[slug] = { gallery: paths.length, labeled: labeled.size, missing: [] };
  for (const key of paths) {
    const n = Number(key.match(/\/(\d+)\./)?.[1]);
    if (!labeled.has(n)) {
      unnamed.push({ slug, key, n, url: `https://pub-6b086f2686134300918c3ecd2486025c.r2.dev/${key}` });
      bySlug[slug].missing.push(n);
    }
  }
}

writeFileSync("scripts/unnamed-gallery.json", JSON.stringify(unnamed, null, 2));
console.log("unnamed total", unnamed.length);
for (const [slug, info] of Object.entries(bySlug)) {
  if (info.missing.length) console.log(slug, "missing", info.missing.join(","));
  else console.log(slug, "ok", info.gallery);
}
