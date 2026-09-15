# T&H Enterprises — Beauty Spec

Visual system for a general-supply showcase that should feel expensive, industrial, and slightly impossible for a catalog site. Layout language from the Vesper.ai single-viewport landing. Colour and photography from `T&H Service1.pdf`. A light dose of neumorphism on inner surfaces — not a claymorphism theme.

---

## 1. Feeling

The site should read as **steel, glass, and warehouse light** — not SaaS purple, not generic Bootstrap catalog.

- Landing: one locked cinematic frame. Quiet type. Liquid-metal controls. Full-bleed product film (or a shader fallback). The client should freeze for a second.
- Inner pages: still dark, slightly lifted. Soft extruded cards. Product images do the talking.
- Motion: confident, short, physical. Nothing bounces like a toy. Nothing loops so hard it looks like a crypto landing.

Shock comes from **restraint + one hero effect**, not fifteen effects stacked.

---

## 2. Colour lock (PDF)

The live theme must match the PDF, not Vesper’s default black-and-chrome.

**Phase 0 action:** open `T&H Service1.pdf`, sample hex from:

| Sample | Page | Token |
|---|---|---|
| Cover ground | 1 | `--bg` |
| Cover title / gold or accent bar | 1 | `--accent` |
| Body text on dark | 1–2 | `--text` |
| Secondary labels (Importer / Exporter…) | 1 | `--muted` |
| Chapter-page ground (Safety, Pneumatic…) | 3–14 | `--panel` |
| Any yellow / red safety flash | safety pages | `--signal` |
| Paper / photo surround | product pages | `--paper` |

Until those samples are pasted into `theme.css`, use this **working industrial set** (swap hex, keep token names):

```css
:root {
  --bg: #07080a;           /* ink */
  --bg-elev: #101218;
  --panel: #16181d;
  --text: #f4f1ea;         /* warm white, not #fff glare */
  --muted: #9a9588;
  --stat: #d8d4c8;
  --accent: #c6a35a;       /* brass — replace with PDF gold/yellow */
  --accent-2: #8a9aad;     /* steel */
  --signal: #c45c2d;       /* ember / safety — replace with PDF */
  --border: rgba(244, 241, 234, 0.16);
  --border-soft: rgba(244, 241, 234, 0.10);
  --metal-hi: #ece9e1;
  --metal-mid: #8d8a82;
  --metal-lo: #1c1d21;
  --shadow: #050506;
  --hl: rgba(244, 241, 234, 0.08);
}
```

Do **not** keep Vesper `--bg: #000000` if the PDF is navy, charcoal, or cream. Tokens stay; values change.

Category accents (hover rings, ChromaGrid, card glows) — tinted relatives of `--accent` / `--signal`, not a rainbow:

| Category | Accent idea |
|---|---|
| Safety | `--signal` / safety yellow if PDF uses it |
| Pneumatic | steel blue-grey |
| Tools | warm ember |
| Construction | dust gold |
| Welding | spark orange |
| Steel | gunmetal |
| HVAC | cold steel |
| Electronics | pale cyan-steel |
| Electrical | amber |
| Pipes | oxide green-grey |
| Janitorial | muted teal |
| Lubricants | oil gold |
| Medical | clinical cool grey |

---

## 3. Type

Self-hosted WOFF2 next to the app if files exist; else this exact Google CSS:

`https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900&family=Instrument+Serif:ital@1&display=swap`

```css
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url("/fonts/inter.woff2") format("woff2");
}
@font-face {
  font-family: "Instrument Serif";
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/instrument-serif-italic.woff2") format("woff2");
}
```

Stacks:

