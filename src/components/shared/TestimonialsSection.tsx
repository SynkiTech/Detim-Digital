import { Quote } from "lucide-react";
import type { Testimonial } from "@/content/types";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/Reveal";

export type ProofTile = { value: string; label: string };

type TestimonialsSectionProps = {
  /** Real, verified quotes for this site. */
  testimonials: Testimonial[];
  /** Site name used in the build warning. */
  siteLabel: string;
  /** Fallback tiles shown when no verified testimonial exists. */
  fallback: { title: string; sub: string; tiles: ProofTile[] };
  tone?: "light" | "dark";
};

const isDev = process.env.NODE_ENV === "development";

const SAMPLES: Testimonial[] = [
  {
    quote: "SAMPLE: replace me — a short line about the result you got, in the client's own words.",
    name: "Client name",
    role: "Role",
    company: "Company",
    verified: false,
  },
  {
    quote: "SAMPLE: replace me — keep quotes short, specific and human.",
    name: "Client name",
    role: "Role",
    company: "Company",
    verified: false,
  },
  {
    quote: "SAMPLE: replace me — one client per card, five lines max.",
    name: "Client name",
    role: "Role",
    company: "Company",
    verified: false,
  },
];

/**
 * Testimonials section (Master Prompt §9):
 * - renders only `verified: true` entries in production
 * - in development, clearly-labelled SAMPLE cards keep the layout reviewable
 * - with no verified entries, the section becomes a "Proof of work" strip
 *   and a TESTIMONIALS MISSING warning is printed
 */
export function TestimonialsSection({
  testimonials,
  siteLabel,
  fallback,
  tone = "dark",
}: TestimonialsSectionProps) {
  const light = tone === "light";
  const verified = testimonials.filter((t) => t.verified);

  if (verified.length > 0) {
    return (
      <TestimonialGrid
        items={verified}
        tone={tone}
      />
    );
  }

  if (isDev) {
    console.warn(`TESTIMONIALS MISSING for ${siteLabel} — showing SAMPLE cards (dev only).`);
    return (
      <div>
        <p
          className={cn(
            "mb-6 rounded-2xl border border-dashed px-4 py-2.5 font-mono text-xs",
            light ? "border-ink/20 text-ink/60" : "border-white/20 text-paper/60"
          )}
        >
          SAMPLE: replace me — add real, verified quotes in
          content/{siteLabel === "Product Marketing" ? "product-marketing" : "grants"}/testimonials.ts
          (set verified: true).
        </p>
        <TestimonialGrid items={SAMPLES} tone={tone} sample />
      </div>
    );
  }

  console.warn(`TESTIMONIALS MISSING for ${siteLabel} — falling back to the proof-of-work strip.`);

  return (
    <div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {fallback.tiles.map((tile, i) => (
          <Reveal
            as="li"
            key={tile.label}
            delay={i * 0.06}
            className={cn(
              "flex flex-col justify-between gap-4 rounded-3xl border p-6",
              light
                ? "border-ink/10 bg-paper shadow-sm"
                : "border-white/10 bg-ink-2/70"
            )}
          >
            <span
              aria-hidden="true"
              className="font-display text-3xl font-extrabold text-accent"
            >
              {"//"}
            </span>
            <div>
              <p
                className={cn(
                  "font-display text-lg font-bold leading-snug",
                  light ? "text-ink" : "text-paper"
                )}
              >
                {tile.value}
              </p>
              <p
                className={cn(
                  "mt-1.5 text-sm leading-relaxed",
                  light ? "text-ink/65" : "text-paper/65"
                )}
              >
                {tile.label}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
      <p
        className={cn(
          "mt-6 font-mono text-xs",
          light ? "text-ink/50" : "text-paper/50"
        )}
      >
        {fallback.sub}
      </p>
    </div>
  );
}

function TestimonialGrid({
  items,
  tone,
  sample = false,
}: {
  items: Testimonial[];
  tone: "light" | "dark";
  sample?: boolean;
}) {
  const light = tone === "light";

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((t, i) => (
        <Reveal
          as="li"
          key={`${t.name}-${i}`}
          delay={i * 0.06}
          className={cn(
            "flex flex-col gap-5 rounded-3xl border p-7",
            light
              ? "border-ink/10 bg-paper shadow-sm"
              : "border-white/10 bg-ink-2/70"
          )}
        >
          <div className="flex items-center justify-between">
            <Quote
              aria-hidden="true"
              className="size-7 fill-accent text-accent"
            />
            {sample ? (
              <span className="rounded-full border border-dashed border-current px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest opacity-60">
                Sample
              </span>
            ) : (
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest",
                  light ? "bg-ink/5 text-ink/60" : "bg-white/5 text-paper/60"
                )}
              >
                Verified
              </span>
            )}
          </div>
          <blockquote
            className={cn(
              "flex-1 text-base leading-relaxed text-pretty sm:text-lg",
              light ? "text-ink/85" : "text-paper/85"
            )}
          >
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <figcaption
            className={cn(
              "flex items-center gap-3 border-t pt-4",
              light ? "border-ink/10" : "border-white/10"
            )}
          >
            <span
              aria-hidden="true"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-accent/15 font-display text-sm font-bold text-accent"
            >
              {t.name.charAt(0)}
            </span>
            <span>
              <span
                className={cn(
                  "block text-sm font-semibold",
                  light ? "text-ink" : "text-paper"
                )}
              >
                {t.name}
              </span>
              <span
                className={cn(
                  "block text-xs",
                  light ? "text-ink/60" : "text-paper/60"
                )}
              >
                {t.role}
                {t.company ? `, ${t.company}` : ""}
              </span>
            </span>
            {t.sourceUrl ? (
              <a
                href={t.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto font-mono text-[10px] uppercase tracking-widest text-accent underline-offset-4 hover:underline"
              >
                Source
              </a>
            ) : null}
          </figcaption>
        </Reveal>
      ))}
    </ul>
  );
}
