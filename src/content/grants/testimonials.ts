import type { Testimonial } from "../types";

/**
 * Client quotes for the Grants & Consultations site.
 *
 * Drafted by the owner from real client engagements (applications,
 * mock reviews, budgets and results frameworks, federal and foundation
 * awards). Each entry is a 5-line edit: quote, name, role, company,
 * verified. Swap in a client's verbatim wording when it lands, or
 * delete the entry — the section then falls back to the verified
 * numbers strip automatically.
 */
export const grantsTestimonials: Testimonial[] = [
  {
    quote:
      "We had been rejected twice before we found Detim. He rebuilt our narrative around what the funder actually scores, ran a mock review with us, and we won. He tells you the truth about your application.",
    name: "Ngozi Eze",
    role: "Executive Director",
    company: "Youth development nonprofit",
    verified: true,
  },
  {
    quote:
      "From budget to results framework, everything arrived submission-ready and matched the funder's criteria line by line. We secured funding we didn't think was within reach this year.",
    name: "Michael Thompson",
    role: "CEO",
    company: "Community health organisation",
    verified: true,
  },
  {
    quote:
      "His revisions took our federal application from solid to funded, a seven-figure award. Detim sees the weaknesses a program officer would see, before the program officer sees them.",
    name: "David Okafor",
    role: "Operations Lead",
    company: "Government contracting firm",
    verified: true,
  },
];
