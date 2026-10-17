"use client";

import { TransitionLink } from "@/components/shared/RouteTransition";
import { cn } from "@/lib/utils";

/** Home theme accent (globals.css .theme-home) — the wipe colour when
 *  travelling back to the Home site, matching how cross-site links use
 *  the destination site's shade. */
const HOME_SHADE = "#F25C05";

type HomeLinkProps = {
  /** "pill" = bordered button (nav, mobile menu); "quiet" = text link (footer). */
  variant?: "pill" | "quiet";
  className?: string;
  /** Called as the wipe starts — e.g. closes the mobile menu. */
  onNavigate?: () => void;
};

/**
 * The single source of the "← Home" affordance on both skill sites.
 * Always plays the cinematic route transition to "/" and always lands
 * at the top of the Home page (scroll reset lives in SmoothScroll).
 */
export function HomeLink({
  variant = "pill",
  className,
  onNavigate,
}: HomeLinkProps) {
  if (variant === "quiet") {
    return (
      <TransitionLink
        href="/"
        shade={HOME_SHADE}
        onNavigate={onNavigate}
        ariaLabel="Back to the Home page"
        className={cn(
          // .hit: the small text link gets a >=44px touch target.
          "hit text-sm text-paper/70 transition-colors hover:text-accent",
          className
        )}
      >
        &larr; Home
      </TransitionLink>
    );
  }

  return (
    <TransitionLink
      href="/"
      shade={HOME_SHADE}
      onNavigate={onNavigate}
      ariaLabel="Back to the Home page"
      className={cn(
        // Invisible hit expansion tuned for the crowded nav pill: vertical
        // growth gives the 30px pill a 54px target; horizontal growth stays
        // at 4px so it never steals taps from the toggle/burger beside it.
        "relative inline-flex items-center gap-1.5 rounded-full border border-paper/20 px-3.5 py-1.5 font-display text-xs font-bold text-paper transition-colors duration-300 after:absolute after:inset-x-[-0.25rem] after:inset-y-[-0.75rem] after:rounded-full after:content-[''] hover:border-accent hover:text-accent sm:px-4 sm:py-2 sm:text-sm",
        className
      )}
    >
      <span aria-hidden="true">&larr;</span>
      Home
    </TransitionLink>
  );
}
