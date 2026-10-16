import Image from "next/image";
import Link from "next/link";
import { statSync } from "fs";
import path from "path";
import { ArrowRight, Award, Download, ShieldCheck } from "lucide-react";
import { Marquee } from "@/components/shared/Marquee";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { CountUp } from "@/components/shared/CountUp";
import { ServiceCards } from "@/components/shared/ServiceCards";
import { ExperienceList } from "@/components/shared/ExperienceList";
import { CtaBand } from "@/components/shared/CtaBand";
import { ProcessSteps } from "@/components/shared/ProcessSteps";
import { TestimonialsSection } from "@/components/shared/TestimonialsSection";
import { PortfolioCards } from "@/components/shared/PortfolioCards";
import { FaqList } from "@/components/shared/FaqList";
import { HireButton } from "@/components/shared/HireButton";
import { AvailabilityBadge } from "@/components/shared/AvailabilityBadge";
import { grantsProblems } from "@/content/grants/problems";
import { grantsServices } from "@/content/grants/services";
import { grantsStats } from "@/content/grants/stats";
import {
  grantsProofLines,
  grantsCredentials,
  grantsFundersNote,
} from "@/content/grants/proof";
import { grantsExperience } from "@/content/grants/experience";
import { grantsProcess } from "@/content/grants/process";
import { grantsFaq } from "@/content/grants/faq";
import { grantsTestimonials } from "@/content/grants/testimonials";
import { grantsMeta } from "@/content/grants/meta";
import { grantsHero } from "@/content/grants/hero";
import { site } from "@/content/site";

