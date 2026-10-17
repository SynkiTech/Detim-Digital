import type { HeroContent } from "../types";

/** Hero copy for the Grants & Business Consultations site (Master Prompt §7.1). */
export const grantsHero: HeroContent = {
  headlineSegments: [
    { text: "From vision to " },
    { text: "funded.", accent: true },
  ],
  subHeading:
    "Applications funders say yes to, budgets that add up, and business plans you can actually run.",
  chips: ["Startups", "Small businesses", "Nonprofits"],
  portrait: "/images/oluwadetimi-ajayi-portrait.jpg",
  ctas: {
    hire: { label: "Hire me", href: "/grants-consulting/book" },
    work: { label: "See my work", href: "#results" },
    cv: {
      label: "Download my CV",
      href: "/resumes/Oluwadetimi-Ajayi-Grant-Writer-Resume.pdf",
    },
  },
};
