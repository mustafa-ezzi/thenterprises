# T&H Enterprise — Technical Spec

Static product/service showcase. No cart, no checkout, no user accounts, no payments.

Source of truth for company facts: `T&H Service1.pdf` (16 pages). Legal name in the PDF is **T&H Enterprise**. Public site brand (per brief): **T&H Enterprise**.

---

## 1. Goal

A fast, cinematic, mobile-ready React site that presents what T&H sells and how to enquire. The landing viewport follows the Vesper.ai single-frame layout language. Inner pages are a catalog, not a store.

Success looks like:

- A first-time visitor understands “general supply, import/export, Karachi” in under 5 seconds.
- Every PDF category is reachable in two clicks.
- Contact (call, WhatsApp, email, address) is always one tap away.
- No invented CloudFront URLs. No Vesper branding. No ecommerce.

---

## 2. Stack

| Layer | Choice | Why |
|---|---|---|
| App | **Vite + React 19 + TypeScript** | Static SPA, fast HMR, simple Cloudflare Pages deploy |
| Routing | **React Router 7** (createBrowserRouter) | Real URLs for categories (`/products/safety`) |
| CSS | **Tailwind CSS v4 + one custom `theme.css`** | Tailwind for layout/spacing/type. Custom CSS for liquid-metal pills, liquid-glass buttons, soft neumorphism, Vesper entrance keyframes |
| Motion | **React Bits** (TS + Tailwind variants) + CSS keyframes + GSAP only when a copied Bit requires it | Wow factor without a second animation system |
| Media | **Cloudflare R2 bucket `TNH-media`**, public URLs in a single `src/media.ts` map | You upload; code only stores links |
| Hosting | **Cloudflare Pages** | Same account as R2, free HTTPS, SPA fallback |
| Forms | Enquiry form posts to **Formspree** or a Cloudflare Worker later. V1 also uses `mailto:` and `wa.me` | No backend in v1 |
| Fonts | Inter (UI) + Instrument Serif italic (hero emphasis only) | Matches the landing-page spec. Self-host WOFF2 in `/public/fonts` if present; otherwise the exact Google Fonts URL from the brief |

Not used: Next.js, Redux, auth, CMS, Three.js on the landing frame, Lottie, the Vesper CloudFront MP4.

---

## 3. Why Tailwind + custom CSS (not Tailwind-only, not CSS-only)

Tailwind is the default for this project because:

- React Bits ships first-class **TS + Tailwind** variants.
- Category grids, spacing, and breakpoints stay consistent.
- Dark industrial UI is mostly tokens (`bg-th-ink`, `text-th-muted`).

Custom CSS is required for things Tailwind utilities cannot express cleanly:

- Liquid-metal nav pills and liquid-glass buttons from the Vesper spec
- Soft neumorphic shadows (dual light/dark extrusion)
- Film grain overlay
- Masked headline reveal keyframes
- `prefers-reduced-motion` kill-switch

Rule: if it is layout, type scale, or color token → Tailwind. If it is a material (metal, glass, neumo, grain) → `theme.css`.

---

## 4. Information architecture

```
/                         Landing (one locked desktop viewport)
/products                 All categories
/products/:slug           Category showcase (images + copy, no prices required)
/brands                   “Brands under one roof”
/about                    PDF introduction, goals, benefits
/contact                  Address, phone, email, WhatsApp, enquiry form
```

Header nav (landing labels mapped off Vesper):

| Label | Target |
|---|---|
| Products | `/products` |
| Capabilities | `/about#capabilities` |
| Brands | `/brands` |
| Contact | `/contact` |

Header CTA: **Request a Quote** → `/contact`.  
Hero ghost: **Browse catalog** → `/products`.

Hash targets `#top`, `#products`, `#capabilities`, `#brands`, `#contact` must exist so in-page landing links never 404.

404 route: short message + CTA back to `/` and `/products`.

---

## 5. Company data (from the PDF — do not invent extra claims)

**Positioning:** Importer · Exporter · Local supply · General services provider. Stockist, dealer, and source of quality/certified imported goods. Supplies national and multinational organisations.

**Goals**

- Supply products that offer value in price and quality
- Establish long-term relationships with customers

**Buyer benefits**

- Low minimum order quantity
- Variety under one roof
- Quick sourcing of items not in stock
- Quick delivery

**Contact**

