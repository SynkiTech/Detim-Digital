# MASTER BUILD PROMPT (v2): Detim Digital

You are a senior product designer + full-stack engineer. Build a complete, production-grade website for **Detim Digital**, the personal brand of **Oluwadetimi Ajayi**.

The site is **three experiences in one domain**:

1. **Home**: a cinematic landing page with a 3D avatar of Oluwadetimi and two big buttons.
2. **Product Marketing site**: a full, self-contained website (`/product-marketing`).
3. **Grant & Business Consultations site**: a full, self-contained website (`/grants-consulting`).

Think **"websites inside a website."** Each skill site has its own navigation, theme shade, copy, services, experience, testimonials, CV and portfolio link. **The two skills never appear together on the same page, except on Home** (see Section 2).

Work in the **phases in Section 11**. After each phase: run `npm run build` and `npm run lint`, fix all errors, summarise in 5 lines or fewer, then **stop and wait for me to say "next"**. Never skip ahead. Never invent facts (Section 12).

---

## 1. Brand brief

- **Brand:** Detim Digital. **Person:** Oluwadetimi Ajayi. Based in Nigeria, works remotely with clients worldwide. Status: **Available for projects**.
- **Personality:** Premium, bold, confident. Tone sits between formal and friendly.
- **Voice rule (applies to ALL copy):** write for the **visitor's problem, not for her résumé**. Use plain, customer-centric language. No jargon, no acronyms without a plain explanation, no buzzwords. Each section should make the visitor think, *"That's exactly my problem, and she has solved it before."* Lead with the visitor's situation and the outcome they want, then the service. Short sentences. Concrete nouns. No exclamation marks.
- **Primary CTAs on every page:** **Hire me** (opens her Calendly inside the site, branded) and **Send a brief** (email).
- **Inspiration:** https://www.jenniesdigital.com/ . Borrow its *extras and polish* (loader, live local time, availability status, marquee, smooth motion), not its layout or copy.

---

## 2. The exclusivity rule (most important rule in this document)

> **Each skill site is exclusive to its skill. No page, heading, sentence, meta tag, button, FAQ, testimonial, footer line, alt text or file name inside a skill site may mention, hint at or link to the other skill.**

- **Home is the only place both skills appear**, and only as the two CTA buttons plus the headline.
- Inside a skill site, the only way back is a neutral **"← Home"** link and the Detim Digital logo. No "switch to" links, no cross-promotion, no shared sections.
- Each skill site has its **own** metadata, OG image, sitemap entry, JSON-LD, CV, Drive link, testimonials and FAQ.
- **Build an automated guard:** `scripts/check-exclusivity.ts`, run on `prebuild` and in `npm run lint`. It scans (a) `content/product-marketing/**`, `content/grants/**`, (b) the route folders `app/product-marketing/**` and `app/grants-consulting/**`, and (c) the prerendered HTML text of those routes. The build **fails** if a forbidden term appears (case-insensitive, whole-word):
  - **Inside Product Marketing**, forbidden: `grant`, `grants`, `funding`, `funder`, `fundraising`, `proposal`, `nonprofit`, `non-profit`, `NGO`, `SBIR`, `STTR`, `NSF`, `NIH`, `USAID`, `SBA`, `business plan`, `trademark`, `consultation`, `consultations`.
  - **Inside Grants & Business Consultations**, forbidden: `product marketing`, `PMM`, `go-to-market`, `GTM`, `positioning`, `SaaS`, `Meta ads`, `ad set`, `ICP`, `persona`, `personas`, `landing page`.
  - Print the file, line and term for each violation.
- Company/role names must follow the **`displayName` / `displayTitle`** fields in the content files (Section 8) so a skill site can show a neutral version of a name or title that would otherwise contain the other skill's word.

---

## 3. Design system: orange, black, white

**Rules:** solid, bold colours. **Only orange, black and white**, in different shades. Not too many colours. **Every page must contain a clear touch of all three.** Guideline: ~70% black and white surfaces, ~15–20% orange accent. Alternate full-width **black** and **white** sections for rhythm; orange is used for buttons, key words in headlines, icons, numbers, underlines, hover states and thin rules.

