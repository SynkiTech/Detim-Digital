"use client";

import { useId } from "react";

/**
 * Detim Digital mark — a 3D extruded "D" monogram (Master Prompt §3).
 *
 * The front face carries the full brand orange ramp (accent-soft highlight
 * through the PMM / Home / Grants accents into the deep burnts), stepped
 * extrusion layers give it dimension, and a clipped glass gloss sells the
 * light source. Gradients are self-contained, so the mark renders
 * identically on any surface, theme scope or day/night mode.
 *
 * Lives in its own module so RouteTransition and Logo can both import it
 * without a circular dependency (Logo uses RouteTransition's TransitionLink).
 *
 * Sized by the caller via className (e.g. "size-5", "size-9", "size-16").
 */
export function Monogram({ className }: { className?: string }) {
  // Unique gradient/clip ids per instance — safe to render many marks on
  // one page (nav, mobile menu, footer, modal) without id collisions.
  const uid = useId().replace(/:/g, "");

  const d =
    "M20 12h13.5C45.6 12 52.5 19.8 52.5 32S45.6 52 33.5 52H20V12Zm9 8.5v23h4.2c6.9 0 10.5-4.1 10.5-11.5S39.9 20.5 33 20.5H29Z";

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <defs>
        {/* Front face — the full brand ramp: soft highlight, PMM, Home, Grants, deep. */}
        <linearGradient
          id={`${uid}f`}
          x1="32"
          y1="10"
          x2="32"
          y2="54"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FF9E6B" />
          <stop offset="0.22" stopColor="#FF5A1F" />
          <stop offset="0.52" stopColor="#F25C05" />
          <stop offset="0.78" stopColor="#D9480F" />
          <stop offset="1" stopColor="#C2410C" />
        </linearGradient>
        {/* Extrusion — mid step and deep floor of the burnt family. */}
        <linearGradient
          id={`${uid}m`}
          x1="34"
          y1="14"
          x2="38"
          y2="54"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#C2410C" />
          <stop offset="1" stopColor="#7C2D08" />
        </linearGradient>
        <linearGradient
          id={`${uid}s`}
          x1="36"
          y1="16"
          x2="40"
          y2="56"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#A33708" />
          <stop offset="1" stopColor="#5C1E04" />
        </linearGradient>
        {/* Glass gloss across the lit top half. */}
        <linearGradient
          id={`${uid}g`}
          x1="32"
          y1="10"
          x2="32"
          y2="33"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.38" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${uid}c`}>
          <path d={d} />
        </clipPath>
      </defs>
      {/* Optical centering: shift back by half the extrusion offset. */}
      <g transform="translate(-1.8 -2.1)">
        <path
          d={d}
          fill={`url(#${uid}s)`}
          fillRule="evenodd"
          transform="translate(3.6 4.2)"
        />
        <path
          d={d}
          fill={`url(#${uid}m)`}
          fillRule="evenodd"
          transform="translate(1.8 2.1)"
        />
        <path d={d} fill={`url(#${uid}f)`} fillRule="evenodd" />
        <g clipPath={`url(#${uid}c)`}>
          <rect x="18" y="9" width="37" height="25" fill={`url(#${uid}g)`} />
        </g>
      </g>
    </svg>
  );
}
