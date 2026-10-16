import type { HeroContent } from "../types";

/** Hero copy for the Product Marketing site (Master Prompt §6.1). */
export const pmHero: HeroContent = {
  headlineSegments: [
    { text: "I help tech, SaaS and AI businesses like yours take their products " },
    { text: "from idea to a widely adopted market product", accent: true },
    { text: ", and keep setting the pace in the market." },
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