The two skill sites use **different shades** so each feels like its own world, while sharing the same system.

| Token | Home | Product Marketing ("Ember") | Grants & Consultations ("Rust") |
|---|---|---|---|
| `--accent` | `#F25C05` | `#FF5A1F` (bright, vivid orange) | `#D9480F` (deep, burnt orange) |
| `--accent-deep` | `#C94A00` | `#E14A0F` | `#B23A0A` |
| `--accent-soft` | `#FFD9C2` | `#FFD9C7` | `#FADCC8` |
| `--black` | `#0A0A0A` | `#0A0A0A` (pure, sharp black) | `#14100D` (warm charcoal-black) |
| `--black-2` | `#151515` | `#171717` | `#211A15` |
| `--white` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |
| `--gray` (light section bg) | `#F5F4F2` | `#F4F4F2` | `#F6F3F0` |

- Scope the tokens with a class on each layout root: `.theme-home`, `.theme-pmm`, `.theme-grants`. Map them into Tailwind (`bg-accent`, `text-black`, etc.).
- **Contrast (WCAG AA is required):** on the bright PMM orange use **black text** for buttons and small text, not white. On the deeper Grants orange, white text is acceptable. Verify every pairing; if one fails, adjust the shade, never the rule.
- No gradients of other hues. Gradients allowed only between orange shades, or black → transparent, for cinematic depth.
- No dark/light theme toggle. The black/white section rhythm replaces it.

**Typography** (`next/font/google`):
- **Headlines:** **Bricolage Grotesque**, 700–800, tight tracking, very large (hero roughly 56–120px, fluid with `clamp()`).
- **Sub-headings and accent lines:** **Instrument Serif** (italic where it reads well). This is the "different font" for the sub-heading under the Home headline.
- **Body/UI:** **Inter**. **Small labels / loader / status:** **JetBrains Mono**.

**Shape & motion:** large radii on cards (20–28px), hairline borders, hard bold buttons (pill, solid fill, arrow icon), subtle film grain overlay. Motion is smooth, confident, cinematic: ease-out, 400–900ms, staggered. **Respect `prefers-reduced-motion`** everywhere.

**Logo:** inline SVG wordmark: bold **"D" monogram** in orange inside a black rounded square + "Detim" (Bricolage, heavy) + "Digital" (Inter, light). Variants for black and white backgrounds. Favicon `app/icon.svg` + Apple touch icon.

---

## 4. Tech stack & setup

- **Next.js (latest stable, App Router) + TypeScript + Tailwind CSS**.
- **Framer Motion**, **Lenis** (smooth scroll), **lucide-react**, **react-calendly**, **zod + react-hook-form**, **@vercel/analytics**, **@vercel/speed-insights**. For the optional real-3D avatar: **three**, **@react-three/fiber**, **@react-three/drei** (dynamically imported only on Home).
- ESLint + Prettier, strict TypeScript, no `any`.
- Route structure (each skill site has its **own layout** with its own nav, footer, theme class, Calendly modal and metadata):
  ```
  app/
    layout.tsx                     root: fonts, analytics, loader mount
    page.tsx                       HOME
    product-marketing/
      layout.tsx  page.tsx  book/page.tsx
    grants-consulting/
      layout.tsx  page.tsx  book/page.tsx
    api/brief/route.ts
    not-found.tsx  sitemap.ts  robots.ts
  components/
    shared/   Loader, Cursor, SmoothScroll, Marquee, Magnetic, CalendlyModal, BriefForm, Clock, AvailabilityBadge, Testimonials, ExperienceCard, ServiceCard, StatCounter, CTA band
    home/     CinematicBackground, Avatar3D (+ fallback), HeroCTAs
    pmm/ grants/   site-specific wrappers only
  content/
    site.ts                        contact, links, availability (neutral, non-skill data only)
    home.ts
    product-marketing/  *.ts
    grants/             *.ts
  scripts/check-exclusivity.ts
  public/ avatar/, images/, resumes/, og/
  ```