- UI / logo / nav / buttons / badge / lede / stats / body: `"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- **Only** the italic hero word(s): `"Instrument Serif", "Times New Roman", Times, serif`

Body: `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility`.

Landing type tokens (default ~1440px) — copy Vesper scale:

| Token | Size |
|---|---|
| `--logo` | 15.5px |
| `--logo-mark` | 22px |
| `--nav` | 14px |
| `--nav-h` | 40px |
| `--btn` | 13.5px |
| `--btn-h` | 40px |
| `--hero-btn-h` | 42px |
| `--h1` | 48px |
| `--lede` | 15.5px |
| `--badge` | 12.5px |
| `--stat-size` | 13.5px |
| `--header-y / --header-x` | 22px / 40px |
| `--stats-x / --stats-y` | 72px / 36px |
| `--hero-gap` | 85px |
| `--copy-max` / `--lede-max` | 860px / 470px |

Inner pages: Inter 500 for section titles (32–40px), Inter 400 body 16/1.6, letter-spacing slightly negative on headings (`-0.03em` to `-0.045em`).

---

## 4. Materials

### 4.1 Liquid metal (nav pills)

Vesper spec, recolored with `--metal-*` if PDF brass replaces grey chrome.

Idle: dark metal gradient, hairline border `rgba(198,198,198,0.55)`, 7px radius, height `--nav-h`.  
Shine `::before` sweeps −120% → 120% on hover (0.6s).  
Hover: brighter border, metal lifts, soft cool glow.

### 4.2 Liquid glass (buttons)

Solid CTA: light metal slab (white → grey gradient), dark type, inset highlight. Hover: cooler bloom (keep, but tint bloom toward `--accent` instead of SaaS blue if PDF is brass).

Ghost CTA: frost gradient, `backdrop-filter: blur(16px)` on hero only. Hairline border.

Shared shine `::after` on `.btn`.

### 4.3 Soft neumorphism (inner pages only)

Landing stays flat metal/glass on film. Inner cards:

```css
.neumo {
  background: var(--panel);
  border-radius: 18px;
  border: 1px solid var(--border-soft);
  box-shadow:
    10px 10px 24px var(--shadow),
    -6px -6px 18px var(--hl),
    inset 0 1px 0 rgba(255,255,255,0.06);
}
.neumo:hover {
  box-shadow:
    12px 12px 28px var(--shadow),
    -8px -8px 20px var(--hl),
    inset 0 1px 0 rgba(255,255,255,0.08);
}
```

Rules:

- Radius 16–20px, never 50% pills except nav.
- Extrusion 8–12px, not 24px cartoon depth.
- No convex/concave toggle festival. One raised state, slightly stronger on hover.
- Pair with GlareHover — glare on the photo, neumo on the plate.

### 4.4 Grain

`.grain` at `z-index: 100`, pointer-events none, 4–6% opacity, React Bits `Noise` or CSS fractal. Never a dark colour overlay on the hero video.

---

## 5. Landing composition (exact Vesper skeleton)

Layer back → front:

1. `html/body` PDF ink  
2. `.hero-media` (R2 video **or** one React Bits background). Video: 100% opacity, **no scrim**. Shader fallback may use a light vignette so type stays readable.  
3. `.page` — `position: relative; z-index: 1; display: grid; grid-template-rows: auto 1fr auto; min-height: 100vh / 100dvh`  
4. `.grain` `z-index: 100`

Header: `display: grid; grid-template-columns: 1fr auto 1fr;` padding `var(--header-y) var(--header-x) 10px`.

**Logo** → `#top`. Typeset `T&H` + `<span class="logo-suffix">Enterprises</span>` at weight 400. Mark: custom monogram (T against H, or a small steel bar-and-circle), **not** Vesper’s rotated dual-pill. 22×22, `currentColor`.

**Nav pills:** Products, Capabilities, Brands, Contact.

**Header CTA:** Request a Quote.

**Burger:** Vesper spec (42×42, three bars, morph to X, full-screen frosted menu ≤900px).

Hero is **bottom-centered**, not vertically centered: `align-items: flex-end; padding: 8px 24px var(--hero-gap)`.

**Badge:** `Importer · Exporter · Local Supply · Services` + sparkle SVG from the brief (white, drop-shadow). Gradient fill uses PDF metal (`--metal-mid` → `--bg`), not random colour.

**H1** (two masked lines, Inter 500, Instrument Serif italic on the emphasis):

- Line 1: `Supply <em>everything</em> your site needs`
- Line 2: `from one roof in Karachi.`

`em` colour = `--muted` (Vesper used `#9a9a9a`), not white.

**Lede** (`--lede-max`):

> Stockist, dealer, and source of certified imported goods — safety, tools, pneumatics, steel, HVAC, electrical, and more — for national and multinational organisations.

**Actions**

