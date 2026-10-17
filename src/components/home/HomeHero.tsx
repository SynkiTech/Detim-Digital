"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TransitionLink } from "@/components/shared/RouteTransition";
import type { HomeContent } from "@/content/home";

const SHADE_PMM = "#FF5A1F";
const SHADE_GRANTS = "#D9480F";

const EASE = [0.22, 1, 0.36, 1] as const;

type HomeHeroProps = {
  content: HomeContent;
};

/**
 * HOME hero (Master Prompt §5): word-by-word masked headline reveal,
 * serif sub-heading, and the two big CTAs (each with a one-line helper).
 * The presenter in the background video takes the visual role the avatar
 * used to hold, so the copy owns a single confident column. Reduced
 * motion: fades only.
 */
export function HomeHero({ content }: HomeHeroProps) {
  const reduce = useReducedMotion();

  // Flatten segments into words, keeping each word's accent flag.
  const words = content.headlineSegments.flatMap((segment) =>
    segment.text
      .split(/(\s+)/)
      .filter((w) => w.length > 0)
      .map((word) => ({ word, accent: segment.accent ?? false }))
  );

  let wordIndex = 0;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 items-center px-6 pb-10 pt-6 sm:px-10 lg:pt-2">
      <div className="relative z-10 w-full">
        <h1 className="font-display text-[clamp(2rem,4.4vw+0.8rem,5rem)] font-extrabold leading-[1.04] tracking-tight">
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
          className="mt-5 max-w-2xl font-serif text-xl italic text-paper/85 sm:text-2xl lg:mt-7 lg:text-3xl"
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
    </div>
  );
}