- **All copy lives in `/content`**, never hard-coded in components, so text can be edited without touching layout.
- Env vars (`.env.example`): `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CALENDLY_URL`, `CONTACT_TO_EMAIL`, `RESEND_API_KEY` (optional), `NEXT_PUBLIC_AVATAR_3D` (optional, `true` to enable the GLB model).
- Deploy target: **Vercel free tier**. Use nothing that needs a paid plan. No domain yet: use `NEXT_PUBLIC_SITE_URL` everywhere so it can be swapped later.

---

## 5. HOME (`/`): the cinematic landing page

A single, full-screen, unforgettable first impression. **No scrolling content**, only the experience below (plus a slim footer strip).

### 5.1 Content
- **Headline (H1, Bricolage Grotesque, huge, with "Tech Product Marketer" and "Grant Expert" highlighted in orange):**
  **"Hi, I'm Oluwadetimi Ajayi, a Tech Product Marketer and a Grant Expert."**
- **Sub-heading (Instrument Serif, italic, large):**
  *"How can I help your business today?"*
- **Two CTAs** (large, solid, bold, side by side on desktop, stacked on mobile; each with an arrow and a one-line helper beneath it):
  1. **Product Marketing** (solid orange, black text). Helper: "Take your product to market."
  2. **Grant & Business Consultations** (solid white, black text, orange arrow; on hover fills orange). Helper: "Win funding. Plan your growth."
- **Footer strip** (small, mono): `🟢 Available for projects` · live Lagos time (`Africa/Lagos`) · email · WhatsApp · LinkedIn icons.

### 5.2 The 3D avatar
- **Asset I will supply:** `/public/avatar/detim-avatar.png` (transparent PNG/WebP, ~1600×2000, a **3D-style render of her photo**, head-and-shoulders). Optional: `/public/avatar/detim-avatar.glb` and `/public/avatar/detim-backdrop.jpg`.
- **Until the assets exist**, render a stylised placeholder bust (SVG) so layout and animation can be built and reviewed. Make swapping the file the only step needed later. Use `next/image` with `priority`.
- **Tier 1 (build this first, always works): "2.5D" avatar.**
  - CSS 3D: `perspective` wrapper; the avatar **tilts toward the cursor** (max ~8°) with spring smoothing; on mobile use device orientation if permitted, else a slow automatic sway.
  - Idle "breathing" float (translateY ±8px, 6s loop), orange **rim light** (drop-shadow + blurred orange duplicate behind), soft elliptical **ground shadow**.
  - Layered parallax: avatar, a larger blurred duplicate behind, floating orange shapes in front.
- **Tier 2 (optional, behind `NEXT_PUBLIC_AVATAR_3D=true`): real 3D.** Load the GLB with `@react-three/fiber` + `drei` (`useGLTF`, `Environment`, soft key + orange rim lights). Head/body gently follows the cursor with limited rotation. Dynamically imported with `ssr: false`; on load failure or low-power devices **fall back to Tier 1**.
- Layout: desktop = headline left, avatar right and overlapping the background; mobile = avatar on top, text below. Headline never overlaps her face.
- Entrance: avatar rises and settles; headline **reveals word by word** with a mask; sub-heading fades in last; CTAs slide up.

### 5.3 The cinematic animated background (made from her avatar picture)
Layered, GPU-friendly, **no heavy video required**:
1. **Base:** near-black.
2. **Backdrop layer:** an **enlarged, blurred, duotone (black + orange) copy of the avatar** (use `detim-backdrop.jpg` if provided, else derive from the avatar with CSS filters), slow **Ken Burns** drift (scale 1.05→1.2 and slight pan over ~30s, looped).
3. **Light:** animated orange **volumetric glow** behind the head, slow pulse, plus an **anamorphic lens-flare streak** that sweeps across every ~12 seconds.
4. **Atmosphere:** lightweight `<canvas>` of ~50 drifting **embers/particles** (orange, varying size/opacity, parallax with cursor). Fewer on mobile; pause when the tab is hidden.
5. **Film look:** fine **grain** overlay, **vignette**, and **cinematic letterbox bars** that open on first load.
6. **Camera feel:** whole scene has a subtle slow dolly-in and cursor-driven parallax between layers.
- Text always stays legible: add a left-side black gradient scrim behind the headline. Verify AA contrast.
- **Performance guards:** `prefers-reduced-motion` = static backdrop + no particles; `document.hidden` pauses animation; cap devicePixelRatio; target 60fps on mid-range phones; LCP < 2.5s (avatar and fonts preloaded).
- If I later supply a short looping `/public/video/hero-loop.mp4`, support it as an optional replacement for layers 2–4 (muted, autoplay, loop, playsInline, poster = backdrop).

