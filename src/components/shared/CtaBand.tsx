import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/Reveal";
import { HireButton } from "@/components/shared/HireButton";
import { site } from "@/content/site";

type CtaBandProps = {
  heading: string;
  /** Visual treatment per the page rhythm. */
  tone: "orange" | "black" | "white";
  /** Where the "Send a brief" button links. */
  briefHref: string;
  className?: string;
};

const TONES: Record<CtaBandProps["tone"], { section: string; title: string; sub: string }> = {
  orange: {
    section: "bg-accent text-accent-foreground",
    title: "text-accent-foreground",
    sub: "text-accent-foreground/80",
  },
  black: {
    section: "bg-ink text-paper",
    title: "text-accent",
    sub: "text-paper/70",
  },
  white: {
    section: "bg-paper text-ink",
    title: "text-accent-deep",
    sub: "text-ink/70",
  },
};

/**
 * Full-width CTA band (Master Prompt §6.6/§6.9, §7.7/§7.10):
 * "Hire me" opens the branded Calendly modal; "Send a brief" jumps to
 * the site's brief form.
 */
export function CtaBand({ heading, tone, briefHref, className }: CtaBandProps) {
  const t = TONES[tone];
  const onOrange = tone === "orange";

  return (
    <section className={cn("w-full", t.section, className)}>
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-8 px-6 py-16 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
        <Reveal>
          <h2
            className={cn(
              "font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl",
              t.title
            )}
          >
            {heading}
          </h2>
          <p className={cn("mt-3 font-serif text-lg italic", t.sub)}>
            Reply within 1 to 2 working days, guaranteed.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-wrap items-center gap-4">
          <HireButton
            className={cn(
              onOrange &&
                "bg-ink text-accent hover:bg-ink-2 ring-1 ring-ink/10"
            )}
            magnetic
          />
          <Link
            href={briefHref}
            className={cn(
              "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-sm font-bold transition-colors duration-300 sm:text-base",
              onOrange
                ? "border border-ink/30 text-ink hover:bg-ink hover:text-accent"
                : "border border-current/30 hover:border-accent hover:text-accent"
            )}
          >
            {site.ui.sendBrief}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
