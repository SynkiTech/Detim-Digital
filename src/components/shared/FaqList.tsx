"use client";

import type { FaqItem } from "@/content/types";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqListProps = {
  items: FaqItem[];
  tone?: "light" | "dark";
};

/** FAQ accordion (Master Prompt §6.11 / §7.12). */
export function FaqList({ items, tone = "dark" }: FaqListProps) {
  const light = tone === "light";

  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className={cn(
            "rounded-2xl border px-5 sm:px-6",
            light
              ? "border-ink/10 bg-paper shadow-sm data-[state=open]:border-accent/40"
              : "border-white/10 bg-ink-2/70 data-[state=open]:border-accent/50"
          )}
        >
          <AccordionTrigger className="py-5 text-left hover:no-underline">
            <span
              className={cn(
                "font-display text-base font-bold sm:text-lg",
                light ? "text-ink" : "text-paper"
              )}
            >
              {item.question}
            </span>
          </AccordionTrigger>
          <AccordionContent
            className={cn("pb-6 text-sm leading-relaxed", light ? "text-ink/75" : "text-paper/75")}
          >
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