### 5.4 Entering a skill site
Clicking a CTA triggers a **cinematic transition**: the avatar scales toward the camera while an orange panel (matching that site's shade) wipes across, then the skill site fades in. ~900ms, skippable, instant under reduced motion. Prefetch both routes.

---

## 6. PRODUCT MARKETING SITE (`/product-marketing`)

Theme: **Ember** (bright orange, pure black, white). **Nothing here mentions the other skill (Section 2).**

**Navigation (sticky):** logo · small label chip "Product Marketing" · Services · Experience · Results · Portfolio · **Hire me** (button) · "← Home". Mobile: full-screen menu. A **"Download CV"** link also sits in the nav's secondary slot.

**Page order (single long-scroll landing page, black/white alternating):**

1. **Hero (black).** H1 (Bricolage, orange highlights):
   **"I help tech, SaaS and AI businesses like yours take their products from idea to a widely adopted market product, and keep setting the pace in the market."**
   Sub-heading (Instrument Serif): *"Clear positioning, a launch plan that works, and messages your customers actually respond to."*
   CTAs: **Hire me** · **See my work** · small link "Download my CV". Chips: Tech · SaaS · AI. Her portrait/avatar (smaller) with an orange rim light. Availability badge.
2. **Marquee strip (orange background, black text):** Positioning · Launch plans · Customer research · Competitor analysis · Pricing · Messaging · Ads · Website audits.
3. **"Sound familiar?" (white).** Five problem cards, in the visitor's voice:
   - "People visit your product and can't tell what it does in five seconds."
   - "You're building fast, but nobody outside your team is talking about it."
   - "Your launch plan is a list of ideas, not a plan."
   - "Competitors say the same things you do, and win the deal."
   - "You're paying for ads and you're not sure who is really responding."
   Closing line: **"These are fixable. Here's how I fix them."**
4. **Services (black).** Cards, each with: plain title, **"The problem it solves"** (one line), **"What you get"** (one line). Full list:
   1. **Positioning & messaging.** *Problem:* customers can't tell why you're different. *You get:* one clear promise and the words to say it everywhere.
   2. **Go-to-market (launch) planning.** *Problem:* a launch with no clear plan. *You get:* who to target, what to promise, where to reach them, what to charge and the milestones that prove it's working.
   3. **Ideal customer & persona profiles.** *Problem:* trying to sell to everyone. *You get:* a sharp picture of the people most likely to buy first.
   4. **Competitor analysis.** *Problem:* you look like everyone else. *You get:* a side-by-side of features, experience and marketing that shows where you can stand out.
   5. **Customer research & interviews.** *Problem:* guessing what customers want. *You get:* real conversations turned into clear decisions.
   6. **Landing page & website copy, plus website review.** *Problem:* visitors leave without acting. *You get:* clearer pages and copy that guides people to the next step.
   7. **Ad campaign setup (Meta).** *Problem:* ad spend with no direction. *You get:* campaigns and ad sets built around the right audience and message.
   8. **Pricing input.** *Problem:* unsure what to charge. *You get:* grounded pricing inputs based on your market and customers.
   9. **Market research, sizing & channel strategy.** *Problem:* not sure how big the opportunity is or where to focus. *You get:* a clear view of your market and the channels worth your effort.
5. **Experience / "Work I've done for businesses like yours" (white).** Expandable cards (accordion or drawer, no separate pages). Each card: **job title · company · dates**, a one-line plain-language summary, then **"What I did for them"** bullets. Use only these (from her CV):
   - **Product Marketing Manager & Strategist, Pryce (Synkitech), 2026.** *Summary:* helped an early-stage software and automation product explain itself clearly and prepare to launch. *Did:* wrote the positioning and landing page copy; built the launch plan; set up Meta ad campaigns; ran customer interviews; contributed pricing inputs.
   - **Go-to-Market & Business Strategy Developer, Zenith, 2023 to present.** *(Use `displayName: "Zenith"` and `displayTitle: "Go-to-Market Strategy Developer"`.)* *Summary:* helped startups in tech, health, education and sustainability decide who to sell to, what to promise and how to launch. *Did:* sized markets; segmented customers; audited competitors' features; built go-to-market strategies covering value propositions, channels, pricing and measurable launch milestones.
   - **Go-to-Market & Positioning (portfolio project), JapaLearn, 2025.** *Did:* talked to real users; built ideal customer profiles and personas; reviewed the web app's messaging; mapped first target segments; built Meta ad sets aligned to the positioning.
   - **Competitor Analysis (portfolio project), OPay vs. Moniepoint, 2025.** *Did:* compared the user experience, features and marketing of two leading fintech apps to show where each can stand out.
   Label portfolio projects honestly as "Portfolio project".
6. **CTA band #1 (orange, black text), placed right after Experience:** *"Want results like these for your product?"* **Hire me** · **Send a brief**.
7. **Testimonials (black).** See Section 9.
8. **How I work (white):** **Understand → Position → Plan → Launch & learn**, each with a 1–2 line plain-language description.
9. **CTA band #2 (black with orange headline):** *"Let's get your product the attention it deserves."* **Hire me** · **Send a brief**.
10. **Portfolio & CV (white).** Two large cards: **"See my product marketing portfolio"** (opens the PMM Drive folder in a new tab) and **"Download my CV"** (PMM CV PDF, file size shown).
11. **FAQ (black).** 5–6 customer-voice questions: *How do we start? How long does a project take? Do you work with early-stage teams? Can you work with my team remotely? What should I send in a brief? How is pricing decided?* Answers honest and general; pricing = custom, shared after a short call.
12. **Footer (black):** logo, availability badge, live Lagos time, email, WhatsApp, LinkedIn, "← Home", © line. **Nothing about other services.**

---

## 7. GRANT & BUSINESS CONSULTATIONS SITE (`/grants-consulting`)

Theme: **Rust** (deep burnt orange, warm charcoal-black, white). **Nothing here mentions the other skill (Section 2).** Same structure and quality as Section 6, with its own look and copy.

**Navigation (sticky):** logo · label chip "Grant & Business Consultations" · Services · Experience · Results · Portfolio · **Hire me** · "← Home" · "Download CV".

**Page order:**

1. **Hero (warm black).** H1:
   **"I help businesses, startups and organisations like yours win the funding they need and build the plan to grow, from first idea to funded project."**
   Sub-heading (Instrument Serif): *"Applications funders say yes to, budgets that add up, and business plans you can actually run."*
   CTAs: **Hire me** · **See my work** · small link "Download my CV". Chips: Startups · Small businesses · Nonprofits. Portrait/avatar with rim light. Availability badge.
2. **Marquee (orange):** Grant research · Applications · Budgets · Reviews · Reporting · Market research · Business plans · Trademark search.
3. **"Sound familiar?" (white).** Problem cards:
   - "You found a grant but you're not sure you qualify."
   - "Your last application was rejected, with little explanation."
   - "The budget requirements are confusing and the deadline is close."
   - "You have a strong idea but no plan a funder or investor would take seriously."
   - "You don't have the time to write it all yourself."
   Closing line: **"You don't have to do this alone. Here's how I help."**
4. **Services (warm black).** Each card: plain title, **"The problem it solves"**, **"What you get"**. Full list (the services the owner specified):
   1. **Grant research.** *Problem:* not knowing which funding fits you. *You get:* a shortlist of funders whose priorities match your work, with deadlines and fit notes.
   2. **Proposal development.** *Problem:* a blank page and a tight deadline. *You get:* a complete, persuasive application written around what the funder is looking for.
   3. **Budget making.** *Problem:* numbers that don't add up or don't match the plan. *You get:* a clear, defensible budget with the justification funders expect.
   4. **Grant review.** *Problem:* not knowing if your draft is strong enough. *You get:* your draft scored against the funder's own criteria, with specific fixes before you submit.
   5. **Monitoring & reporting.** *Problem:* winning the grant, then struggling to track results and report. *You get:* simple tracking of your outcomes and clear reports that keep funders confident.
   6. **Market research.** *Problem:* guessing how big the need or opportunity is. *You get:* evidence about your market and customers to back up your plans and applications.
   7. **Business plan.** *Problem:* an idea without a roadmap. *You get:* a complete, realistic plan covering your market, customers, strengths and weaknesses, and goals you can measure.
   8. **Trademark search.** *Problem:* investing in a name or logo that someone already owns. *You get:* a check on whether your name or logo is available before you build on it. *(Owner to confirm scope and any disclaimer; keep wording neutral and do not imply legal advice.)*
5. **Results (white). Verified numbers only, count-up on view:** `100+` applications written or reviewed · `80%` award rate · `100%` client satisfaction · `$5K to $1M+` in funding requests handled · `60+` applications supported through partner firms. Plus two proof lines: "Contributed critical revisions to a seven-figure federal award." and "Helped youth organisations and women-owned businesses secure funding." Small credibility strip: **Member, Grant Professionals Association** · **Grant Writing & Nonprofit Management certificate (YALI, 2024)** · **Program Evaluation certificate (2023)**. Funders covered (small, secondary): US federal programmes (SBIR/STTR, NSF, NIH, USAID, SBA), foundations and corporate funders; sectors: health, technology, education, environment.
6. **Experience / "Work I've done for businesses like yours" (warm black).** Expandable cards. Use only these (from her résumé):
   - **Director of Grant Writing, Zenith Grant Consults, 2023 to present.** *Summary:* leads research, interviews and writing for a consulting firm's funding applications. *Did:* researched funder priorities; interviewed clients to find their strongest story; wrote, edited and reviewed 100+ applications for requests from $5K to $1M+; built narratives, budgets, justifications and results frameworks; ran mock reviews scored against agency criteria; mentors junior writers.
   - **Contract Grant Writer & Reviewer (confidential partner firms), 2024 to present.** *Summary:* works behind the scenes for consultants, firms and government contractors. *Did:* delivered applications to federal, foundation and corporate programmes under partner brands; reviewed drafts and gave practical fixes; contributed to 60+ applications with an 80% success rate. **Never name partners.**
   - **Founder & Lead Grant Writer, Alpha Grants, 2025 to present.** *Summary:* independent funding support for nonprofits, tech ventures and eco-sustainability initiatives. *Did:* wrote clear narratives and results frameworks that match what funders want to fund.
   - **Business Strategy Developer, Zenith Grant Consults, 2023 to present.** *(Use `displayTitle: "Business Strategy Developer"`; do not show "go-to-market".)* *Summary:* helped startups in tech, health, education and sustainability turn ideas into complete business plans. *Did:* built full business plans; sized markets; grouped customers into clear segments; ran founder strengths-and-weaknesses sessions.
7. **CTA band #1 (orange, white text), right after Experience:** *"Have a grant to win or a plan to build?"* **Hire me** · **Send a brief**.
8. **Testimonials (white).** Section 9.
9. **How I work (warm black):** **Discover → Match → Write → Review → Submit & follow through**, each in 1–2 plain lines.
10. **CTA band #2 (white with orange headline).** *"Let's get your funding application, or your plan, ready."* **Hire me** · **Send a brief**.
11. **Portfolio & CV (white):** **"See my grants & consultations portfolio"** (opens the Grants Drive folder in a new tab) and **"Download my CV"** (Grant Writer resume PDF, file size shown).
12. **FAQ (warm black).** 5–6 questions: *Can you guarantee we'll win? (No one can honestly guarantee funding. Say so, then explain the 80% award rate, the review step and how drafts are checked against the funder's criteria.) How do I know which grants fit me? How early should I start? Can you review a draft I already wrote? What do you need from me? How is pricing decided? Do you help after we win?*
13. **Footer (warm black):** same neutral structure as Section 6.

