"use client";

import Image from "next/image";
import { useState } from "react";
import { useReducedMotion } from "framer-motion";

const VIDEO = "/videos/hero-loop.mp4";
const POSTER = "/videos/hero-poster.jpg";

/**
 * HOME background (Master Prompt §5.3, video edition): the owner-supplied
 * presenter loop plays full-bleed behind the hero, under a light dark
 * overlay stack so the headline and CTAs stay the loudest things on screen.
 *
 * Layers, bottom to top:
 *   1. poster frame (LCP image — also the permanent backdrop under
 *      reduced motion, where the loop never autoplays)
 *   2. the video loop, fading in once it can play
 *   3. dim + directional gradients (ink-tokenised, so day mode flips
 *      the whole stack into a warm daylight wash automatically)
 *   4. vignette + film grain for a cinematic finish
 */
export function HeroVideoBackground() {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden bg-ink"
    >
      {/* 1 — poster: instant paint, LCP candidate, reduced-motion still */}
      <Image
        src={POSTER}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* 2 — the loop (skipped entirely under reduced motion) */}
      {!reduce && (
        <video
          className={`hero-video absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-out ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          src={VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          tabIndex={-1}
          onCanPlay={() => setReady(true)}
        />
      )}

      {/* 3 — the "little dark overlay": a mild all-over dim, a slightly
         stronger seat for the copy column, and edge gradients so the
         brand row and footer strip keep their contrast. */}
      <div className="absolute inset-0 bg-ink/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-ink/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/40" />

      {/* 4 — filmic finish */}
      <div
        className="hero-vignette absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(0,0,0,0.5) 100%)",
        }}
      />
      <div className="grain absolute inset-0 opacity-[0.045]" />
    </div>
  );
}
