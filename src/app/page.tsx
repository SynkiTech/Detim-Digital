import Link from "next/link";
import { ArrowRight, Linkedin, Mail, MessageCircle } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { home } from "@/content/home";
import { site } from "@/content/site";

/**
 * HOME — cinematic landing (Master Prompt §5).
 * Phase 1 renders the real copy with the brand system; the cinematic
 * background, 2.5D/3D avatar and motion arrive in Phase 3.
 */
export default function HomePage() {
  return (
    <main className="theme-home relative flex min-h-screen flex-col overflow-hidden bg-ink text-paper">
      {/* Soft orange glow — placeholder for the Phase 3 cinematic background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 right-[-12%] h-[36rem] w-[36rem] rounded-full bg-accent/20 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-30%] left-[-10%] h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-[120px]"
      />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-14">
        <div className="flex items-center justify-between gap-4">
          <Logo variant="dark" />
          <p className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-xs text-paper/90">
            <span
              aria-hidden="true"
              className="size-2 rounded-full bg-emerald-400"
            />
            {site.ui.availableLabel}
          </p>
        </div>

        <div className="flex flex-1 flex-col justify-center py-16">
          <h1 className="max-w-4xl font-display text-4xl font-bold leading-[1.06] tracking-tight sm:text-6xl lg:text-7xl">
            {home.headlineSegments.map((segment, i) =>
              segment.accent ? (
                <span key={i} className="text-accent">
                  {segment.text}
                </span>
              ) : (
                <span key={i}>{segment.text}</span>
              )
            )}
          </h1>
          <p className="mt-6 font-serif text-2xl italic text-paper/80 sm:text-3xl">
            {home.subHeading}
          </p>

          <div className="mt-12 grid gap-4 sm:max-w-2xl sm:grid-cols-2">
            <Link
              href={home.primaryCta.href}
              className="group rounded-3xl bg-accent p-6 text-ink transition-colors duration-300 hover:bg-accent-deep"
            >
              <span className="flex items-center justify-between font-display text-xl font-bold">
                {home.primaryCta.label}
                <ArrowRight
                  aria-hidden="true"
                  className="size-5 transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
              <span className="mt-2 block text-sm opacity-80">
                {home.primaryCta.helper}
              </span>
            </Link>

            <Link
              href={home.secondaryCta.href}
              className="group rounded-3xl border border-white/15 bg-paper p-6 text-ink transition-colors duration-300 hover:bg-accent"
            >
              <span className="flex items-center justify-between font-display text-xl font-bold">
                {home.secondaryCta.label}
                <ArrowRight
                  aria-hidden="true"
                  className="size-5 text-accent transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink"
                />
              </span>
              <span className="mt-2 block text-sm opacity-80">
                {home.secondaryCta.helper}
              </span>
            </Link>
          </div>
        </div>
      </div>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-5 font-mono text-xs text-paper/60">
          <span className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="size-2 rounded-full bg-emerald-400"
            />
            {site.ui.availableLabel}
          </span>
          <span>{site.timezoneLabel}</span>
          <span className="flex-1" aria-hidden="true" />
          <a
            href={`mailto:${site.email}`}
            aria-label={`Email ${site.person}`}
            className="transition-colors hover:text-accent"
          >
            <Mail className="size-4" aria-hidden="true" />
          </a>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="transition-colors hover:text-accent"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-accent"
          >
            <Linkedin className="size-4" aria-hidden="true" />
          </a>
        </div>
      </footer>
    </main>
  );
}