- Address: Wo 2/39, Tailoring Shop, Wadhumal Udharam Road, Karachi, Pakistan
- Phone: `03371294786` → display `0337 1294786`, tel `+923371294786`, WhatsApp `https://wa.me/923371294786`
- Email: `t.henterprise1920@gmail.com`

Do not publish stats the PDF does not contain (no fake “4.2M workflows”, no fake “92% reduction”). Landing stats must be true:

1. **13+ supply lines** under one roof  
2. **National & multinational** organisations served  
3. **Import · export · local supply · services**

---

## 6. Product taxonomy

Slug = URL. Copy is corrected spelling; PDF typos stay out of the UI.

| Slug | Category | What to show |
|---|---|---|
| `safety` | Safety products | Fire protection, fall protection, PPEs, protective clothing, road & safety |
| `pneumatic` | Pneumatic materials & essentials | PU pipes, fittings, valves, gauges (pressure/temperature), HVAC essentials |
| `tools` | Power & hand tools | All kinds of power and hand tools |
| `construction` | Construction materials | Building/site materials |
| `welding` | Welding & cutting | Machines and equipment |
| `steel` | Iron & steel | Iron, steel supply |
| `hvac` | Air conditioning & refrigeration | Copper pipes, fittings, compressors, HVAC components |
| `electronics` | Electronic materials & essentials | Electronic goods and essentials |
| `electrical` | Electrical goods | Wires, fittings, breakers, switch boards, plugs |
| `pipes` | Pipes, fittings & valves | GI, MS, SS pipes, valves, fittings, joints |
| `janitorial` | Stationery, packing, chemicals, janitorial | Stationery, packing, chemicals, cleaning tools |
| `lubricants` | Lubricant oil & grease | Oils and greases |
| `medical` | Medical equipment | Medical equipment |

`/brands` is a 14th surface (PDF page “BRAND UNDER ONE ROOF”), not a product SKU page.

All category content lives in `src/data/categories.ts` (typed). Pages map over that file. No hardcoded category lists in components.

---

## 7. Media (Cloudflare R2 `TNH-media`)

Code never embeds binary photos. One module:

```ts
// src/media.ts
export const R2 = "https://YOUR_PUBLIC_R2_OR_CUSTOM_DOMAIN";

export const media = {
  heroVideo: `${R2}/hero/hero.mp4`,       // optional; if 404, CSS/React Bits fallback
  heroPoster: `${R2}/hero/poster.jpg`,
  logo: `${R2}/brand/logo.svg`,
  categories: {
    safety: `${R2}/categories/safety.jpg`,
    // ...one cover per slug
  },
} as const;
```

Until URLs exist, use local placeholders in `/public/placeholders/` so the layout can be built. Swap by editing `src/media.ts` only.

**Upload checklist (you do this in R2):**

```
hero/hero.mp4
hero/poster.jpg
brand/logo.svg
brand/favicon.svg
categories/{slug}.jpg          (13 covers, 16:9 or 4:3)
products/{slug}/{n}.jpg        (optional galleries)
brands/{brand-slug}.png        (optional logos)
```

Rules:

- Do **not** use `https://d8j0ntlcm91z4.cloudfront.net/...` (Vesper asset).
- Do **not** invent a CloudFront URL.
- Hero video, when present: full-bleed, **100% opacity, no colour overlay**. A 3–6% grain layer is allowed (Vesper `.grain`), not a dark scrim.
- Web-sized JPEGs/WebP, not print PDFs. Target ≤ 200 KB per still, hero MP4 ≤ 8 MB.

Favicon: custom T&H mark (not the Vesper dumbbell SVG). Data-URI favicon is generated from that mark.

---

## 8. Landing page (Vesper frame, T&H content)

Recreate the **structure, motion, materials, and breakpoints** from the Vesper brief. Replace every Vesper string, logo, and stat.

Document title: `T&H Enterprise — General Supply · Import · Export`  
`lang="en"`

**Anti-flash:** first CSS rule `html, body { background: var(--bg) !important; color: var(--text); }` plus body inline `style`. `--bg` is the PDF ink colour, not assumed `#000` until colour lock (see Beauty spec).

**Desktop ≥901px:** `html, body, .page` lock to `100dvh`, `overflow: hidden`. One frame, no scroll.  
**≤900px:** height auto, vertical scroll allowed.

Markup order inside the landing body:

