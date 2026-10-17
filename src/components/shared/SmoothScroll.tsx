"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Buttery smooth scrolling (Master Prompt §10).
 * Disabled entirely under prefers-reduced-motion.
 *
 * Also owns the route-change scroll reset: Next.js keeps the window's
 * scroll offset across client-side navigations and Lenis caches its own
 * animated position, so following "← Home" from deep inside a long skill
 * page could land mid-way (or snap back) instead of at the top. Every
 * pathname change therefore forces an immediate scroll reset — skipped
 * for hash URLs so /book#brief still opens on the brief form, and on
 * first mount so a mid-page refresh keeps native scroll restoration.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const isFirstPathname = useRef(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    return () => {
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (isFirstPathname.current) {
      isFirstPathname.current = false;
      return;
    }
    if (typeof window !== "undefined" && window.location.hash) return;

    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
