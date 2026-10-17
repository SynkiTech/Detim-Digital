"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type RevealProps = {
  children: ReactNode;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
  className?: string;
  /** Animate every time the element enters the viewport. */
  once?: boolean;
  as?: "div" | "section" | "li" | "article" | "span";
};

/**
 * Scroll-reveal wrapper (Master Prompt §10): ease-out rise + fade on
 * first entry into the viewport. Reduced motion → simple fade.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