```
.grain
.hero-media          (video if R2 URL works, else React Bits fallback)
.page
  .menu-backdrop
  header.header
  main.hero#top
  footer.stats
```

Header: 3-column grid (logo | nav | CTA). Burger + full-screen menu ≤900px. Same JS as the brief:

1. Each `.appear` → `animationend` → `.is-in`
2. Two `requestAnimationFrame`s later, if no running/finished Web Animations, force `.is-in`
3. Burger toggles `body.menu-open`
4. Nav click + Escape close menu
5. Resize to `min-width: 901px` closes menu

No extra landing sections, cards, forms, pricing, or footer beyond the three stats.

Inner pages **are** allowed full scroll, extra sections, and a real footer.

---

## 9. Folder structure

```
public/
  fonts/                  inter.woff2, instrument-serif-italic.woff2 (optional)
  placeholders/
src/
  main.tsx
  App.tsx
  media.ts
  data/categories.ts
  data/company.ts
  styles/theme.css        tokens, materials, keyframes
  components/landing/     Header, Hero, Stats, Grain, HeroMedia
  components/ui/          Button, Logo, NeumoCard
  components/bits/        copied React Bits (one folder per component)
  pages/                  Home, Products, Category, Brands, About, Contact, NotFound
  layouts/RootLayout.tsx
```

Copy React Bits into `src/components/bits/`. Do not add the whole library as an npm dependency.

---

## 10. React Bits — allowed on which routes

Landing (`/`): keep GPU light. Max **one** shader/background, and only if hero video is missing.

| Bit | Where | Role |
|---|---|---|
| SplitText or BlurText | Hero H1 | Entrance (in addition to CSS mask) |
| ShinyText | Badge | Metal sheen on “General Supply” |
| CountUp | Stats numbers | `13+` |
| Noise | `.grain` | Film grain |
| Magnet | Hero CTAs | Subtle pull |
| ClickSpark | Root layout | Click feedback |
| Silk / DarkVeil / Particles | Hero fallback only | If no R2 video |
| LogoLoop | `/brands` and maybe about | Brand marquee |
| MagicBento or ChromaGrid | `/products` | Category grid |
| TiltedCard + GlareHover | Category cards | Hover |
| ScrollStack or CircularGallery | `/products/:slug` | Image showcase |
| ScrollReveal / AnimatedContent | Inner pages | Scroll entrance |
| SpotlightCard | `/about` benefits | Three benefit tiles |
| StaggeredMenu | **Do not use** | Landing menu is the Vesper burger spec |

No DomeGallery + FlyingPosters + Ballpit on the same page. One hero-quality effect per view.

`prefers-reduced-motion: reduce` disables CSS animations **and** React Bits extras (render static text/images).

---

## 11. Enquiry form (not a cart)

Fields: name, organisation, phone, email, category (select from taxonomy), message.  
Submit: Formspree **or** `mailto:t.henterprise1920@gmail.com` fallback.  
Secondary: Call button, WhatsApp button.

No quantity, no SKU cart, no payment fields.

---

## 12. SEO, a11y, performance

- Unique `<title>` + meta description per route (`react-helmet-async` or a small Head component)
- Semantic landmarks: `header`, `nav`, `main`, `footer`
- Logo `aria-label="T&H Enterprise"`
- Burger `aria-controls`, `aria-expanded`, Open/Close menu labels
- Images: `width`/`height` or aspect-ratio, descriptive `alt`
- Lighthouse (desktop landing): Performance ≥ 90, ignore hero video bitrate
- SPA hosting: `index.html` fallback for all routes
- `html { scroll-behavior: smooth }` on inner pages only; landing desktop is overflow locked

---

## 13. Out of scope (v1)

Cart, checkout, inventory, prices (unless you later supply a list), blog, multilingual, CMS, user login, admin, live search against a database, the Vesper.ai copy/logo/CloudFront video.

---

## 14. Open inputs (needed from you)

1. Public base URL for R2 `TNH-media` (custom domain or `*.r2.dev`).
2. Logo file (SVG preferred). If missing, site uses a typeset **T&H** wordmark.
3. Hero `hero.mp4` + poster, or confirmation to ship the React Bits fallback.
4. Formspree form id (or “use mailto + WhatsApp only”).
5. Confirm public brand spelling: **T&H Enterprise** vs PDF **T&H Enterprise**.
