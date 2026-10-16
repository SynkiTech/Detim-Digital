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
import { BustPlaceholder } from "@/components/home/BustPlaceholder";

const AVATAR_SRC = "/avatar/detim-avatar.png";

type Avatar25DProps = {
  /** True once `/public/avatar/detim-avatar.png` is supplied. */
  hasRealAvatar?: boolean;
};

/**
 * Tier-1 "2.5D" avatar (Master Prompt §5.2): CSS-3D tilt toward the
 * cursor (max ~8°, spring-smoothed), idle breathing float, orange rim
 * light, elliptical ground shadow and layered parallax (blurred
 * duplicate behind, floating orange shapes in front). Uses the real
 * avatar PNG when it exists, otherwise the stylised SVG bust.
 * Mobile: device-orientation tilt when permitted, else a slow sway.
 */
export function Avatar25D({ hasRealAvatar = false }: Avatar25DProps) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  const rx = useMotionValue(0); // rotateX
  const ry = useMotionValue(0); // rotateY
  const srx = useSpring(rx, { stiffness: 120, damping: 18 });
  const sry = useSpring(ry, { stiffness: 120, damping: 18 });
  const parX = useMotionValue(0);
  const parY = useMotionValue(0);
  const spx = useSpring(parX, { stiffness: 70, damping: 22 });
  const spy = useSpring(parY, { stiffness: 70, damping: 22 });

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine)").matches;

    if (fine) {
      const onMove = (e: MouseEvent) => {
        const el = wrapRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const nx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
        const ny = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
        const clampedX = Math.max(-1, Math.min(1, nx * 1.6));
        const clampedY = Math.max(-1, Math.min(1, ny * 1.6));
        ry.set(clampedX * 8);
        rx.set(clampedY * -8);
        parX.set(clampedX * 10);
        parY.set(clampedY * 8);
      };
      window.addEventListener("mousemove", onMove, { passive: true });
      return () => window.removeEventListener("mousemove", onMove);
    }

    // Mobile: device orientation if permitted
    const onOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      const g = Math.max(-30, Math.min(30, e.gamma));
      const b = Math.max(-30, Math.min(30, e.beta - 40));
      ry.set((g / 30) * 8);
      rx.set((b / 30) * -8);
    };
    window.addEventListener("deviceorientation", onOrientation);
    return () => window.removeEventListener("deviceorientation", onOrientation);
  }, [reduce, rx, ry, parX, parY]);

  return (
    <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[430px]">
      {/* ground shadow */}
      <div
        aria-hidden="true"
        className="absolute -bottom-6 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-[50%] bg-black/70 blur-xl"
      />

      {/* blurred duplicate behind */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 scale-105 opacity-60 blur-2xl"
      >
        {hasRealAvatar ? (
          <div className="h-full w-full rounded-[32px] bg-accent/25" />
        ) : null}
      </div>

      <motion.div
        ref={wrapRef}
        className="relative"
        style={{
          perspective: 900,
          rotateX: reduce ? 0 : srx,
          rotateY: reduce ? 0 : sry,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          className="relative"
          animate={reduce ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            x: reduce ? 0 : spx,
            y: reduce ? 0 : spy,
            transformStyle: "preserve-3d",
          }}
        >
          {/* orange rim light */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-[32px] bg-accent/45 blur-3xl"
          />
          {hasRealAvatar ? (
            <Image
              src={AVATAR_SRC}
              alt="3D-style avatar of Oluwadetimi Ajayi"
              width={800}
              height={1000}
              priority
              className="w-full rounded-[32px] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
            />
          ) : (
            <BustPlaceholder className="w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]" />
          )}

          {/* floating orange shapes in front (parallax layer) */}
          {!reduce && (
            <>
              <motion.span
                aria-hidden="true"
                className="absolute right-[6%] top-[18%] size-3 rounded-full bg-accent shadow-[0_0_18px_rgba(242,92,5,0.9)]"
                style={{ x: spx, translateZ: 40 }}
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              />
              <motion.span
                aria-hidden="true"
                className="absolute left-[10%] top-[52%] size-2 rounded-full bg-accent-soft shadow-[0_0_14px_rgba(242,92,5,0.8)]"
                style={{ x: spx, translateZ: 55 }}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              />
              <motion.span
                aria-hidden="true"
                className="absolute right-[22%] bottom-[16%] size-2.5 rounded-full bg-accent-deep shadow-[0_0_16px_rgba(242,92,5,0.8)]"
                style={{ x: spx, translateZ: 30 }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              />
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