---

## 8. Content data model (`/content`)

`content/site.ts` holds **neutral data only** (no skill-specific wording):
```ts
export const site = {
  name: "Detim Digital",
  person: "Oluwadetimi Ajayi",
  email: "oluwadetimiajayi@gmail.com",
  phone: "+234 813 075 5869",
  whatsapp: "https://wa.me/2348130755869",
  linkedin: "https://linkedin.com/in/detimi",
  calendly: "https://calendly.com/oluwadetimiajayi/30min",
  location: "Nigeria (working remotely worldwide)",
  timezone: "Africa/Lagos",
  available: true,
};
```
`content/product-marketing/` and `content/grants/` each contain: `meta.ts` (title, description, OG text, drive URL, CV path), `hero.ts`, `problems.ts`, `services.ts`, `experience.ts`, `process.ts`, `faq.ts`, `testimonials.ts`, `stats.ts` (grants only).

Per-site **drive and CV links**:
- Product Marketing → Drive: `https://drive.google.com/drive/folders/14sqCI0VsvEp9mQFbfvrb5XEMRz7TzHcR` · CV: `/resumes/Oluwadetimi-Ajayi-Product-Marketing-Manager-CV.pdf`
- Grants & Consultations → Drive: `https://drive.google.com/drive/folders/1jNYW7GIADVzvqzpsHnTnxdXtv8rjHae_` · CV: `/resumes/Oluwadetimi-Ajayi-Grant-Writer-Resume.pdf`

