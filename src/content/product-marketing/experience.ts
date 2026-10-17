import type { ExperienceItem } from "../types";

/**
 * Experience cards (Master Prompt §6.5). Render only `displayTitle` /
 * `displayName` so neutral names are shown where the raw title would
 * need it. Portfolio projects are labelled honestly.
 */
export const pmExperience: ExperienceItem[] = [
  {
    id: "pryce",
    displayTitle: "Product Marketing Manager & Strategist",
    displayName: "Pryce (Synkitech)",
    dates: "2026",
    summary:
      "Helped an early-stage software and automation product explain itself clearly and prepare to launch.",
    did: [
      "Wrote the positioning and landing page copy",
      "Built the launch plan",
      "Set up Meta ad campaigns",
      "Ran customer interviews",
      "Contributed pricing inputs",
    ],
  },
  {
    id: "zenith-gtm",
    displayTitle: "Go-to-Market Strategy Developer",
    displayName: "Zenith",
    dates: "2023 to present",
    summary:
      "Helped startups in tech, health, education and sustainability decide who to sell to, what to promise and how to launch.",
    did: [
      "Sized markets",
      "Segmented customers",
      "Audited competitors' features",
      "Built go-to-market strategies covering value propositions, channels, pricing and measurable launch milestones",
    ],
  },
  {
    id: "japalearn",
    displayTitle: "Go-to-Market & Positioning",
    displayName: "JapaLearn",
    dates: "2025",
    tag: "Portfolio project",
    summary: "A hands-on positioning project for a language-learning web app.",
    did: [
      "Talked to real users",
      "Built ideal customer profiles and personas",
      "Reviewed the web app's messaging",
      "Mapped first target segments",
      "Built Meta ad sets aligned to the positioning",
    ],
  },
  {
    id: "opay-moniepoint",
    displayTitle: "Competitor Analysis",
    displayName: "OPay vs. Moniepoint",
    dates: "2025",
    tag: "Portfolio project",
    summary: "A comparison of two leading fintech apps.",
    did: [
      "Compared the user experience, features and marketing of both apps",
      "Showed where each can stand out",
    ],
  },
];
