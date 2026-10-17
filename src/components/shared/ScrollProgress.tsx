"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Slim orange scroll-progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[95] h-[3px] origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}
