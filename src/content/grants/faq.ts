import type { FaqItem } from "../types";

/** Questions (Master Prompt §7.12), including the honest guarantee answer. */
export const grantsFaq: FaqItem[] = [
  {
    id: "guarantee",
    question: "Can you guarantee we'll win?",
    answer:
      "No one can honestly guarantee funding, and I won't pretend otherwise. What I can point to is an 80% award rate across 100+ applications, and a review step where your draft is scored against the funder's own criteria before anything is submitted. That process is why so many applications land.",
  },
  {
    id: "which-grants",
    question: "How do I know which grants fit me?",
    answer:
      "That's the first thing we figure out together. I research funders whose priorities match your work and give you a shortlist with deadlines and honest fit notes, so you don't spend weeks chasing money that was never a match.",
  },
  {
    id: "how-early",
    question: "How early should I start?",
    answer:
      "Earlier than feels comfortable. Strong applications take time: researching the funder, gathering evidence, writing, then reviewing against their criteria. Two to three months before the deadline is ideal; if yours is closer, tell me and we'll plan around it.",
  },
  {
    id: "review-draft",
    question: "Can you review a draft I already wrote?",
    answer:
      "Yes. Grant review is one of my services. You get your draft scored against the funder's own criteria with specific, practical fixes: what to cut, what to evidence and what a reviewer will question.",
  },
  {
    id: "what-you-need",
    question: "What do you need from me?",
    answer:
      "The story only you can tell: what your organisation does, who it serves and what the funding would make possible. Previous applications, budgets or reports help if you have them. I handle the research, structure and writing from there.",
  },
  {
    id: "pricing",
    question: "How is pricing decided?",
    answer:
      "Every project is quoted per scope after a short call. Research, writing, review and reporting support are all different shapes of work. You'll get a fixed quote before we start, so there are never surprises.",
  },
  {
    id: "after-win",
    question: "Do you help after we win?",
    answer:
      "Yes. Monitoring and reporting support keeps funders confident: simple tracking of your outcomes and clear reports, written the way funders expect to read them.",
  },
];
