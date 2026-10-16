import Image from "next/image";
import Link from "next/link";
import { statSync } from "fs";
import path from "path";
import { ArrowRight, Download } from "lucide-react";
import { Marquee } from "@/components/shared/Marquee";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { ServiceCards } from "@/components/shared/ServiceCards";
import { ExperienceList } from "@/components/shared/ExperienceList";
import { CtaBand } from "@/components/shared/CtaBand";
import { ProcessSteps } from "@/components/shared/ProcessSteps";
import { TestimonialsSection } from "@/components/shared/TestimonialsSection";
import { PortfolioCards } from "@/components/shared/PortfolioCards";
import { FaqList } from "@/components/shared/FaqList";
import { HireButton } from "@/components/shared/HireButton";
import { AvailabilityBadge } from "@/components/shared/AvailabilityBadge";
import { pmProblems } from "@/content/product-marketing/problems";
import { pmServices } from "@/content/product-marketing/services";
import { pmExperience } from "@/content/product-marketing/experience";
import { pmProcess } from "@/content/product-marketing/process";
import { pmFaq } from "@/content/product-marketing/faq";
import { pmTestimonials } from "@/content/product-marketing/testimonials";
import { pmProofFallback } from "@/content/product-marketing/proof";
import { pmMeta } from "@/content/product-marketing/meta";
import { pmHero } from "@/content/product-marketing/hero";
import { site } from "@/content/site";

