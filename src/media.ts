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

/** Optional stills at `products/{slug}/1.jpg` … `4.jpg` once those objects exist on R2. */
export function categoryGallery(_slug: CategorySlug): string[] {
  return [];
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
