import type { FaqItem } from "../types";

/** Customer-voice questions (Master Prompt §6.11). Pricing = custom, shared after a short call. */
export const pmFaq: FaqItem[] = [
  {
    id: "start",
    question: "How do we start?",
    answer:
      "Send a brief or book a 30-minute call. We talk through where your product is now and what you want to happen next. From that, I'll suggest the smallest piece of work that gets you a real result, and we go from there.",
  },
  {
    id: "timeline",
    question: "How long does a project take?",
    answer:
      "It depends on the scope. A positioning and messaging project usually takes two to three weeks. A full launch plan takes around four. You'll get a clear timeline with milestones before we start, so you always know what happens when.",
  },
  {
    id: "early-stage",
    question: "Do you work with early-stage teams?",
    answer:
      "Yes — most of my work is with early-stage tech products. Working lean is an advantage here: we can test the message with real customers quickly and adjust before you spend heavily on ads or a big launch.",
  },
  {
    id: "remote",
    question: "Can you work with my team remotely?",
    answer:
      "Yes. I work remotely with teams worldwide. We'll agree on how often we check in, everything lives in shared documents your team can access, and you'll always know what's being worked on.",
  },
  {
    id: "brief",
    question: "What should I send in a brief?",
    answer:
      "Three things: what your product does in a sentence or two, who you're trying to reach, and what you want to change most right now. Anything else — links, metrics, past campaigns — is a bonus, not a requirement.",
  },
  {
    id: "pricing",
    question: "How is pricing decided?",
    answer:
      "Every project is priced per scope, not per hour, so the incentive is on results. After a short call I'll send a fixed quote with what's included. No surprises, no hidden extras.",
  },
];
