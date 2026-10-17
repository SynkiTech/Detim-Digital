import Link from "next/link";
import { site } from "@/content/site";

export default function NotFound() {
  return (
    <main className="theme-home grid min-h-screen place-items-center bg-ink px-6 text-paper">
      <div className="text-center">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-6xl">
          This page moved, or never existed.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-paper/70">
          The link may be old or mistyped. Pick your next step from the start.
        </p>
        <Link
          href="/"
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-display font-bold text-accent-foreground transition-colors duration-300 hover:bg-accent-deep"
        >
          Back to {site.name}
        </Link>
      </div>
    </main>
  );
}
