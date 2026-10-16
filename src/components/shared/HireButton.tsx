"use client";

import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { useHireModal } from "@/components/shared/HireModalProvider";
import { Magnetic } from "@/components/shared/Magnetic";
import { cn } from "@/lib/utils";

type HireButtonProps = {
  children?: ReactNode;
  className?: string;
  /** "solid" = orange pill; "outline" = hairline pill. */
  variant?: "solid" | "outline";
  /** Wrap in a magnetic hover wrapper (fine pointers only). */
  magnetic?: boolean;
  showArrow?: boolean;
};

/**
 * "Hire me" button (Master Prompt §10) — opens the site's branded
 * Calendly modal instead of navigating away.
 */
export function HireButton({
  children = "Hire me",
  className,
  variant = "solid",
  magnetic = false,
  showArrow = true,
}: HireButtonProps) {
  const { open } = useHireModal();

  const button = (
    <button
      type="button"
      onClick={open}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-sm font-bold transition-colors duration-300 sm:text-base",
        variant === "solid"
          ? "bg-accent text-accent-foreground hover:bg-accent-deep"
          : "border border-white/25 text-paper hover:border-accent hover:text-accent",
        className
      )}
    >
      {children}
      {showArrow ? (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      ) : null}
    </button>
  );

  return magnetic ? <Magnetic>{button}</Magnetic> : button;
}
