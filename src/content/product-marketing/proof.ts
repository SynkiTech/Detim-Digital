import type { ProofTile } from "@/components/shared/TestimonialsSection";

/**
 * "Proof of work" tiles — the four experience highlights, shown while
 * no verified testimonials exist yet (Master Prompt §9).
 */
export const pmProofFallback: {
  title: string;
  sub: string;
  tiles: ProofTile[];
} = {
  title: "Proof of work",
  sub: "Real projects, honestly described — the portfolio folder has the details.",
  tiles: [
    {
      value: "Positioning that lands",
      label: "Wrote the positioning and landing page copy that helped an early-stage software product explain itself clearly.",
    },
    {
      value: "Launches with a plan",
      label: "Built go-to-market strategies for startups across tech, health, education and sustainability.",
    },
    {
      value: "Real users, real answers",
      label: "Turned customer interviews into ideal customer profiles and sharper messaging.",
    },
    {
      value: "Stand-out analysis",
      label: "Compared two leading fintech apps feature by feature to show where each can win.",
    },
  ],
};
