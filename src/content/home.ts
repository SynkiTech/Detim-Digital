/**
 * HOME copy (Master Prompt §5.1).
 * Home is the only place both skills appear — as the two CTAs plus the headline.
 * The cinematic background, avatar and motion are built in Phase 3.
 */
import type { HeadlineSegment } from "./types";

export interface HomeContent {
  headlineSegments: HeadlineSegment[];
  subHeading: string;
  primaryCta: { label: string; helper: string; href: string };
  secondaryCta: { label: string; helper: string; href: string };
}

export const home: HomeContent = {
  headlineSegments: [
    { text: "Hi, I'm Oluwadetimi Ajayi, a " },
    { text: "Tech Product Marketer", accent: true },
    { text: "and a " },
    { text: "Grant Expert", accent: true },
    { text: "." },
  ],
  subHeading: "How can I help your business today?",
  primaryCta: {
    label: "Product Marketing",
    helper: "Take your product to market.",
    href: "/product-marketing",
  },
  secondaryCta: {
    label: "Grant & Business Consultations",
    helper: "Win funding. Plan your growth.",
    href: "/grants-consulting",
  },
};
