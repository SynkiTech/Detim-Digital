"use client";

import { useEffect } from "react";
import Link from "next/link";
import { site } from "@/content/site";

/**
 * Branded error boundary (Master Prompt §10.5).
 */
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="theme-home grid min-h-screen place-items-center bg-ink px-6 text-paper">
      <div className="text-center">
        <p className="font-mono text-sm text-accent">Something broke</p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-6xl">
          That&apos;s on us, not you.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-paper/70">
          An unexpected error stopped this page. Try again, or head back to
          the start and pick up from there.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-display font-bold text-accent-foreground transition-colors duration-300 hover:bg-accent-deep"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-paper/20 px-7 py-3.5 font-display font-bold transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            Back to {site.name}
          </Link>
        </div>
      </div>
    </main>
  );
}
