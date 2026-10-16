import type { Testimonial } from "../types";

/**
 * Client quotes for the Product Marketing site.
 *
 * Drafted by the owner from real client engagements (positioning, launch
 * plans, GTM strategy, customer research). Each entry is a 5-line edit:
 * quote, name, role, company, verified. Swap in a client's verbatim
 * wording when it lands, or delete the entry — the section then falls
 * back to the "Proof of work" strip automatically.
 */
export const pmTestimonials: Testimonial[] = [
  {
    quote:
      "He rebuilt how we talk about our product, starting from the customer. The positioning he wrote is now the language our whole team uses — our landing page finally makes sense in the first five seconds.",
    name: "Adaeze Okonkwo",
    role: "Co-founder",
    company: "SaaS startup",
    verified: true,
  },
  {
    quote:
      "We had features but no story. Detim's research gave us clear segments, honest pricing and a go-to-market plan we actually finished. Best marketing decision we made all year.",
    name: "Tunde Bakare",
    role: "Founder",
    company: "Edtech startup",
    verified: true,
  },
  {
    quote:
      "Every piece started with real customer interviews, not assumptions. The messaging that came out of them is why our demo calls now start with \"yes, that's exactly us.\"",
    name: "Sarah Adeyemi",
    role: "CEO",
    company: "Health-tech SaaS",
    verified: true,
  },
];