Experience item shape: `{ id, displayTitle, displayName, dates, summary, did: string[], tag?: "Portfolio project" }`. Components render only `display*` fields.

Meta (each site's own):
- PM title: **"Product Marketing for Tech, SaaS & AI Businesses | Oluwadetimi Ajayi"**
- Grants title: **"Grant Writing, Business Plans & Funding Support | Oluwadetimi Ajayi"**
- Home title: **"Detim Digital | Oluwadetimi Ajayi"**
- Descriptions written in the same customer-centric voice, exclusive to each skill.

---

## 9. Testimonials (do this carefully)

- Build a polished testimonials section on **each** skill site (black/white, orange quote marks, name, role, company, optional photo, optional link to the source such as a LinkedIn recommendation).
- Data lives in `content/<site>/testimonials.ts`: `{ quote, name, role, company, photo?, sourceUrl?, verified: boolean }`.
- **Never invent testimonials, names or quotes.** In production, render only entries with `verified: true`. If none exist yet, **replace the section with a "Proof of work" strip** (Product Marketing: the four experience highlights as short result tiles; Grants: the verified numbers) and print a build warning: `TESTIMONIALS MISSING for <site>`.
- In development only, show clearly labelled `SAMPLE: replace me` cards so the layout can be reviewed.
- The owner will collect real quotes (client messages, LinkedIn recommendations, emails). Make adding one a 5-line edit.

---

## 10. Shared features (both skill sites + Home)

**Calendly ("Hire me"):**
- Every **Hire me** opens a **full-screen branded modal** with the Calendly inline widget for `NEXT_PUBLIC_CALENDLY_URL`, also embedded on each site's `/book` page. Style it to the active site: pass page settings (`backgroundColor`, `textColor`, `primaryColor` = that site's orange; hide event-type details and cookie banner where allowed), a branded frame with logo and heading ("Book a 30-minute call with Oluwadetimi"), skeleton loader, and a fallback link "Open Calendly in a new tab". Append `utm_source=<site>` so I can see which site each booking came from.
- Esc to close, focus trap, scroll lock; mobile = full-screen sheet. Note in the README that Calendly's free plan limits some branding controls: do the most it allows.

