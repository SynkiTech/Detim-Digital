import { site } from "@/content/site";

/**
 * Per-site configuration for shared, parameterised features
 * (Calendly modal, brief form, transitions — Master Prompt §10).
 */
export type SiteKey = "home" | "pmm" | "grants";

export interface SiteThemeConfig {
  key: SiteKey;
  /** Class that scopes this site's brand tokens. */
  themeClass: string;
  /** Accent hex, used for Calendly page settings and transition panels. */
  accent: string;
  /** Colour used for the transition overlay text. */
  overlayText: string;
  /** utm_source appended to the Calendly URL so bookings are attributable. */
  utmSource: string;
  /** Email subject prefix for briefs coming from this site. */
  emailSubjectPrefix: string;
  bookHeading: string;
  bookIntro: string;
}

export const SITE_CONFIG: Record<SiteKey, SiteThemeConfig> = {
  home: {
    key: "home",
    themeClass: "theme-home",
    accent: "#F25C05",
    overlayText: "#0A0A0A",
    utmSource: "home",
    emailSubjectPrefix: "[Detim Digital]",
    bookHeading: "Book a 30-minute call with Oluwadetimi",
    bookIntro:
      "Pick a time that suits you, or reach me directly and I will reply within 1 to 2 working days.",
  },
  pmm: {
    key: "pmm",
    themeClass: "theme-pmm",
    accent: "#FF5A1F",
    overlayText: "#0A0A0A",
    utmSource: "product-marketing",
    emailSubjectPrefix: "[Product Marketing]",
    bookHeading: "Book a 30-minute call with Oluwadetimi",
    bookIntro:
      "Pick a time that suits you, or reach me directly and I will reply within 1 to 2 working days.",
  },
  grants: {
    key: "grants",
    themeClass: "theme-grants",
    accent: "#D9480F",
    overlayText: "#FFFFFF",
    utmSource: "grants-consulting",
    emailSubjectPrefix: "[Grants & Consultations]",
    bookHeading: "Book a 30-minute call with Oluwadetimi",
    bookIntro:
      "Pick a time that suits you, or reach me directly and I will reply within 1 to 2 working days.",
  },
};

export function getCalendlyUrl(cfg: SiteThemeConfig): string {
  const base = process.env.NEXT_PUBLIC_CALENDLY_URL || site.calendly;
  const params = new URLSearchParams({
    hide_gdpr_banner: "1",
    hide_event_type_details: "1",
    hide_landing_page_details: "1",
    background_color: "0A0A0A",
    text_color: "FFFFFF",
    primary_color: cfg.accent.replace("#", ""),
    utm_source: cfg.utmSource,
  });
  return `${base}?${params.toString()}`;
}

/** Shared "Send a brief" form option lists (site-agnostic). */
export const BRIEF_TIMELINE_OPTIONS = [
  "ASAP — within 2 weeks",
  "Within a month",
  "In 1 to 3 months",
  "Just exploring options",
] as const;

export const BRIEF_BUDGET_OPTIONS = [
  "Under $500",
  "$500 – $1,500",
  "$1,500 – $5,000",
  "$5,000+",
  "Not sure yet",
] as const;
