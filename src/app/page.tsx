import { existsSync } from "fs";
import path from "path";
import { Linkedin, Mail, MessageCircle } from "lucide-react";
import { CinematicBackground } from "@/components/home/CinematicBackground";
import { HomeHero } from "@/components/home/HomeHero";
import { Clock } from "@/components/shared/Clock";
import { home } from "@/content/home";
import { site } from "@/content/site";

/**
 * HOME — the cinematic landing page (Master Prompt §5).
 * A single full-screen impression: layered background built from her
 * portrait, 2.5D/3D avatar, word-reveal headline and the two big CTAs
 * that wipe into each skill site. Plus a slim footer strip.
 */
export default function HomePage() {
  // Dropping the real assets into /public/avatar/ is the only step
  // needed to swap the placeholder bust for the real avatar (§5.2).
  const hasAvatar = existsSync(
    path.join(process.cwd(), "public", "avatar", "detim-avatar.png")
  );
  const hasGlb = existsSync(
    path.join(process.cwd(), "public", "avatar", "detim-avatar.glb")
  );

  return (
    <main id="main" className="theme-home relative flex min-h-dvh flex-col overflow-hidden bg-ink text-paper">
      <CinematicBackground />

      {/* top brand row */}
      <header className="relative z-20 flex items-center justify-between gap-4 px-6 pt-6 sm:px-10">
        <p className="font-display text-lg font-bold leading-none tracking-tight">
          Detim{" "}
          <span className="font-sans font-light opacity-70">Digital</span>
        </p>
        <p className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-xs text-paper/90">
          <span
            aria-hidden="true"
            className="relative flex size-2"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          {site.ui.availableLabel}
        </p>
      </header>

      <HomeHero content={home} hasAvatar={hasAvatar} hasGlb={hasGlb} />

      {/* slim footer strip */}
      <footer className="relative z-20 border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-4 font-mono text-xs text-paper/60 sm:px-10">
          <span className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="size-2 rounded-full bg-emerald-400"
            />
            {site.ui.availableLabel}
          </span>
          <Clock showOfficePill={false} />
          <span className="flex-1" aria-hidden="true" />
          <a
            href={`mailto:${site.email}`}
            aria-label={`Email ${site.person}`}
            className="transition-colors hover:text-accent"
          >
            <Mail className="size-4" aria-hidden="true" />
          </a>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="transition-colors hover:text-accent"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-accent"
          >
            <Linkedin className="size-4" aria-hidden="true" />
          </a>
        </div>
      </footer>
    </main>
  );
}
