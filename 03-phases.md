# T&H Enterprise — Development Phases

Build order for the React showcase. Each phase has a **technical** outcome (`01-technical.md`) and a **beauty** outcome (`02-beauty.md`). Do not skip colour lock. Do not start inner pages before the landing frame feels finished.

Default: one phase per sitting, then a visual check (desktop 1440 and phone 390) before the next.

---

## Phase 0 — Foundations

**Why:** Everything else hangs on tokens, data, and media URLs.

Technical

- Scaffold Vite + React 19 + TypeScript + React Router + Tailwind v4
- Add `src/styles/theme.css` (reset, anti-flash background, tokens, font-faces)
- Add `src/data/company.ts` and `src/data/categories.ts` from the PDF
- Add `src/media.ts` with R2 base URL (placeholder domain until you send the public URL)
- SPA fallback for Cloudflare Pages (`_redirects` or equivalent)
- Self-host WOFF2 if files exist; else Google Fonts URL from the brief

Beauty

- Sample hex from `T&H Service1.pdf` and overwrite `--bg`, `--accent`, `--text`, `--muted`, `--signal`
- Typeset logo (or SVG if provided)
- Confirm warm-white vs pure-white text against the PDF

Done when: empty routes render on PDF ink with Inter loaded and no white flash.

---

## Phase 1 — Landing frame (Vesper skeleton, T&H voice)

**Why:** This is the “client is shocked” page. It must exist as a single locked viewport before any catalog.

Technical

- Grain, hero media (video from R2 or fallback), `.page` grid
- Header 3-column grid, liquid-metal nav, liquid-glass CTAs, burger + JS menu
- Hero copy, masked H1, badge, actions, stats footer
- Entrance keyframes + `animationend` / rAF `.is-in` fallback
- Desktop `overflow: hidden` ≥901px; phone scroll ≤900px
- Exact breakpoint table from the Vesper brief (1600 / 1920 / 2560 / 1280 / 901 / height 850 & 720 / 900 / 560)

Beauty

- Bottom-aligned hero, not vertically centered
- Hero video at 100% opacity, **no colour overlay** (grain only)
- Instrument Serif italic only on `everything`
- Stats labels are true PDF facts, not Vesper SaaS metrics
- Custom T&H mark — never the Vesper dumbbell
- Reduced-motion path looks complete, not broken

React Bits this phase: Noise, SplitText or BlurText, Magnet, ClickSpark. Shader background **only** if `hero.mp4` is missing.

Done when: 1440×900 looks like one poster; iPhone width menu opens/closes with Escape; no Vesper strings left in the DOM.

---

## Phase 2 — Shell for the rest of the site

**Why:** Inner pages need a scrolling chrome that still feels like the same company.

Technical

- `RootLayout` with shared header/footer; landing uses a `locked` variant
- Routes: `/products`, `/products/:slug`, `/brands`, `/about`, `/contact`, 404
- Footer: address, phone, email, WhatsApp from `company.ts`

Beauty

- Header loses the 100dvh lock off-home
- Footer is quiet metal, not a sitemap dump
- Same buttons and logo; slightly tighter padding

Done when: every nav item resolves; 404 is on-brand.

---

## Phase 3 — Catalog (the actual business)

**Why:** The PDF is a category book. The site must be too.

Technical

- `/products` maps `categories.ts`
- `/products/:slug` unknown slug → 404
- Images only via `media.ts` (R2). Missing image → placeholder plate, not a broken icon

Beauty

- MagicBento or ChromaGrid of 13 neumo plates + GlareHover
- Category pages: large title, short true copy, gallery if photos exist
- No fake prices, SKUs, or stock photos

Done when: all 13 lines from the PDF are visible and linked.

---

## Phase 4 — Brands, about, contact

Technical

- `/about`: intro, goals, four benefits (from PDF only)
- `/brands`: LogoLoop if logos uploaded; otherwise typeset names
- `/contact`: enquiry form (name, organisation, phone, email, category, message) + `tel`, `mailto`, `wa.me/923371294786`
- Formspree or mailto fallback

Beauty

- SpotlightCards for goals/benefits
- Contact panel is one neumo slab, not a generic Bootstrap form
- WhatsApp is visually equal to email (this market uses it)

Done when: a quote request can be sent without a cart.

---

## Phase 5 — Shock pass (controlled)

**Why:** Extra React Bits only after the bones are right.

Technical

- One gallery treatment on `/products/:slug` (ScrollStack **or** CircularGallery, not both)
- CountUp on `13+` if it does not fight CSS entrance
- Audit GPU: landing still ≥ 50fps on a mid laptop with grain + video

Beauty

- Still one hero-quality effect per view
- No Ballpit / glitch / hyperspeed
- Hover glare on plates; keep tilt ≤ 2°

Done when: motion adds weight, not noise.

---

## Phase 6 — Polish, a11y, ship

Technical

- Unique titles/meta per route
- `aria-*` on menu, buttons, landmarks
- Image dimensions / alt
- `prefers-reduced-motion` verified on landing + catalog
- Cloudflare Pages deploy + R2 CORS if video is cross-origin
- Lighthouse pass on inner pages; landing video may dip performance (acceptable if poster + `preload="metadata"`)

Beauty

- Pixel pass on 1440, 1920, 390, 430
- Check type against PDF (brass vs chrome, cream vs white)
- Grain opacity 4–6%, never muddy

Done when: you can send the URL to a client without a disclaimer.

---

## Dependency between files

```
01-technical.md                 02-beauty.md
       │                              │
       └──────────┬───────────────────┘
                  ▼
           03-phases.md  (this file)
                  │
                  ▼
         Phase 0 → 1 → 2 → 3 → 4 → 5 → 6
```

If technical and beauty conflict: **PDF facts win over Vesper copy; Vesper layout wins over generic catalog layout; PDF colour wins over Vesper black.**

---

## You supply, by phase

| Phase | From you |
|---|---|
| 0 | Public R2 base URL, optional logo SVG, confirm “Enterprise” vs “Enterprise” |
| 1 | `hero/hero.mp4` + `hero/poster.jpg` (or “use shader fallback”) |
| 3 | `categories/{slug}.jpg` and optional product stills |
| 4 | Brand logos, Formspree id (optional) |
| 6 | Production domain |

---

## Explicitly later (not these phases)

Prices, stock counts, multilingual (Urdu), CMS, blog, login, ecommerce.

---

## Immediate next step

**Phase 0.** After you confirm the R2 public URL (or “placeholders for now”) and brand spelling, scaffolding starts.
