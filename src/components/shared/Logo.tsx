"use client";

import { TransitionLink } from "@/components/shared/RouteTransition";
import { Monogram } from "@/components/shared/Monogram";
import { cn } from "@/lib/utils";

/** Home theme accent (globals.css .theme-home) — the wipe colour when
 *  travelling home, matching how every cross-site link uses the
 *  destination site's shade. Same-route clicks are no-oped inside
 *  RouteTransition, so the logo is safe to click on Home itself. */
const HOME_SHADE = "#F25C05";

type LogoProps = {
  /**
   * The surface the logo sits on: "dark" (ink/paper surfaces) adds the
   * lift ring + ambient accent shadow; "light" keeps the tile flat.
   */
  variant?: "dark" | "light";
  href?: string;
  withWordmark?: boolean;
  /**
   * Extra classes for the wordmark span — e.g. the nav pill hides it
   * below 360px ("hidden min-[360px]:inline") so the pill fits 320px
   * screens without dropping any control.
   */
  wordmarkClassName?: string;
  /** Called as the home wipe starts — e.g. closes the mobile menu. */
  onNavigate?: () => void;
  className?: string;
};

/**
 * Detim Digital logo: the 3D monogram tile + "Detim Digital" wordmark.
 * Clicking it always travels home through the cinematic route wipe —
 * the same transition every other navigation affordance uses — so the
 * redirect to "/" gives immediate visual feedback and lands at the top
 * of the Home page (scroll reset lives in SmoothScroll).
 */
export function Logo({
  variant = "light",
  href = "/",
  withWordmark = true,
  wordmarkClassName,
  onNavigate,
  className,
}: LogoProps) {
  return (
    <TransitionLink
      href={href}
      shade={HOME_SHADE}
      onNavigate={onNavigate}
      ariaLabel="Detim Digital, home"
      className={cn(
        // .hit-sm: the 36px tile gets a 44px touch target everywhere the
        // logo is tappable (nav pill, mobile menu, footer, Home brand row).
        "group hit-sm inline-flex items-center gap-2.5",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-xl",
          "bg-gradient-to-br from-ink-2 via-ink to-ink",
          "transition-transform duration-300 ease-out will-change-transform",
          "group-hover:[transform:perspective(640px)_rotateX(10deg)_rotateY(-14deg)_scale(1.06)]",
          "motion-reduce:transition-none motion-reduce:group-hover:[transform:none]",
          variant === "dark" &&
            "ring-1 ring-paper/15 shadow-[inset_0_1px_0_rgb(255_255_255/0.10),0_10px_26px_-10px_rgb(242_92_5/0.55)]",
        )}
      >
        {/* Warm accent pool lighting the tile floor */}
        <span
          aria-hidden="true"
          className="absolute inset-x-1 bottom-0 h-1/2 bg-[radial-gradient(65%_85%_at_50%_100%,rgb(242_92_5/0.35),transparent)]"
        />
        <Monogram className="relative size-5" />
      </span>
      {withWordmark ? (
        <span className={cn("text-lg leading-none tracking-tight", wordmarkClassName)}>
          <span className="font-display font-bold">Detim</span>{" "}
          <span className="font-sans font-light opacity-70">Digital</span>
        </span>
      ) : null}
    </TransitionLink>
  );
}
