import type { CategorySlug } from "./data/categories";
import { categories } from "./data/categories";

/** Public base URL for Cloudflare R2 bucket `TNH-media`. Empty until you paste the URL. */
export const R2: string = "";

export const hasRemoteMedia = R2.length > 0;

/* Hero film is cross-origin. Keep preload="metadata" and a poster. When you switch to R2, set a CORS rule
   on the bucket (GET from your Pages domain) if the player needs to read the file as a canvas/CORS resource. */

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4";

export const hasHeroVideo = true;

const r2 = (path: string) => (R2 ? `${R2.replace(/\/$/, "")}/${path}` : "");

const FALLBACK_COVER = "/placeholders/category.svg";

const categoryCovers = Object.fromEntries(
  categories.map((c) => [c.slug, r2(`categories/${c.slug}.jpg`) || FALLBACK_COVER]),
) as Record<CategorySlug, string>;

export function categoryCover(slug: CategorySlug): string {
  return categoryCovers[slug];
}

/** Optional stills at `products/{slug}/1.jpg` … `4.jpg` once R2 is connected. */
export function categoryGallery(slug: CategorySlug): string[] {
  if (!hasRemoteMedia) return [];
  return [1, 2, 3, 4].map((n) => r2(`products/${slug}/${n}.jpg`));
}

export function brandLogo(slug: CategorySlug): string {
  return r2(`brands/${slug}.png`);
}

/** Drop the mark in `public/` as one of these names. */
export const logoCandidates = [
  "/logo.png",
  "/logo.jpg",
  "/logo.jpeg",
  "/logo.webp",
  "/logo.svg",
  "/Logo.png",
  "/Logo.jpg",
  "/tnh-logo.png",
  "/TNH-logo.png",
] as const;

export const media = {
  heroVideo: HERO_VIDEO,
  heroPoster: r2("hero/poster.jpg") || "/hero-poster.jpg",
  logo: logoCandidates[0],
  categories: categoryCovers,
  fallbackCover: FALLBACK_COVER,
} as const;
