"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { Monogram } from "@/components/shared/Monogram";
import { CalendlyInline } from "@/components/shared/CalendlyInline";
import { site } from "@/content/site";
import type { SiteKey } from "@/lib/site-config";

type CalendlyModalProps = {
  siteKey: SiteKey;
  open: boolean;
  onClose: () => void;
};

/**
 * Full-screen branded "Hire me" modal (Master Prompt §10): logo,
 * heading, skeleton loader, Calendly inline widget and a fallback
 * link. Esc closes, focus is trapped, body scroll is locked, and on
 * mobile it fills the screen as a sheet.
 */
export function CalendlyModal({ siteKey, open, onClose }: CalendlyModalProps) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Focus management + scroll lock + Escape (FocusTrap-lite).
  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const focusTimer = setTimeout(() => closeRef.current?.focus(), 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const focusables = Array.from(
          document.querySelectorAll<HTMLElement>(
            "[data-calendly-modal] a[href], [data-calendly-modal] button, [data-calendly-modal] iframe"
          )
        ).filter((el) => el.offsetParent !== null);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="calendly-modal"
          data-calendly-modal
          role="dialog"
          aria-modal="true"
          aria-label={site.ui.bookHeading}
          className="fixed inset-0 z-[85] flex flex-col bg-ink text-paper"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <header className="flex items-center justify-between gap-4 border-b border-paper/10 px-5 py-4 sm:px-8">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-ink-2 to-ink ring-1 ring-paper/15 shadow-[inset_0_1px_0_rgb(255_255_255/0.10),0_10px_24px_-10px_rgb(242_92_5/0.5)]"
              >
                <Monogram className="size-5" />
              </span>
              <div>
                <p className="font-display text-base font-bold leading-tight sm:text-lg">
                  {site.ui.bookHeading}
                </p>
                <p className="font-mono text-[11px] text-paper/60">
                  30 minutes · {site.timezoneLabel}
                </p>
              </div>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close booking modal"
              className="grid size-10 place-items-center rounded-full border border-paper/15 text-paper/80 transition-colors hover:border-accent hover:text-accent"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </header>

          <div className="relative flex-1 overflow-hidden">
            <CalendlyInline siteKey={siteKey} className="absolute inset-0" />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
