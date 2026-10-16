"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Avatar25D } from "@/components/home/Avatar25D";
import { TransitionLink } from "@/components/shared/RouteTransition";
import type { HomeContent } from "@/content/home";

// Tier-2 real 3D avatar — only pulled in when the env flag is set AND the
// GLB exists; falls back to Tier 1 inside the chunk on any GLB failure.
const SHADE_PMM = "#FF5A1F";
const SHADE_GRANTS = "#D9480F";

const EASE = [0.22, 1, 0.36, 1] as const;

type HomeHeroProps = {
  content: HomeContent;
  /** Server-detected: /public/avatar/detim-avatar.png exists. */
  hasAvatar: boolean;
  /** Server-detected: /public/avatar/detim-avatar.glb exists. */
  hasGlb: boolean;
};

/**
 * HOME hero (Master Prompt §5): word-by-word masked headline reveal,
 * serif sub-heading, the two big CTAs (each with a one-line helper),
 * and the 2.5D/3D avatar rising into place. Reduced motion: fades only.
 */
export function HomeHero({ content, hasAvatar, hasGlb }: HomeHeroProps) {
  const reduce = useReducedMotion();

  const enable3D = process.env.NEXT_PUBLIC_AVATAR_3D === "true" && hasGlb;
  const Avatar3D = enable3D
    ? dynamic(() => import("@/components/home/Avatar3D"), {
        ssr: false,
        loading: () => <Avatar25D hasRealAvatar={hasAvatar} />,
      })
    : null;

  // Flatten segments into words, keeping each word's accent flag.
  const words = content.headlineSegments.flatMap((segment) =>
    segment.text
      .split(/(\s+)/)
      .filter((w) => w.length > 0)
      .map((word) => ({ word, accent: segment.accent ?? false }))
  );

  let wordIndex = 0;

  return (
    <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-6 px-6 pb-10 pt-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-4 lg:pt-2">
      {/* headline + CTAs */}
      <div className="relative z-10 order-2 lg:order-1">
        <h1 className="font-display text-[clamp(1.9rem,4.2vw+0.8rem,5rem)] font-extrabold leading-[1.04] tracking-tight">
          {words.map(({ word, accent }) => {
            const i = wordIndex++;
            return (
              <span
                key={i}
                aria-hidden="true"
                className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]"
              >
                <motion.span
                  className={`inline-block ${accent ? "text-accent" : ""} ${
                    /^\s+$/.test(word) ? "w-[0.5em]" : ""
                  }`}
                  initial={reduce ? { opacity: 0 } : { y: "115%" }}
                  animate={reduce ? { opacity: 1 } : { y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.35 + i * 0.055,
                    ease: EASE,
                  }}
                >
                  {word === " " ? "\u00A0" : word}
                </motion.span>
              </span>
            );
          })}
          {/* Screen readers get the plain headline once */}
          <span className="sr-only">
            {content.headlineSegments.map((s) => s.text).join("")}
          </span>
        </h1>

        <motion.p
          className="mt-5 font-serif text-xl italic text-paper/85 sm:text-2xl lg:mt-7 lg:text-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: reduce ? 0 : 1.15, ease: "easeOut" }}
        >
          {content.subHeading}
        </motion.p>

        <motion.div
          className="mt-8 grid gap-4 sm:max-w-2xl sm:grid-cols-2 lg:mt-12"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: reduce ? 0 : 1.35, ease: EASE }}
        >
          <TransitionLink
            href={content.primaryCta.href}
            shade={SHADE_PMM}
            className="group rounded-3xl bg-accent p-5 text-ink transition-colors duration-300 hover:bg-accent-deep sm:p-6"
          >
            <span className="flex items-center justify-between gap-3 font-display text-lg font-bold sm:text-xl">
              {content.primaryCta.label}
              <ArrowRight
                aria-hidden="true"
                className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
            <span className="mt-1.5 block text-sm opacity-80">
              {content.primaryCta.helper}
            </span>
          </TransitionLink>

          <TransitionLink
            href={content.secondaryCta.href}
            shade={SHADE_GRANTS}
            className="group rounded-3xl border border-paper/15 bg-paper p-5 text-ink transition-colors duration-300 hover:bg-accent hover:text-ink sm:p-6"
          >
            <span className="flex items-center justify-between gap-3 font-display text-lg font-bold sm:text-xl">
              {content.secondaryCta.label}
              <ArrowRight
                aria-hidden="true"
                className="size-5 shrink-0 text-accent transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink"
              />
            </span>
            <span className="mt-1.5 block text-sm opacity-80">
              {content.secondaryCta.helper}
            </span>
          </TransitionLink>
        </motion.div>
      </div>

      {/* avatar — rises and settles */}
      <motion.div
        className="relative order-1 lg:order-2"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 60, scale: 0.97 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: reduce ? 0 : 0.5, ease: EASE }}
      >
        {Avatar3D ? <Avatar3D /> : <Avatar25D hasRealAvatar={hasAvatar} />}
      </motion.div>
    </div>
  );
}
