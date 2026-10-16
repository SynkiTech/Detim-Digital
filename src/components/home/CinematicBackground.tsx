"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { EmberCanvas } from "@/components/home/EmberCanvas";

const PORTRAIT = "/images/oluwadetimi-ajayi-portrait.jpg";

/**
 * The cinematic animated background (Master Prompt §5.3), built from
 * layers — no heavy video:
 *   1. near-black base
 *   2. blurred duotone (black + orange) portrait copy, slow Ken Burns
 *   3. pulsing volumetric orange glow + anamorphic lens-flare sweep
 *   4. ember particle canvas with cursor parallax
 *   5. film grain, vignette, letterbox bars that open on load
 *   6. slow dolly-in + cursor parallax between layers
 * Reduced motion: static backdrop only, no particles/motion.
 */
export function CinematicBackground() {
  const reduce = useReducedMotion();
  // Shared, mutable cursor position (-1..1) — written in the mousemove
  // effect, read by the ember canvas rAF loop. Never read during render.
  const pointer = useRef({ x: 0, y: 0 });

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 60, damping: 22 });
  const spy = useSpring(py, { stiffness: 60, damping: 22 });

  // Parallax offsets per layer (background moves least, glow more).
  const bgX = useTransform(spx, (v) => v * -14);
  const bgY = useTransform(spy, (v) => v * -8);
  const glowX = useTransform(spx, (v) => v * 22);
  const glowY = useTransform(spy, (v) => v * 12);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      pointer.current = { x: nx, y: ny };
      px.set(nx);
      py.set(ny);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, px, py]);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden bg-ink"
    >
      {/* 2 — duotone Ken Burns backdrop from her portrait */}
      <motion.div
        className="absolute -inset-[8%]"
        style={reduce ? undefined : { x: bgX, y: bgY }}
      >
        <motion.div
          className="relative h-full w-full"
          initial={reduce ? { scale: 1.08 } : { scale: 1.05 }}
          animate={{ scale: reduce ? 1.08 : 1.2 }}
          transition={{
            duration: 30,
            repeat: reduce ? 0 : Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <Image
            src={PORTRAIT}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_20%] opacity-45 blur-[80px] saturate-[1.6] contrast-[1.15]"
            style={{
              filter:
                "grayscale(0.75) sepia(0.55) hue-rotate(-18deg) saturate(2.2) brightness(0.5) contrast(1.1) blur(72px)",
            }}
          />
        </motion.div>
        {/* orange multiply + black fade to keep text legible */}
        <div className="absolute inset-0 bg-accent/10 mix-blend-multiply" />
      </motion.div>

      {/* 3a — volumetric glow behind the head, slow pulse */}
      <motion.div
        className="absolute left-1/2 top-[16%] h-[46vmax] w-[46vmax] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(242,92,5,0.34) 0%, rgba(242,92,5,0.12) 38%, transparent 68%)",
          ...(reduce ? {} : { x: glowX, y: glowY }),
        }}
        animate={reduce ? undefined : { opacity: [0.7, 1, 0.7], scale: [1, 1.06, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 3b — anamorphic lens-flare streak, sweeps every ~12s */}
      {!reduce && (
        <div className="absolute inset-x-0 top-1/3 h-24 overflow-hidden">
          <div className="flare-streak absolute left-[-30%] top-1/2 h-[3px] w-[55%] -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-accent/70 to-transparent blur-[2px]" />
        </div>
      )}

      {/* 4 — embers */}
      <EmberCanvas pointer={pointer} />

      {/* scrim behind the headline side */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/40" />

      {/* 5 — grain + vignette */}
      <div className="grain absolute inset-0 opacity-[0.05]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* 5b — cinematic letterbox bars, open on first load */}
      {!reduce && (
        <>
          <motion.div
            className="absolute inset-x-0 top-0 z-10 h-[9vh] bg-black"
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{ duration: 1.1, delay: 1.7, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 z-10 h-[9vh] bg-black"
            initial={{ y: 0 }}
            animate={{ y: "100%" }}
            transition={{ duration: 1.1, delay: 1.7, ease: [0.76, 0, 0.24, 1] }}
          />
        </>
      )}
    </div>
  );
}
