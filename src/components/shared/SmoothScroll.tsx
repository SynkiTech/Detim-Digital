"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Buttery smooth scrolling (Master Prompt §10).
 * Disabled entirely under prefers-reduced-motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
