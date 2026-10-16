import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { pmHero } from "@/content/product-marketing/hero";

/**
 * Product Marketing landing page (Master Prompt §6).
 * Phase 1 renders the hero with the real copy; the remaining eleven
 * sections (problems, services, experience, results, testimonials,
 * process, portfolio, FAQ) are built in Phase 4.
 */
export default function ProductMarketingPage() {
  return (
    <main>
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
            <p className="mb-5 flex items-center gap-2 font-mono text-xs text-paper/70">
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-emerald-400"
              />
              Available for new projects
            </p>

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

            <p className="mt-6 max-w-xl font-serif text-xl italic text-paper/80 sm:text-2xl">
              {pmHero.subHeading}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href={pmHero.ctas.hire.href}
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-display text-base font-bold text-accent-foreground transition-colors duration-300 hover:bg-accent-deep"
              >
                {pmHero.ctas.hire.label}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
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
            </div>

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
          </div>

          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 translate-x-3 translate-y-3 rounded-[28px] bg-accent/25 blur-2xl"
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
        </div>
      </section>
    </main>
  );
}
