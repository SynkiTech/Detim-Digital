import type { ProblemsContent } from "../types";

/** "Sound familiar?" problem cards (Master Prompt §6.3). */
export const pmProblems: ProblemsContent = {
  items: [
    { id: "clarity", quote: "People visit your product and can't tell what it does in five seconds." },
    { id: "buzz", quote: "You're building fast, but nobody outside your team is talking about it." },
    { id: "plan", quote: "Your launch plan is a list of ideas, not a plan." },
    { id: "competitors", quote: "Competitors say the same things you do, and win the deal." },
    { id: "ads", quote: "You're paying for ads and you're not sure who is really responding." },
  ],
  closingLine: "These are fixable. Here's how I fix them.",
};
