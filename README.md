# Detim Digital

The personal brand site of **Oluwadetimi Ajayi** — three experiences in one domain:

1. **Home** (`/`) — cinematic landing with a 2.5D/3D avatar and two doors.
2. **Product Marketing** (`/product-marketing`) — "Ember" theme, its own nav, copy, CV, portfolio and book page.
3. **Grant & Business Consultations** (`/grants-consulting`) — "Rust" theme, fully self-contained.

Each skill site is **exclusive to its skill**; the two never appear together except on Home.
`scripts/check-exclusivity.ts` enforces this on every lint and build — against source **and** prerendered HTML.

## Stack

Next.js 16 (App Router) · TypeScript (strict) · Tailwind CSS 4 · Framer Motion · Lenis ·
lucide-react · react-calendly · zod + react-hook-form · @vercel/analytics + speed-insights ·
optional three/@react-three/fiber + drei (Tier-2 3D avatar, loaded only on Home with the env flag).
Fonts: Bricolage Grotesque (headlines) · Instrument Serif (sub-headings) · Inter (body) · JetBrains Mono (labels).

## Getting started

```bash
bun install
cp .env.example .env.local   # adjust as needed
bun run dev                  # http://localhost:3000
```

## Environment variables (`.env.local`)

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | production | Canonical URL for metadata, sitemap, OG images. Swap when the domain is connected. |
| `NEXT_PUBLIC_CALENDLY_URL` | no | Overrides the Calendly link (defaults to the one in `src/content/site.ts`). |
| `NEXT_PUBLIC_AVATAR_3D` | no | Set `true` to enable the Tier-2 real-3D avatar (requires `public/avatar/detim-avatar.glb`). |
| `CONTACT_TO_EMAIL` | recommended | Where briefs are emailed (defaults to the address in `site.ts`). |
| `RESEND_API_KEY` | no | When set, briefs send via Resend; without it the form falls back to a prefilled `mailto:` — it always works. |
| `BRIEF_FROM_EMAIL` | no | Resend "from" address (defaults to Resend's onboarding sender; set your domain once verified). |

## Scripts

| Command | What it does |
| --- | --- |
| `bun run dev` | Dev server on port 3000 |
| `bun run lint` | ESLint **+ exclusivity guard** |
| `bun run check:exclusivity` | Exclusivity guard only (source + prerendered HTML) |
| `bun run build` | Guard (`prebuild`) → `next build` → standalone output |
| `node scripts/generate-icons.mjs` | Regenerates the Apple touch icon from `src/app/icon.svg` |

## Editing copy (no layout changes needed)

All copy lives in `src/content` — never hard-coded in components:

- `src/content/site.ts` — neutral contact data, availability toggle (`available: false` hides the pills), shared UI labels
- `src/content/home.ts` — Home headline, sub-heading, the two CTAs
- `src/content/product-marketing/*` — meta, hero, problems, services, experience, process, faq, testimonials, proof (fallback tiles)
- `src/content/grants/*` — same set, plus `stats.ts` (verified numbers) and `proof.ts` (proof lines, credentials, funders note)

## Adding a testimonial (a 5-line edit)

Open `src/content/product-marketing/testimonials.ts` or `src/content/grants/testimonials.ts` and append:

```ts
{
  quote: "…their words…",
  name: "Client Name",
  role: "Role",
  company: "Company",
  verified: true, // only verified entries render in production
}
```

Until a verified entry exists: **dev** shows clearly-labelled `SAMPLE: replace me` cards;
**production** shows the proof-of-work strip (PMM: four experience highlights; Grants: the verified numbers)
and prints `TESTIMONIALS MISSING for <site>` at build time. Optional fields: `photo`, `sourceUrl`.

## Swapping brand assets

- **3D avatar:** drop `public/avatar/detim-avatar.png` (~1600×2000, transparent) — Home switches from the SVG bust automatically (server-side file check). Optional: `detim-avatar.glb` (+ `NEXT_PUBLIC_AVATAR_3D=true`) upgrades to the real-3D tier with automatic fallback; `detim-backdrop.jpg` is reserved for the backdrop layer.
- **Portrait:** `public/images/oluwadetimi-ajayi-portrait.jpg` (used on both skill-site heroes and the cinematic backdrop).
- **CVs:** `public/resumes/Oluwadetimi-Ajayi-Product-Marketing-Manager-CV.pdf` and `public/resumes/Oluwadetimi-Ajayi-Grant-Writer-Resume.pdf` (exact filenames matter — referenced in each `meta.ts`; the site shows the real file size).
- **Hero loop video (optional):** `public/video/hero-loop.mp4` slot is documented in the master prompt; not yet wired.

## Swapping the domain

1. Set `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` in Vercel project settings.
2. Redeploy — metadata, canonicals, sitemap, robots and OG images all derive from it.
3. Connect the domain in Vercel → Settings → Domains (see checklist below).

## Deploying on Vercel (free tier)

1. Push this repo to GitHub.
2. Vercel → **Add New Project** → import the repo (framework auto-detects Next.js).
3. Add the environment variables above (only `NEXT_PUBLIC_SITE_URL` is needed to ship).
4. Deploy — `prebuild` runs the exclusivity guard; the build fails if a skill ever mentions the other.
5. Run a Lighthouse audit on the deployed URL (mobile): targets are Performance ≥ 90, Accessibility ≥ 95,
   Best Practices ≥ 95, SEO ≥ 95. (Lighthouse can't run in this sandbox — do it once on the live URL.)
6. Calendly note: the free plan limits some embed branding controls; the site passes its own colours via
   page settings and hides event details/GDPR banner where Calendly allows — do the most it allows.

## Domain connection checklist

- [ ] Domain purchased / accessible in its registrar
- [ ] `NEXT_PUBLIC_SITE_URL` set to the final URL (https, no trailing slash)
- [ ] Vercel → Settings → Domains → add apex + `www`, follow the DNS instructions (A → `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com`)
- [ ] Wait for "Valid Configuration", verify https redirects
- [ ] Update Calendly event timezone/branding if desired
- [ ] Re-submit `/sitemap.xml` in Google Search Console
- [ ] Test share previews (OG images) via eg. opengraph.xyz

## Build phases (Master Prompt §11) — all complete

- [x] **Phase 1 — Foundation:** theme tokens (Home/Ember/Rust scopes), fonts, logo + favicon, folder structure, content scaffolds, `.env.example`, exclusivity guard wired into `prebuild` + `lint`
- [x] **Phase 2 — Shared engine:** loader, smooth scroll, progress bar, cursor, route transitions, marquee, magnetic buttons, count-up, clock/availability, branded Calendly modal, brief form + API (zod, honeypot, rate limit, Resend/mailto fallback)
- [x] **Phase 3 — Home:** cinematic layered background from her portrait, 2.5D avatar (+ Tier-2 GLB behind env flag), word-reveal headline, CTAs with cinematic wipes, footer strip
- [x] **Phase 4 — Product Marketing site:** all 12 sections, nav/footer, `/book`
- [x] **Phase 5 — Grants & Consultations site:** all 13 sections, nav/footer, `/book`
- [x] **Phase 6 — Testimonials system + proof-of-work fallback + CV/Drive wiring**
- [x] **Phase 7 — SEO:** per-site metadata, dynamic OG images in each site's colours, sitemap, robots, per-site JSON-LD (Person + ProfessionalService, own services only)
- [x] **Phase 8 — Quality pass:** skip link + keyboard flows, AA token pairings, responsive 360→1920, reduced-motion paths, exclusivity audit incl. prerendered HTML, production build
- [x] **Phase 9 — Deploy prep:** this README, Vercel readiness, domain checklist, asset list

## Owner supplies later

- 3D-style avatar (`detim-avatar.png`, optional `.glb`, `detim-backdrop.jpg`)
- Real testimonials (client messages, LinkedIn recommendations to quote)
- The domain (set in `NEXT_PUBLIC_SITE_URL`, connect on Vercel)
- Optional: `hero-loop.mp4`, deeper Drive case details
