"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Fades each route in on client-side navigation (part of the shared
 * motion engine). Opacity only — no transform, so sticky headers and
 * fixed overlays are never affected by a containing block.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
