import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import { CalendlyInline } from "@/components/shared/CalendlyInline";
import { BriefForm } from "@/components/shared/BriefForm";
import { Reveal } from "@/components/shared/Reveal";
import { grantsServices } from "@/content/grants/services";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Book a call | Grants & Consultations",
  description:
    "Book a 30-minute call or send a brief. I'll reply within 1 to 2 working days.",
  alternates: { canonical: "/grants-consulting/book" },
  openGraph: {
    title: "Book a call | Grants & Consultations",
    description:
      "Book a 30-minute call or send a brief. I'll reply within 1 to 2 working days.",
    url: "/grants-consulting/book",
    siteName: "Detim Digital",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a call | Grants & Consultations",
    description:
      "Book a 30-minute call or send a brief. I'll reply within 1 to 2 working days.",
  },
};

/**
 * Grants booking page (Master Prompt §10): the branded Calendly inline
 * widget beside the site's own brief form.
 */
export default function BookPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
      <Reveal>
        <h1 className="max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
          {site.ui.bookHeading}
        </h1>
        <p className="mt-4 max-w-xl text-paper/75">
          Pick a time that suits you, or send the brief below. Either way,
          I&apos;ll reply within 1 to 2 working days.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-12">
        <Reveal delay={0.08}>
          <div className="relative min-h-[560px] overflow-hidden rounded-3xl border border-paper/10 bg-ink-2/60 lg:sticky lg:top-24 lg:h-[720px]">
            <CalendlyInline siteKey="grants" className="absolute inset-0" />
          </div>
        </Reveal>

        <div id="brief" className="scroll-mt-24">
          <Reveal delay={0.12}>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Prefer to write it down? Send a brief.
            </h2>
            <p className="mb-7 mt-2 text-sm text-paper/70">
              Tell me where you are and what you need, and I&apos;ll come to the
              call with a point of view.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <BriefForm
              siteKey="grants"
              needs={grantsServices.map((s) => s.title)}
            />
          </Reveal>

          <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-paper/15 px-5 py-2.5 text-sm text-paper/85 transition-colors hover:border-accent hover:text-accent"
            >
              <Mail className="size-4" aria-hidden="true" />
              {site.email}
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-paper/15 px-5 py-2.5 text-sm text-paper/85 transition-colors hover:border-accent hover:text-accent"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp
            </a>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
