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
