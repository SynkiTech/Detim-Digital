"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Monogram } from "@/components/shared/Logo";

const SESSION_KEY = "dd-loader-done";
const DURATION_MS = 1500;

/** useLayoutEffect on the client, useEffect on the server (no SSR warning). */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Full-screen branded loader (Master Prompt §10): orange "D" monogram,
 * mono "DETIM DIGITAL 0% → 100%" counter, then a wipe reveal.
 * Shows once per browser session; skippable with a click or any key.
 * Instant (never shown) under prefers-reduced-motion.
 */
export function Loader() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();
  const rafRef = useRef<number | null>(null);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* storage unavailable — loader simply runs on every full load */
    }
    setShow(false);
  }, []);

  // Before the first client paint, skip the loader if this session has
  // already seen it. SSR always renders it to keep first-visit markup stable.
  useIsomorphicLayoutEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) setShow(false);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!show) return;
    if (reduce) {
      // Hide instantly (still via a callback, not sync in the effect body).
      const raf = requestAnimationFrame(finish);
      return () => cancelAnimationFrame(raf);
    }

    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION_MS);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        finish();
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    const onSkip = () => finish();
    window.addEventListener("keydown", onSkip);
    window.addEventListener("pointerdown", onSkip);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("keydown", onSkip);
      window.removeEventListener("pointerdown", onSkip);
    };
  }, [show, reduce, finish]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="loader"
          data-loader
          className="fixed inset-0 z-[100] grid place-items-center bg-ink"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          role="status"
          aria-label="Loading Detim Digital"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.span
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="grid size-16 place-items-center rounded-2xl bg-ink-2 ring-1 ring-paper/10"
            >
              <Monogram className="size-9 text-accent" />
            </motion.span>
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-paper/80">
              Detim Digital{" "}
              <span className="text-accent tabular-nums">{progress}%</span>
            </p>
            <div
              aria-hidden="true"
              className="h-px w-40 overflow-hidden bg-paper/10"
            >
              <div
                className="h-full bg-accent transition-[width] duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