1. Solid: Request a Quote → `/contact`  
2. Ghost: Browse catalog → `/products`

**Stats** (true lines, Vesper icon style allowed, labels replaced)

1. Dual-pill icon — `13+ supply lines under one roof`  
2. Download-tile icon — `Low MOQ · fast sourcing · quick delivery`  
3. Three-avatar icon — `National & multinational teams supplied`

Copy breakpoints, height locks, and phone menu behaviour exactly from the Vesper brief (1600 / 1920 / 2560 / 1280–1599 / 901–1279 / max-height 850 & 720 / ≤900 / ≤560).

---

## 6. Entrance motion (landing)

`.appear` resting opacity is **1**. Animations use `fill-mode: both` so they hide during delay, then play.

Same modifiers, delays, and keyframes as the Vesper brief (`in-scale`, `in-soft`, `in-mask`, `in-pop`, `in-btn`, `in-side`, `in-stat`, `in-star`, `in-em`). Map delays onto T&H header items (4 nav links, not Vesper’s four SaaS links).

JS fallback: two rAFs → if `getAnimations()` has nothing running/finished → add `.is-in`.

`prefers-reduced-motion: reduce`: kill transitions/animations; force identity on `.appear`, `.hero-media`, `h1 em`, `.badge-star`.

---

## 7. Inner pages

Shared chrome: slimmer header (not overflow-locked), same logo/nav/CTA, real footer (address, email, phone, WhatsApp, tiny “T&H Enterprise” legal line).

### `/products`

Headline: `Thirteen lines. One partner.`  
Sub: PDF benefit line.  
Grid: MagicBento **or** ChromaGrid of 13 neumo plates. Each plate: R2 cover, category name, 1-line scope. Hover: glare + 2° tilt max.

### `/products/:slug`

Large title, 2–3 sentence scope from the taxonomy, then a ScrollStack or CircularGallery of R2 stills. Empty gallery: one cover + “Ask us to source this line” CTA. No fake SKUs.

### `/brands`

LogoLoop of brand marks. If logos are not uploaded yet: typeset names on neumo tiles, no grey boxes with “Logo”.

### `/about`

Intro from PDF page 2 (cleaned spelling). Goals as two SpotlightCards. Benefits as four short neumo rows (low MOQ, variety, sourcing, delivery). No stock photography of random factories.

### `/contact`

Dark neumo panel: address, tel, mail, WhatsApp. Enquiry form in the same material. Map optional later (do not embed a fake pin).

---

## 8. React Bits choreography

Landing (video present): Noise + Magnet + ClickSpark + SplitText. No second WebGL background.

Landing (no video): **one** of Silk / DarkVeil / Particles, tinted to `--bg` / `--accent`. Still no overlay on top of it beyond grain.

Inner: GlareHover, TiltedCard, MagicBento/ChromaGrid, LogoLoop, ScrollReveal, CountUp (about page only if we keep `13+`).

Forbidden on this brand: Ballpit, Faulty Terminal, Letter Glitch, Hyperspeed, crypto-looking Liquid Chrome filling the whole viewport, Vesper wordmark, “Start for Free”.

---

## 9. Imagery rules

- Real T&H / catalog photos from R2. Until then, dark placeholders with category word, not Unsplash construction clichés.
- Hero video: full viewport cover, `object-fit: cover`, no text burned in.
- Still crops: slightly desaturated, cool shadows, brass highlights — match PDF print look.
- Never mix warm Instagram filters with the metal UI.

---

## 10. Copy voice

Short, concrete, Pakistani industrial English that still feels premium. Fix PDF typos in the UI (`gauges`, `temperature`, `protective clothes`, `privilege`, `continuous`, `electrical`). Do not mock the PDF; just ship clean English.

Do not claim certifications, years in business, or client names the PDF does not list.

---

## 11. Do / don’t

**Do**

- Lock the desktop landing to one viewport  
- Keep metal + glass + a little neumo  
- Let product film/photos carry emotion  
- Match PDF colour once sampled  

**Don’t**

- Add pricing tables, carts, or “Buy now”  
- Use the Vesper CloudFront MP4 or dumbbell mark  
- Rainbow gradients, Inter on the italic hero word, or extra landing sections  
- Heavy neumorphism on the hero  
- Autoplaying sound  
