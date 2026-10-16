import type { ProcessContent } from "../types";

/** "How I work" steps (Master Prompt §7.9). */
export const grantsProcess: ProcessContent = {
  steps: [
    {
      id: "discover",
      title: "Discover",
      description:
        "We talk through your work, your goals and the funding or plan you need to move forward.",
    },
    {
      id: "match",
      title: "Match",
      description:
        "I research and shortlist the funders (or the plan structure) that actually fit you.",
    },
    {
      id: "write",
      title: "Write",
      description:
        "Narratives, budgets and justifications are built around what the funder is looking for.",
    },
    {
      id: "review",
      title: "Review",
      description:
        "Your draft is scored against the funder's own criteria and strengthened before submission.",
    },
    {
      id: "submit-follow-through",
      title: "Submit & follow through",
      description:
        "We submit with confidence. If you win, I help you track results and report clearly.",
    },
  ],
};
