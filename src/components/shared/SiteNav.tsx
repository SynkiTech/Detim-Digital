"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { HireButton } from "@/components/shared/HireButton";
import { HomeLink } from "@/components/shared/HomeLink";

export type NavLink = { href: string; label: string };

type SiteNavProps = {
  /** Small chip label, e.g. "Product Marketing". */
  label: string;
  /** In-page anchor links (Services · Experience · Results · Portfolio). */
  links: NavLink[];
  cvHref: string;
};

/**
 * Sticky skill-site navigation (Master Prompt §6/§7): logo, label chip,
 * section links, Download CV in the secondary slot, Hire me (opens the
 * branded Calendly modal) and the neutral "← Home" link. Mobile gets a
 * full-screen menu.
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
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6"
      >
        <Logo variant="dark" />

        <span className="hidden rounded-full border border-accent/40 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-accent lg:inline-block">
          {label}
        </span>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => jumpTo(link.href)}
              className="text-sm text-paper/75 transition-colors hover:text-accent"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href={cvHref}
            download
            className="hidden items-center gap-1.5 text-sm text-paper/70 underline decoration-white/30 underline-offset-4 transition-colors hover:text-accent sm:inline-flex"
          >
            <Download className="size-3.5" aria-hidden="true" />
            Download CV
          </a>
          <HireButton className="hidden px-5 py-2 text-sm sm:inline-flex" showArrow={false} />
          <HomeLink />
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full border border-white/15 text-paper lg:hidden"
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
      the header's backdrop-blur makes it a containing block, which
      would trap a fixed-position child inside the 64px bar.
      Placed outside so inset-0 really covers the viewport.
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
              <Logo variant="dark" />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid size-10 place-items-center rounded-full border border-white/15 text-paper"
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
                  className="inline-flex items-center gap-2 text-sm text-paper/75 underline decoration-white/30 underline-offset-4"
                >
                  <Download className="size-4" aria-hidden="true" />
                  Download CV
                </a>
                <HomeLink onNavigate={() => setOpen(false)} />
              </div>
            </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
    </>
  );
}
