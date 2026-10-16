import type { ExperienceItem } from "../types";

/**
 * Experience cards (Master Prompt §7.6). Render only `displayTitle` /
 * `displayName`. Confidential partner firms are never named.
 */
export const grantsExperience: ExperienceItem[] = [
  {
    id: "zenith-director",
    displayTitle: "Director of Grant Writing",
    displayName: "Zenith Grant Consults",
    dates: "2023 to present",
    summary:
      "Leads research, interviews and writing for a consulting firm's funding applications.",
    did: [
      "Researched funder priorities",
      "Interviewed clients to find their strongest story",
      "Wrote, edited and reviewed 100+ applications for requests from $5K to $1M+",
      "Built narratives, budgets, justifications and results frameworks",
      "Ran mock reviews scored against agency criteria",
      "Mentors junior writers",
    ],
  },
  {
    id: "partner-firms",
    displayTitle: "Contract Grant Writer & Reviewer",
    displayName: "Confidential partner firms",
    dates: "2024 to present",
    summary:
      "Works behind the scenes for consultants, firms and government contractors.",
    did: [
      "Delivered applications to federal, foundation and corporate programmes under partner brands",
      "Reviewed drafts and gave practical fixes",
      "Contributed to 60+ applications with an 80% success rate",
    ],
  },
  {
    id: "alpha-grants",
    displayTitle: "Founder & Lead Grant Writer",
    displayName: "Alpha Grants",
    dates: "2025 to present",
    summary:
      "Independent funding support for nonprofits, tech ventures and eco-sustainability initiatives.",
    did: [
      "Wrote clear narratives and results frameworks that match what funders want to fund",
    ],
  },
  {
    id: "zenith-strategy",
    displayTitle: "Business Strategy Developer",
    displayName: "Zenith Grant Consults",
    dates: "2023 to present",
    summary:
      "Helped startups in tech, health, education and sustainability turn ideas into complete business plans.",
    did: [
      "Built full business plans",
      "Sized markets",
      "Grouped customers into clear segments",
      "Ran founder strengths-and-weaknesses sessions",
    ],
  },
];
