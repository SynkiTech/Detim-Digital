import type { ProblemsContent } from "../types";

/** "Sound familiar?" problem cards (Master Prompt §7.3). */
export const grantsProblems: ProblemsContent = {
  items: [
    { id: "qualify", quote: "You found a grant but you're not sure you qualify." },
    { id: "rejected", quote: "Your last application was rejected, with little explanation." },
    { id: "budget", quote: "The budget requirements are confusing and the deadline is close." },
    { id: "plan", quote: "You have a strong idea but no plan a funder or investor would take seriously." },
    { id: "time", quote: "You don't have the time to write it all yourself." },
  ],
  closingLine: "You don't have to do this alone. Here's how I help.",
};
