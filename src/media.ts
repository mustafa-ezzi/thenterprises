import type { CategorySlug } from "./data/categories";
import { categories } from "./data/categories";

/** Public base URL for Cloudflare R2 bucket `TNH-media`. Empty until you paste the URL. */
export const R2: string = "https://pub-6b086f2686134300918c3ecd2486025c.r2.dev";

/** True once brand marks are uploaded. Category covers are mapped separately. */
export const hasRemoteMedia = false;

/* Hero film is cross-origin. Keep preload="metadata" and a poster. When you switch to R2, set a CORS rule
   on the bucket (GET from your Pages domain) if the player needs to read the file as a canvas/CORS resource. */

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4";

export const hasHeroVideo = true;

const r2 = (path: string) => (R2 ? `${R2.replace(/\/$/, "")}/${path}` : "");

const FALLBACK_COVER = "/placeholders/category.svg";

/** Object keys on R2. Construction is capitalized in the bucket. */
const categoryCoverFiles: Record<CategorySlug, string> = {
  safety: "safety.jfif",
  pneumatic: "pneumatic.jfif",
  tools: "tools.jfif",
  construction: "Construction.jfif",
  welding: "welding.jfif",
  steel: "steel.jfif",
  hvac: "hvac.jfif",
  electronics: "electronics.jfif",
  electrical: "electrical.jfif",
  pipes: "pipes.jfif",
  janitorial: "janitorial.jfif",
  lubricants: "lubricants.jfif",
  medical: "medical.jfif",
};

const categoryCovers = Object.fromEntries(
  categories.map((c) => [c.slug, r2(`categories/${categoryCoverFiles[c.slug]}`) || FALLBACK_COVER]),
) as Record<CategorySlug, string>;

export function categoryCover(slug: CategorySlug): string {
  return categoryCovers[slug];
}

