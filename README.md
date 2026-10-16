# Detim Digital

The personal brand site of **Oluwadetimi Ajayi** — three experiences in one domain:

1. **Home** (`/`) — cinematic landing with a 3D avatar and two doors.
2. **Product Marketing** (`/product-marketing`) — "Ember" theme, its own nav, copy, CV and portfolio.
3. **Grant & Business Consultations** (`/grants-consulting`) — "Rust" theme, fully self-contained.

Each skill site is **exclusive to its skill**; the two never appear together except on Home.
`scripts/check-exclusivity.ts` enforces this automatically on every lint and build.

## Stack

Next.js (App Router) · TypeScript (strict) · Tailwind CSS 4 · Framer Motion · Lenis ·
lucide-react · react-calendly · zod + react-hook-form · @vercel/analytics + speed-insights.
Fonts: Bricolage Grotesque (headlines) · Instrument Serif (sub-headings) · Inter (body) · JetBrains Mono (labels).

## Getting started

```bash
bun install
cp .env.example .env.local   # adjust as needed
bun run dev                  # http://localhost:3000
```

## Scripts

| Command | What it does |
| --- | --- |
| `bun run dev` | Dev server on port 3000 |
| `bun run lint` | ESLint **+ exclusivity guard** |
| `bun run check:exclusivity` | Exclusivity guard only (Master Prompt §2) |
| `bun run build` | Runs the guard (`prebuild`), then `next build` |
| `node scripts/generate-icons.mjs` | Regenerates the Apple touch icon from `src/app/icon.svg` |

## Editing copy (no layout changes needed)

All copy lives in `src/content` — never hard-coded in components:

- `src/content/site.ts` — neutral contact data, availability, shared UI labels
- `src/content/home.ts` — Home headline, sub-heading, the two CTAs
- `src/content/product-marketing/*` — meta, hero, problems, services, experience, process, faq, testimonials
- `src/content/grants/*` — same set, plus `stats.ts` (verified numbers)

## Adding a testimonial (Phase 6+)

Open `src/content/<site>/testimonials.ts` and append:

```ts
{
  quote: "…their words…",
  name: "Client Name",
  role: "Role",
  company: "Company",
  verified: true, // only verified entries render in production
}
```

## Swapping brand assets

- Avatar: drop `public/avatar/detim-avatar.png` (optional `.glb` + `detim-backdrop.jpg`) — Home picks it up in Phase 3.
- Portrait: `public/images/oluwadetimi-ajayi-portrait.jpg`
- CVs: `public/resumes/Oluwadetimi-Ajayi-Product-Marketing-Manager-CV.pdf` and `public/resumes/Oluwadetimi-Ajayi-Grant-Writer-Resume.pdf` (exact filenames matter — referenced in `meta.ts`)

## Build phases (Master Prompt §11)

- [x] **Phase 1 — Foundation:** theme tokens (Home/Ember/Rust scopes), fonts, logo + favicon, folder structure, content scaffolds, `.env.example`, exclusivity guard wired into `prebuild` + `lint`
- [ ] Phase 2 — Shared engine: loader, smooth scroll, progress bar, cursor, route transition, marquee, magnetic buttons, count-up, clock/availability, Calendly modal, brief form + API
- [ ] Phase 3 — Home: cinematic background, 2.5D avatar (Tier-2 GLB behind env flag), transitions
- [ ] Phase 4 — Product Marketing site: all 12 sections
- [ ] Phase 5 — Grants & Consultations site: all 13 sections
- [ ] Phase 6 — Testimonials system + proof-of-work fallback + CV/Drive wiring
- [ ] Phase 7 — SEO and sharing: metadata, dynamic OG images, sitemap, robots, JSON-LD
- [ ] Phase 8 — Quality pass: a11y, performance, responsive, reduced-motion, exclusivity audit
- [ ] Phase 9 — Deploy prep: README final, Vercel readiness, domain checklist

## TODO (owner supplies later)

- 3D-style avatar (`detim-avatar.png`, optional `.glb`, `detim-backdrop.jpg`)
- Real testimonials (or LinkedIn recommendations to quote)
- The domain (set in `NEXT_PUBLIC_SITE_URL`, connect on Vercel)
