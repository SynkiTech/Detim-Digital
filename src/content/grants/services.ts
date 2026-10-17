import type { ServiceItem } from "../types";

/** The eight service cards (Master Prompt §7.4). Trademark wording stays
 * neutral and never implies legal advice. */
export const grantsServices: ServiceItem[] = [
  {
    id: "grant-research",
    title: "Grant research",
    problem: "Not knowing which funding fits you.",
    youGet:
      "A shortlist of funders whose priorities match your work, with deadlines and fit notes.",
  },
  {
    id: "proposal-development",
    title: "Proposal development",
    problem: "A blank page and a tight deadline.",
    youGet:
      "A complete, persuasive application written around what the funder is looking for.",
  },
  {
    id: "budget-making",
    title: "Budget making",
    problem: "Numbers that don't add up or don't match the plan.",
    youGet: "A clear, defensible budget with the justification funders expect.",
  },
  {
    id: "grant-review",
    title: "Grant review",
    problem: "Not knowing if your draft is strong enough.",
    youGet:
      "Your draft scored against the funder's own criteria, with specific fixes before you submit.",
  },
  {
    id: "monitoring-reporting",
    title: "Monitoring & reporting",
    problem: "Winning the grant, then struggling to track results and report.",
    youGet:
      "Simple tracking of your outcomes and clear reports that keep funders confident.",
  },
  {
    id: "market-research",
    title: "Market research",
    problem: "Guessing how big the need or opportunity is.",
    youGet:
      "Evidence about your market and customers to back up your plans and applications.",
  },
  {
    id: "business-plan",
    title: "Business plan",
    problem: "An idea without a roadmap.",
    youGet:
      "A complete, realistic plan covering your market, customers, strengths and weaknesses, and goals you can measure.",
  },
  {
    id: "trademark-search",
    title: "Trademark search",
    problem: "Investing in a name or logo that someone already owns.",
    youGet:
      "A check on whether your name or logo is available before you build on it.",
  },
];