/** Optional product stills. Paths are the object keys already on R2. */
const categoryGalleries: Partial<Record<CategorySlug, string[]>> = {
  safety: [
    "products/safety/1.jfif",
    "products/safety/2.jfif",
    "products/safety/3.jfif",
    "products/safety/4.jfif",
    "products/safety/5.jfif",
    "products/safety/6.jfif",
    "products/safety/7.jfif",
    "products/safety/8.jfif",
    "products/safety/9.jfif",
    "products/safety/10.jfif",
    "products/safety/11.jfif",
    "products/safety/12.jfif",
    "products/safety/13.jfif",
    "products/safety/14.jfif",
    "products/safety/15.jfif",
    "products/safety/16.jfif",
    "products/safety/17.jfif",
    "products/safety/17.jfif",
    "products/safety/18.jfif",
    "products/safety/19.jfif",
    "products/safety/20.jfif",
    "products/safety/17.jfif",
    "products/safety/22.jfif",
    "products/safety/23.jfif",
    "products/safety/24.jfif",
    "products/safety/25.jfif",
    "products/safety/26.jfif",
    "products/safety/27.jfif",
    "products/safety/28.jfif",
    "products/safety/29.jfif",
    "products/safety/30.jfif",
    "products/safety/30.jfif",
    "products/safety/30.jfif",
    "products/safety/31.jfif",
    "products/safety/32.jfif",
    "products/safety/33.jfif",
    "products/safety/34.jfif",
  ],
  pneumatic: [
    "products/pneumatic/1.png",
    "products/pneumatic/2.png",
    "products/pneumatic/3.png",
    "products/pneumatic/4.png",
    "products/pneumatic/5.png",
    "products/pneumatic/6.png",
    "products/pneumatic/7.png",
    "products/pneumatic/8.png",
    "products/pneumatic/9.png",
    "products/pneumatic/10.png",
    "products/pneumatic/11.jfif",
    "products/pneumatic/12.jfif",
    "products/pneumatic/13.jfif",
    "products/pneumatic/14.jfif",
    "products/pneumatic/15.jfif",
    "products/pneumatic/16.jfif",
    "products/pneumatic/17.jfif",
    "products/pneumatic/18.jfif",
    "products/pneumatic/19.jfif",
    "products/pneumatic/20.jfif",
    "products/pneumatic/21.jfif",
    "products/pneumatic/22.jfif",
    "products/pneumatic/23.jfif",
    "products/pneumatic/24.jfif",
    "products/pneumatic/25.jfif",
    "products/pneumatic/26.jfif",
    "products/pneumatic/27.jfif",
    "products/pneumatic/28.jfif",
    "products/pneumatic/29.jfif",
    "products/pneumatic/30.jfif",
    "products/pneumatic/31.jfif",
    "products/pneumatic/32.jfif",
    "products/pneumatic/33.jfif",
    "products/pneumatic/34.jfif",
    "products/pneumatic/35.jfif",
    "products/pneumatic/36.jfif",
    "products/pneumatic/37.jfif",
    "products/pneumatic/38.jfif",
    "products/pneumatic/39.jfif",
    "products/pneumatic/40.jfif",
    "products/pneumatic/41.jfif",
  ],
  tools: [
    "products/tools/1.jfif",
    "products/tools/2.jfif",
    "products/tools/3.jfif",
    "products/tools/4.jfif",
    "products/tools/5.jfif",
    "products/tools/6.jfif",
    "products/tools/7.jfif",
    "products/tools/8.jfif",
    "products/tools/9.jfif",
    "products/tools/10.jfif",
    // "products/tools/11.jfif",
    // "products/tools/12.jfif",
    // "products/tools/13.jfif",
    // "products/tools/14.jfif",
    // "products/tools/15.jfif",
    // "products/tools/16.jfif",
    // "products/tools/17.jfif",
    // "products/tools/18.jfif",
    // "products/tools/19.jfif",
    // "products/tools/20.jfif",
    // "products/tools/21.jfif",
    // "products/tools/22.jfif",
    // "products/tools/23.jfif",
    // "products/tools/24.jfif",
    // "products/tools/25.jfif",
    // "products/tools/26.jfif",
    // "products/tools/27.jfif",
    // "products/tools/28.jfif",
    // "products/tools/29.jfif",
    // "products/tools/30.jfif",
    // "products/tools/31.jfif",
    // "products/tools/32.jfif",
    // "products/tools/33.jfif",
    // "products/tools/34.jfif",
    // "products/tools/35.jfif",
    // "products/tools/36.jfif",
    // "products/tools/37.jfif",
    // "products/tools/38.jfif",
    // "products/tools/39.jfif",
    // "products/tools/40.jfif",
    // "products/tools/41.jfif",
  ],

  construction: [
    "products/construction/1.jfif",
    "products/construction/2.jfif",
    "products/construction/3.jfif",
    "products/construction/4.jfif",
    "products/construction/5.jfif",
    "products/construction/6.jfif",
    "products/construction/7.jfif",
    "products/construction/8.jfif",
    "products/construction/9.jfif",
    "products/construction/10.jfif",
    // "products/construction/11.jfif",
    // "products/construction/12.jfif",
    // "products/construction/13.jfif",
    // "products/construction/14.jfif",
    // "products/construction/15.jfif",
    // "products/construction/16.jfif",
    // "products/construction/17.jfif",
    // "products/construction/18.jfif",
    // "products/construction/19.jfif",
    // "products/construction/20.jfif",
    // "products/construction/21.jfif",
    // "products/construction/22.jfif",
    // "products/construction/23.jfif",
    // "products/construction/24.jfif",
    // "products/construction/25.jfif",
    // "products/construction/26.jfif",
    // "products/construction/27.jfif",
    // "products/construction/28.jfif",
    // "products/construction/29.jfif",
    // "products/construction/30.jfif",
    // "products/construction/31.jfif",
    // "products/construction/32.jfif",
    // "products/construction/33.jfif",
    // "products/construction/34.jfif",
    // "products/construction/35.jfif",
    // "products/construction/36.jfif",
    // "products/construction/37.jfif",
    // "products/construction/38.jfif",
    // "products/construction/39.jfif",
    // "products/construction/40.jfif",
    // "products/construction/41.jfif",
  ],

};

export function categoryGallery(slug: CategorySlug): string[] {
  return (categoryGalleries[slug] ?? []).map((key) => r2(key));
}

export function brandLogo(slug: CategorySlug): string {
  return r2(`brands/${slug}.png`);
}

/** Drop the mark in `public/` as one of these names. */
export const logoCandidates = [
  "/logo.png",
  "/logo.png",
  "/logo.jpeg",
  "/logo.webp",
  "/logo.svg",
  "/Logo.png",
  "/logo.png",
  "/tnh-logo.png",
  "/TNH-logo.png",
] as const;

export const media = {
  heroVideo: HERO_VIDEO,
  heroPoster: "/hero-poster.jpg",
  logo: logoCandidates[0],
  categories: categoryCovers,
  fallbackCover: FALLBACK_COVER,
} as const;