function cvFileSize(): string {
  try {
    const bytes = statSync(
      path.join(process.cwd(), "public", pmMeta.cvPath.replace(/^\//, ""))
    ).size;
    if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  } catch {
    return "PDF";
  }
}

/**
 * Product Marketing site (Master Prompt §6) — one long-scroll landing
 * page with alternating black/white sections, exclusive to this skill.
 */
export default function ProductMarketingPage() {
  const briefHref = "/product-marketing/book#brief";

  return (
    <main id="main">
      {/* 1 — Hero (black) */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-[-25%] h-[38rem] w-[38rem] rounded-full bg-accent/15 blur-[140px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 bottom-[-30%] h-[26rem] w-[26rem] rounded-full bg-accent/10 blur-[120px]"
        />

        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28">
          <div>
            <Reveal>
              <AvailabilityBadge className="mb-6" />
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="font-display text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
                {pmHero.headlineSegments.map((segment, i) =>
                  segment.accent ? (
                    <span key={i} className="text-accent">
                      {segment.text}
                    </span>
                  ) : (
                    <span key={i}>{segment.text}</span>
                  )
                )}
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl font-serif text-xl italic text-paper/80 sm:text-2xl">
                {pmHero.subHeading}
              </p>
            </Reveal>

            <Reveal delay={0.18} className="mt-9 flex flex-wrap items-center gap-4">
              <HireButton magnetic />
              <Link
                href={pmHero.ctas.work.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-display text-base font-bold text-paper transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                {pmHero.ctas.work.label}
              </Link>
              <a
                href={pmHero.ctas.cv.href}
                download
                className="inline-flex items-center gap-2 text-sm text-paper/70 underline decoration-white/30 underline-offset-4 transition-colors hover:text-accent"
              >
                <Download className="size-4" aria-hidden="true" />
                {pmHero.ctas.cv.label}
              </a>
            </Reveal>

            <Reveal delay={0.24}>
              <ul className="mt-10 flex flex-wrap gap-2" aria-label="Who I work with">
                {pmHero.chips.map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full border border-white/15 px-3.5 py-1.5 font-mono text-xs text-paper/70"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.15} y={36}>
            <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 translate-x-3 translate-y-3 rounded-[28px] bg-accent/25 blur-2xl"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-[28px] bg-accent/30 blur-3xl"
              />
              <Image
                src={pmHero.portrait}
                alt="Portrait of Oluwadetimi Ajayi, smiling, wearing a black blazer"
                width={640}
                height={800}
                priority
                className="aspect-[4/5] w-full rounded-[28px] border border-white/10 object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2 — Marquee strip (orange) */}
      <Marquee
        items={[
          "Positioning",
          "Launch plans",
          "Customer research",
          "Competitor analysis",
          "Pricing",
          "Messaging",
          "Ads",
          "Website audits",
        ]}
        className="bg-accent text-accent-foreground"
      />

      {/* 3 — "Sound familiar?" (white) */}
      <section className="w-full bg-paper text-ink">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
          <SectionHeading
            eyebrow="Sound familiar?"
            title="If any of these is happening to you, you're in the right place."
            tone="light"
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pmProblems.items.map((problem, i) => (
              <Reveal
                as="li"
                key={problem.id}
                delay={i * 0.05}
                className="flex gap-4 rounded-3xl border border-ink/10 bg-surface p-6"
              >
                <span
                  aria-hidden="true"
                  className="mt-1 font-display text-2xl font-extrabold text-accent"
                >
                  &ldquo;
                </span>
                <p className="text-base leading-relaxed text-ink/85">
                  {problem.quote}
                </p>
              </Reveal>
            ))}
            <Reveal
              as="li"
              delay={0.28}
              className="flex items-center rounded-3xl bg-ink p-6 text-paper"
            >
              <p className="font-display text-xl font-bold leading-snug">
                {pmProblems.closingLine.split("Here's how I fix them.")[0]}
                <span className="text-accent">Here&apos;s how I fix them.</span>
              </p>
            </Reveal>
          </ul>
        </div>
      </section>

      {/* 4 — Services (black) */}
      <section id="services" className="w-full scroll-mt-16 bg-ink text-paper">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
          <SectionHeading
            eyebrow="Services"
            title="Everything you need to take your product to market."
            sub="Pick one piece or the whole journey — every service starts from your customer, not from a template."
          />
          <div className="mt-12">
            <ServiceCards services={pmServices} />
          </div>
        </div>
      </section>

      {/* 5 — Experience (white) */}
      <section id="experience" className="w-full scroll-mt-16 bg-surface text-ink">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
          <SectionHeading
            eyebrow="Experience"
            title="Work I've done for businesses like yours."
            sub="Open any card to see exactly what I did."
            tone="light"
          />
          <div className="mt-12">
            <ExperienceList items={pmExperience} tone="light" />
          </div>
        </div>
      </section>

      {/* 6 — CTA band #1 (orange) */}
      <CtaBand
        heading="Want results like these for your product?"
        tone="orange"
        briefHref={briefHref}
      />

      {/* 7 — Testimonials (black) — falls back to proof of work until real quotes land */}
      <section id="results" className="w-full scroll-mt-16 bg-ink text-paper">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
          <SectionHeading
            eyebrow="Results"
            title="What working together looks like."
          />
          <div className="mt-12">
            <TestimonialsSection
              testimonials={pmTestimonials}
              siteLabel="Product Marketing"
              fallback={pmProofFallback}
              tone="dark"
            />
          </div>
        </div>
      </section>

      {/* 8 — How I work (white) */}
      <section className="w-full bg-paper text-ink">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
          <SectionHeading
            eyebrow="How I work"
            title="Four steps, no mystery."
            tone="light"
          />
          <div className="mt-12">
            <ProcessSteps process={pmProcess} tone="light" />
          </div>
        </div>
      </section>

      {/* 9 — CTA band #2 (black with orange headline) */}
      <CtaBand
        heading="Let's get your product the attention it deserves."
        tone="black"
        briefHref={briefHref}
      />

      {/* 10 — Portfolio & CV (white) */}
      <section id="portfolio" className="w-full scroll-mt-16 bg-surface text-ink">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
          <SectionHeading
            eyebrow="Portfolio & CV"
            title="See it for yourself."
            tone="light"
          />
          <div className="mt-12">
            <PortfolioCards
              driveUrl={pmMeta.driveUrl}
              driveLabel="See my product marketing portfolio"
              cvPath={pmMeta.cvPath}
              cvLabel="Download my CV"
              cvSize={cvFileSize()}
              tone="light"
            />
          </div>
        </div>
      </section>

      {/* 11 — FAQ (black) */}
      <section id="faq" className="w-full bg-ink text-paper">
        <div className="mx-auto w-full max-w-4xl px-6 py-20 sm:py-24">
          <SectionHeading eyebrow="FAQ" title="Questions I hear a lot." />
          <div className="mt-12">
            <FaqList items={pmFaq} tone="dark" />
          </div>
          <Reveal className="mt-10 flex flex-wrap items-center gap-4">
            <p className="text-sm text-paper/70">
              Something else on your mind?
            </p>
            <Link
              href={briefHref}
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent"
            >
              Send a brief
              <ArrowRight
                aria-hidden="true"
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
