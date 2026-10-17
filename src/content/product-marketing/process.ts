import type { ProcessContent } from "../types";

/** "How I work" steps (Master Prompt §6.8). */
export const pmProcess: ProcessContent = {
  steps: [
    {
      id: "understand",
      title: "Understand",
      description:
        "We start with your product, your customers and what's actually blocking growth right now.",
    },
    {
      id: "position",
      title: "Position",
      description:
        "We sharpen the promise: who it's for, why it's different and the words that say it clearly.",
    },
    {
      id: "plan",
      title: "Plan",
      description:
        "You get a launch plan with audiences, channels, pricing inputs and milestones that prove progress.",
    },
    {
      id: "launch-learn",
      title: "Launch & learn",
      description:
        "We take it to market, watch what responds and adjust so momentum keeps building.",
    },
  ],
};