function cvFileSize(): string {
  try {
    const bytes = statSync(
      path.join(process.cwd(), "public", grantsMeta.cvPath.replace(/^\//, ""))
    ).size;
    if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  } catch {
    return "PDF";
  }
}

/**
 * Grants & Business Consultations site (Master Prompt §7) — one
 * long-scroll page in the warm "Rust" theme, exclusive to this
 * skill. Same shared components as the other site, its own copy.
 */
export default function GrantsConsultingPage() {
  const briefHref = "/grants-consulting/book#brief";

  return (
    <main id="main">
      {/* 1 — Hero (warm black) */}
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
                {grantsHero.headlineSegments.map((segment, i) =>
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
                {grantsHero.subHeading}
              </p>
            </Reveal>

            <Reveal delay={0.18} className="mt-9 flex flex-wrap items-center gap-4">
              <HireButton magnetic />
              <Link
                href={grantsHero.ctas.work.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-display text-base font-bold text-paper transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                {grantsHero.ctas.work.label}
              </Link>
              <a
                href={grantsHero.ctas.cv.href}
                download
                className="inline-flex items-center gap-2 text-sm text-paper/70 underline decoration-white/30 underline-offset-4 transition-colors hover:text-accent"
              >
                <Download className="size-4" aria-hidden="true" />
                {grantsHero.ctas.cv.label}
              </a>
            </Reveal>

            <Reveal delay={0.24}>
              <ul className="mt-10 flex flex-wrap gap-2" aria-label="Who I work with">
                {grantsHero.chips.map((chip) => (
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
                src={grantsHero.portrait}
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

      {/* 2 — Marquee (orange, white text on the deep shade) */}
      <Marquee
        items={[
          "Grant research",
          "Applications",
          "Budgets",
          "Reviews",
          "Reporting",
          "Market research",
          "Business plans",
          "Trademark search",
        ]}
        className="bg-accent text-accent-foreground"
      />

      {/* 3 — "Sound familiar?" (white) */}
      <section className="w-full bg-paper text-ink">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
          <SectionHeading
            eyebrow="Sound familiar?"
            title="If any of this is where you are right now, you're in the right place."
            tone="light"
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {grantsProblems.items.map((problem, i) => (
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
                You don&apos;t have to do this alone.{" "}
                <span className="text-accent">Here&apos;s how I help.</span>
              </p>
            </Reveal>
          </ul>
        </div>
      </section>

      {/* 4 — Services (warm black) */}
      <section id="services" className="w-full scroll-mt-16 bg-ink text-paper">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
          <SectionHeading
            eyebrow="Services"
            title="From first idea to funded project — and everything after."
            sub="One piece or the whole journey, always built around what the funder is looking for."
          />
          <div className="mt-12">
            <ServiceCards services={grantsServices} />
          </div>
        </div>
      </section>

      {/* 5 — Results (white): verified numbers, proof, credibility */}
      <section id="results" className="w-full scroll-mt-16 bg-paper text-ink">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
          <SectionHeading
            eyebrow="Results"
            title="Numbers I can stand behind."
            tone="light"
          />

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {grantsStats.map((stat, i) => (
              <Reveal
                as="li"
                key={stat.id}
                delay={i * 0.06}
                className="flex flex-col justify-between gap-4 rounded-3xl border border-ink/10 bg-surface p-6"
              >
                <CountUp
                  value={stat.value}
                  className="font-display text-4xl font-extrabold tabular-nums text-accent-deep sm:text-5xl"
                />
                <span className="text-sm leading-snug text-ink/70">
                  {stat.label}
                </span>
              </Reveal>
            ))}
          </ul>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {grantsProofLines.map((line, i) => (
              <Reveal
                key={line}
                delay={0.1 + i * 0.06}
                className="flex items-start gap-3 rounded-3xl bg-ink p-6 text-paper"
              >
                <ShieldCheck
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-accent"
                />
                <p className="text-sm leading-relaxed text-paper/90">{line}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="mt-10">
            <ul
              aria-label="Credentials"
              className="flex flex-wrap items-center gap-3"
            >
              {grantsCredentials.map((credential) => (
                <li
                  key={credential}
                  className="flex items-center gap-2 rounded-full border border-ink/15 bg-surface px-4 py-2 text-sm text-ink/80"
                >
                  <Award
                    aria-hidden="true"
                    className="size-4 shrink-0 text-accent-deep"
                  />
                  {credential}
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-3xl font-mono text-xs leading-relaxed text-ink/55">
              {grantsFundersNote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 6 — Experience (warm black) */}
      <section id="experience" className="w-full scroll-mt-16 bg-ink text-paper">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
          <SectionHeading
            eyebrow="Experience"
            title="Work I've done for organisations like yours."
            sub="Open any card to see exactly what I did."
          />
          <div className="mt-12">
            <ExperienceList items={grantsExperience} tone="dark" />
          </div>
        </div>
      </section>

      {/* 7 — CTA band #1 (orange, white text on the deep shade) */}
      <CtaBand
        heading="Have a grant to win or a plan to build?"
        tone="orange"
        briefHref={briefHref}
      />

      {/* 8 — Testimonials (white) — falls back to verified numbers until real quotes land */}
      <section className="w-full bg-surface text-ink">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
          <SectionHeading
            eyebrow="Testimonials"
            title="What clients say."
            tone="light"
          />
          <div className="mt-12">
            <TestimonialsSection
              testimonials={grantsTestimonials}
              siteLabel="Grants & Consultations"
              fallback={{
                title: "Verified results",
                sub: "The numbers above are verified from real applications — real quotes are being collected now.",
                tiles: grantsStats.map((stat) => ({
                  value: stat.value,
                  label: stat.label,
                })),
              }}
              tone="light"
            />
          </div>
        </div>
      </section>

      {/* 9 — How I work (warm black) */}
      <section className="w-full bg-ink text-paper">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
          <SectionHeading
            eyebrow="How I work"
            title="Five steps, start to funded."
          />
          <div className="mt-12">
            <ProcessSteps process={grantsProcess} tone="dark" />
          </div>
        </div>
      </section>

      {/* 10 — CTA band #2 (white with orange headline) */}
      <CtaBand
        heading="Let's get your funding application, or your plan, ready."
        tone="white"
        briefHref={briefHref}
      />

      {/* 11 — Portfolio & CV (white) */}
      <section id="portfolio" className="w-full scroll-mt-16 bg-paper text-ink">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
          <SectionHeading
            eyebrow="Portfolio & CV"
            title="See it for yourself."
            tone="light"
          />
          <div className="mt-12">
            <PortfolioCards
              driveUrl={grantsMeta.driveUrl}
              driveLabel="See my grants & consultations portfolio"
              cvPath={grantsMeta.cvPath}
              cvLabel="Download my CV"
              cvSize={cvFileSize()}
              tone="light"
            />
          </div>
        </div>
      </section>

      {/* 12 — FAQ (warm black) */}
      <section id="faq" className="w-full bg-ink text-paper">
        <div className="mx-auto w-full max-w-4xl px-6 py-20 sm:py-24">
          <SectionHeading eyebrow="FAQ" title="Straight answers." />
          <div className="mt-12">
            <FaqList items={grantsFaq} tone="dark" />
          </div>
          <Reveal className="mt-10 flex flex-wrap items-center gap-4">
            <p className="text-sm text-paper/70">
              Ready when you are.
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
