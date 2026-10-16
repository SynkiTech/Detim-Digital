import type { HeroContent } from "../types";

/** Hero copy for the Product Marketing site (Master Prompt §6.1). */
export const pmHero: HeroContent = {
  headlineSegments: [
    { text: "From idea to " },
    { text: "adopted.", accent: true },
  ],
  subHeading:
    "Clear positioning, a launch plan that works, and messages your customers actually respond to.",
  chips: ["Tech", "SaaS", "AI"],
  portrait: "/images/oluwadetimi-ajayi-portrait.jpg",
  ctas: {
    hire: { label: "Hire me", href: "/product-marketing/book" },
    work: { label: "See my work", href: "#services" },
    cv: {
      label: "Download my CV",
      href: "/resumes/Oluwadetimi-Ajayi-Product-Marketing-Manager-CV.pdf",
    },
  },
};
