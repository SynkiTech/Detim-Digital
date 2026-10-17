/**
 * Shared content shapes for Detim Digital (Master Prompt §8).
 * All copy lives in /content — never hard-coded in components.
 */

export type HeadlineSegment = {
  text: string;
  /** When true, the segment renders in the site's accent colour. */
  accent?: boolean;
};

export interface HeroContent {
  headlineSegments: HeadlineSegment[];
  subHeading: string;
  chips: string[];
  portrait: string;
  ctas: {
    hire: { label: string; href: string };
    work: { label: string; href: string };
    cv: { label: string; href: string };
  };
}

export interface SiteMeta {
  title: string;
  description: string;
  /** Small label chip shown in the sticky nav. */
  label: string;
  driveUrl: string;
  cvPath: string;
}

export interface ProblemItem {
  id: string;
  /** Written in the visitor's own voice. */
  quote: string;
}

export interface ProblemsContent {
  items: ProblemItem[];
  closingLine: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  /** One line: the problem it solves. */
  problem: string;
  /** One line: what you get. */
  youGet: string;
}

export interface ExperienceItem {
  id: string;
  /** The title shown on the site (may be a neutral display version). */
  displayTitle: string;
  /** The company name shown on the site (may be a neutral display version). */
  displayName: string;
  dates: string;
  summary: string;
  did: string[];
  tag?: "Portfolio project";
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

export interface ProcessContent {
  steps: ProcessStep[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface StatItem {
  id: string;
  /** The displayed value, e.g. "100+" or "80%". */
  value: string;
  label: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  photo?: string;
  sourceUrl?: string;
  verified: boolean;
}
