"use client";

import type { ExperienceItem } from "@/content/types";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TONES = {
  light: {
    item: "border-ink/10 bg-paper data-[state=open]:border-accent/40 shadow-sm",
    title: "text-ink",
    dates: "text-ink/50",
    company: "text-accent-deep",
    tag: "border-ink/15 text-ink/60",
    summary: "text-ink/70",
    label: "text-ink/50",
    bullet: "text-ink/85",
    hover: "hover:no-underline",
  },
  dark: {
    item: "border-paper/10 bg-ink-2/70 data-[state=open]:border-accent/50",
    title: "text-paper",
    dates: "text-paper/50",
    company: "text-accent",
    tag: "border-paper/20 text-paper/60",
    summary: "text-paper/70",
    label: "text-paper/50",
    bullet: "text-paper/85",
    hover: "hover:no-underline",
  },
} as const;

type ExperienceListProps = {
  items: ExperienceItem[];
  /** "light" = on white sections, "dark" = on black sections. */
  tone?: "light" | "dark";
};

/**
 * Expandable experience cards (Master Prompt §6.5 / §7.6): job title,
 * company, dates, one-line summary and "What I did for them" bullets.
 * Renders only the `display*` fields so neutral names stay neutral.
 */
export function ExperienceList({ items, tone = "light" }: ExperienceListProps) {
  const t = TONES[tone];

  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className={cn("rounded-3xl border px-6 sm:px-8", t.item)}
        >
          <AccordionTrigger
            className={cn(
              "flex flex-col items-start gap-2 py-6 text-left",
              t.hover
            )}
          >
            <div className="flex w-full flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <span className={cn("font-display text-lg font-bold sm:text-xl", t.title)}>
                {item.displayTitle}
              </span>
              <span className={cn("font-mono text-xs", t.dates)}>{item.dates}</span>
            </div>
            <div className="flex w-full flex-wrap items-center gap-2">
              <span className={cn("text-sm font-medium", t.company)}>
                {item.displayName}
              </span>
              {item.tag ? (
                <span
                  className={cn(
                    "rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest",
                    t.tag
                  )}
                >
                  {item.tag}
                </span>
              ) : null}
            </div>
            <p className={cn("text-sm leading-relaxed", t.summary)}>
              {item.summary}
            </p>
          </AccordionTrigger>
          <AccordionContent className="pb-7">
            <p className={cn("mb-3 font-mono text-[11px] uppercase tracking-widest", t.label)}>
              What I did for them
            </p>
            <ul className="flex flex-col gap-2.5">
              {item.did.map((entry) => (
                <li key={entry} className={cn("flex gap-3 text-sm", t.bullet)}>
                  <span
                    aria-hidden="true"
                    className="mt-[9px] size-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {entry}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
