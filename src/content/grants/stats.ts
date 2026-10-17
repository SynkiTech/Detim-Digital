import type { StatItem } from "../types";

/**
 * Verified numbers only, count-up on view (Master Prompt §7.5).
 * Figures are kept consistent everywhere: 100+ applications, 80% award
 * rate, 100% client satisfaction, $5K to $1M+, 60+ partner applications.
 */
export const grantsStats: StatItem[] = [
  { id: "applications", value: "100+", label: "Applications written or reviewed" },
  { id: "award-rate", value: "80%", label: "Award rate" },
  { id: "satisfaction", value: "100%", label: "Client satisfaction" },
  { id: "requests", value: "$5K to $1M+", label: "In funding requests handled" },
  { id: "partner", value: "60+", label: "Applications supported through partner firms" },
];
