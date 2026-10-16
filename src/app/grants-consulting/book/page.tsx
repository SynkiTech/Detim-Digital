import { Mail, MessageCircle } from "lucide-react";
import { site } from "@/content/site";

/**
 * Grants & Business Consultations booking page (Master Prompt §10).
 * The branded Calendly modal + inline widget are wired in Phase 2.
 */
export default function BookPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-24">
      <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
        {site.ui.bookHeading}
      </h1>
      <p className="mt-4 max-w-lg text-paper/75">
        Pick a time that suits you, or reach me directly and I will reply
        within 1 to 2 working days.
      </p>
      <div className="mt-9 flex flex-wrap items-center gap-4">
        <a
          href={`mailto:${site.email}`}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground transition-colors duration-300 hover:bg-accent-deep"
        >
          <Mail className="size-4" aria-hidden="true" />
          {site.email}
        </a>
        <a
          href={site.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-paper transition-colors duration-300 hover:border-accent hover:text-accent"
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          WhatsApp
        </a>
      </div>
    </main>
  );
}