**Send a brief:**
- A form (name, email, organisation, what you need, timeline, optional budget range, message). Copy and options are **specific to that site only**. Posts to `app/api/brief/route.ts`: if `RESEND_API_KEY` is set, send via Resend to `CONTACT_TO_EMAIL`; otherwise **fall back to a prefilled `mailto:`** so it always works. Email subject prefix `[Product Marketing]` or `[Grants & Consultations]` taken from a hidden `site` field. Honeypot + basic rate limit + zod validation. Success: "Brief received. I'll reply within 1 to 2 working days."

**Extras (from the Jennies Digital inspiration, adapted):**
1. **Loader:** full-screen black, orange "D" monogram, mono text `DETIM DIGITAL 0%` counting up, then a clean wipe reveal. Once per session, skippable.
2. **Live Lagos clock + office-hours pill** (`Mon–Fri 9:00–18:00 WAT`: "🟢 Replying today" / "⚪ I'll reply next working day").
3. **Availability badge** (`🟢 Available for projects`), controlled in `site.ts`.
4. **Custom cursor** (fine pointers only), **smooth scroll** (Lenis), **scroll progress bar** (orange), **scroll reveals**, **magnetic buttons**, **marquee strips**, **count-up numbers**, **floating Hire me button** on mobile after the hero.
5. **Branded 404 and error pages**, skeleton loaders.

