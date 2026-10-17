import { cn } from "@/lib/utils";
import { site } from "@/content/site";

type AvailabilityBadgeProps = {
  /** Surface the badge sits on, so borders/dots stay visible. */
  tone?: "onDark" | "onLight";
  className?: string;
};

/** "Available for projects" pill, driven by `site.available` (§10.3). */
export function AvailabilityBadge({
  tone = "onDark",
  className,
}: AvailabilityBadgeProps) {
  if (!site.available) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs",
        tone === "onDark"
          ? "border border-paper/15 bg-paper/5 text-paper/90"
          : "border border-ink/15 bg-ink text-paper",
        className
      )}
    >
      <span aria-hidden="true" className="relative flex size-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
      </span>
      {site.ui.availableLabel}
    </span>
  );
}
