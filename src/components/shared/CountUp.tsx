"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  /** Final display value, e.g. "100+", "80%", "$5K to $1M+". */
  value: string;
  className?: string;
  /** Animation duration in ms. */
  duration?: number;
};

/**
 * Count-up on view (Master Prompt §10). Animates the numeric part of
 * `value` from 0 when the element scrolls into view. Values without a
 * single leading number ("$5K to $1M+") render statically.
 * Without JavaScript the final value renders as-is.
 */
export function CountUp({ value, className, duration = 1500 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // Null = not animating yet → show the final value (SSR/no-JS safe).
  const [animated, setAnimated] = useState<string | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || started.current) return;

    const match = value.match(/^([^0-9]*)(\d+)(.*)$/);
    // Animate only when the value contains exactly one number.
    if (!match || /\d/.test(match[1] ?? "") || /\d/.test(match[3] ?? "")) {
      return;
    }
    const prefix = match[1] ?? "";
    const target = parseInt(match[2], 10);
    const suffix = match[3] ?? "";

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        io.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setAnimated(`${prefix}${Math.round(target * eased)}${suffix}`);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);

    return () => io.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {animated ?? value}
    </span>
  );
}