---

## 11. Build phases (stop after each and wait for "next")

1. **Foundation:** project setup, fonts, the three theme scopes with the exact tokens, logo/favicon, folder structure, empty content files, `.env.example`, README stub, and **`scripts/check-exclusivity.ts` wired into `prebuild` and lint** (it should pass on the empty skeleton).
2. **Shared engine:** loader, smooth scroll, progress bar, cursor, route transition component, marquee, magnetic button, count-up, clock/availability, shared Calendly modal, brief form + API route (parameterised by site).
3. **Home:** cinematic background, Tier-1 avatar (placeholder bust until my asset arrives), headline and sub-heading, the two CTAs, footer strip, transitions into each site. Add the Tier-2 GLB path behind the env flag.
4. **Product Marketing site:** all 12 sections in Section 6, nav/footer, `/book`.
5. **Grants & Consultations site:** all 13 sections in Section 7, nav/footer, `/book`.
6. **Testimonials system + Proof-of-work fallback + CV/Drive wiring** on both sites.
7. **SEO and sharing:** per-site metadata, dynamic OG images in each site's colours, `sitemap.ts`, `robots.ts`, per-site JSON-LD (`Person` + `ProfessionalService`, each with only its own service).
8. **Quality pass:** accessibility (AA contrast, focus rings, keyboard flows, skip link), performance (Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95), responsive checks at 360 / 768 / 1280 / 1920, reduced-motion check, **exclusivity audit** (`npm run check:exclusivity` must pass; also manually read both sites top to bottom for cross-mentions).
9. **Deploy prep:** final README (setup, env vars, how to edit copy, add a testimonial, swap avatar/GLB, swap domain, deploy on Vercel), Vercel readiness, domain-connection checklist, and a list of anything I still need to supply.

---

## 12. Content rules

- **Use only the facts in this document.** Do not invent clients, testimonials, awards, numbers, logos, partner names, press or case-study results. If something is missing, hide the block or leave a `TODO` in the content file (never in the rendered page).
- **Never name confidential partner firms.**
- Keep figures consistent everywhere they appear (Grants site only): **100+ applications, 80% award rate, 100% client satisfaction, $5K to $1M+, 60+ partner applications, one seven-figure federal award contribution.**
- Plain, confident, customer-centric language. Minimal emoji (only in status pills). Pick one spelling convention (British: "organisation", "programme") and keep it consistent.
- Every claim must be something she has actually done (Sections 6 and 7 list them).

---

## 13. What I will supply later

- Her **3D-style avatar** (`detim-avatar.png`, optional `.glb` and `detim-backdrop.jpg`) and a clean professional portrait.
- The two CV PDFs in `public/resumes/` with the exact filenames above.
- Real **testimonials** (or LinkedIn recommendations to quote).
- Specific Drive case details if I want deeper write-ups.
- The domain (to set in `NEXT_PUBLIC_SITE_URL` and connect on Vercel).

**Begin with Phase 1 now.**
