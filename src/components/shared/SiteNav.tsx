"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { HireButton } from "@/components/shared/HireButton";
import { HomeLink } from "@/components/shared/HomeLink";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export type NavLink = { href: string; label: string };

type SiteNavProps = {
  /** Small chip label, e.g. "Product Marketing". */
  label: string;
  /** In-page anchor links (Services · Experience · Results · Portfolio). */
  links: NavLink[];
  cvHref: string;
};

/**
 * Floating skill-site navigation: a centred glass pill that floats over
 * the page and never spans the full width (reference: jenniesdigital.com).
 * It is transparent (low-opacity ink + backdrop blur) so the page shows
 * through, and it adapts to day mode because every colour is a token.
 * Mobile gets the full-screen menu as a sibling of the header, outside
 * the pill, so inset-0 really covers the viewport.
 */
export function SiteNav({ label, links, cvHref }: SiteNavProps) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  // Lock scroll while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  const jumpTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      {/* The wrapper is full-width only to centre the pill; the nav
          itself is w-fit so the bar never touches both edges. */}
      <header className="pointer-events-none fixed inset-x-0 top-3 z-40 flex justify-center px-3 sm:top-4 sm:px-4">
        <nav
          aria-label="Primary"
          className="pointer-events-auto flex h-14 w-fit max-w-full items-center gap-1.5 rounded-full border border-paper/10 bg-ink/55 pl-2.5 pr-2 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:gap-2 sm:pl-3"
        >
          <Logo variant="dark" className="shrink-0" />

          <span className="ml-1 hidden rounded-full border border-accent/40 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-accent lg:inline-block">
            {label}
          </span>

          <div className="hidden items-center gap-0.5 lg:flex">
            {links.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => jumpTo(link.href)}
                className="rounded-full px-3 py-1.5 text-sm text-paper/75 transition-colors hover:bg-paper/10 hover:text-paper"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <a
              href={cvHref}
              download
              className="hidden items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm text-paper/70 underline decoration-paper/30 underline-offset-4 transition-colors hover:text-accent md:inline-flex"
            >
              <Download className="size-3.5" aria-hidden="true" />
              Download CV
            </a>
            <HireButton
              className="hidden px-4 py-2 text-sm sm:inline-flex"
              showArrow={false}
            />
            <ThemeToggle />
            <HomeLink />
            <button
              type="button"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 place-items-center rounded-full border border-paper/15 text-paper transition-colors hover:border-accent hover:text-accent lg:hidden"
            >
              {open ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/*
        Mobile full-screen menu — a SIBLING of the header on purpose:
        the fixed header is not the menu's containing block, so
        inset-0 really covers the viewport.
      */}
      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-50 flex flex-col bg-ink px-6 pb-10 pt-4"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="flex h-12 items-center justify-between">
              <Logo variant="dark" onNavigate={() => setOpen(false)} />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid size-10 place-items-center rounded-full border border-paper/15 text-paper"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <span className="mt-8 w-fit rounded-full border border-accent/40 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-accent">
              {label}
            </span>

            <ul className="mt-6 flex flex-col gap-2">
              {links.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => jumpTo(link.href)}
                    className="w-full py-3 text-left font-display text-2xl font-bold text-paper transition-colors hover:text-accent"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-4">
              <HireButton className="w-full" magnetic={false} />
              <div className="flex items-center justify-between">
                <a
                  href={cvHref}
                  download
                  className="inline-flex items-center gap-2 text-sm text-paper/75 underline decoration-paper/30 underline-offset-4"
                >
                  <Download className="size-4" aria-hidden="true" />
                  Download CV
                </a>
                <div className="flex items-center gap-3">
                  <ThemeToggle />
                  <HomeLink onNavigate={() => setOpen(false)} />
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
