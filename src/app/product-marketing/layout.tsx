import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { pmMeta } from "@/content/product-marketing/meta";
import { pmHero } from "@/content/product-marketing/hero";
import { site } from "@/content/site";

/**
 * Product Marketing site layout — "Ember" theme (Master Prompt §6).
 * This site is exclusive to the product marketing skill; the layout owns
 * the theme scope, sticky nav and neutral footer.
 */
export const metadata: Metadata = {
  title: pmMeta.title,
  description: pmMeta.description,
  alternates: { canonical: "/product-marketing" },
  openGraph: {
    title: pmMeta.title,
    description: pmMeta.description,
    url: "/product-marketing",
    siteName: site.name,
    type: "website",
  },
};

export default function ProductMarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="theme-pmm min-h-screen bg-ink text-paper">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur">
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6"
        >
          <Logo variant="dark" />
          <span className="hidden rounded-full border border-accent/40 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-accent sm:inline-block">
            {pmMeta.label}
          </span>
          <div className="flex items-center gap-4">
            <Link
              href={pmHero.ctas.hire.href}
              className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground transition-colors duration-300 hover:bg-accent-deep"
            >
              {site.ui.hireMe}
            </Link>
            <Link
              href="/"
              className="text-sm text-paper/70 transition-colors hover:text-accent"
            >
              {site.ui.backHome}
            </Link>
          </div>
        </nav>
      </header>

      {children}

      <footer className="border-t border-white/10 bg-ink">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-6 py-8">
          <Logo variant="dark" />
          <span className="flex items-center gap-2 font-mono text-xs text-paper/70">
            <span
              aria-hidden="true"
              className="size-2 rounded-full bg-emerald-400"
            />
            {site.ui.availableLabel}
          </span>
          <span className="flex-1" aria-hidden="true" />
          <Link
            href="/"
            className="text-sm text-paper/70 transition-colors hover:text-accent"
          >
            {site.ui.backHome}
          </Link>
          <p className="w-full font-mono text-xs text-paper/40">
            {site.ui.copyright}
          </p>
        </div>
      </footer>
    </div>
  );
}
