import { FolderOpen, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/Reveal";

type PortfolioCardsProps = {
  driveUrl: string;
  driveLabel: string;
  cvPath: string;
  cvLabel: string;
  cvSize: string;
  tone?: "light" | "dark";
};

/**
 * Portfolio & CV cards (Master Prompt §6.10 / §7.11): the site's own
 * Drive folder and its own CV download with the file size shown.
 */
export function PortfolioCards({
  driveUrl,
  driveLabel,
  cvPath,
  cvLabel,
  cvSize,
  tone = "light",
}: PortfolioCardsProps) {
  const light = tone === "light";

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Reveal>
        <a
          href={driveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group flex h-full flex-col justify-between gap-6 rounded-3xl border p-7 transition-colors duration-300 sm:p-8",
            light
              ? "border-ink/10 bg-paper shadow-sm hover:border-accent/50"
              : "border-paper/10 bg-ink-2/70 hover:border-accent/50"
          )}
        >
          <span
            aria-hidden="true"
            className="grid size-12 place-items-center rounded-2xl bg-accent/15 text-accent"
          >
            <FolderOpen className="size-6" />
          </span>
          <span>
            <span
              className={cn(
                "block font-display text-xl font-bold sm:text-2xl",
                light ? "text-ink" : "text-paper"
              )}
            >
              {driveLabel}
            </span>
            <span
              className={cn(
                "mt-1.5 block text-sm",
                light ? "text-ink/60" : "text-paper/60"
              )}
            >
              Opens in a new tab. Real work, real outcomes.
            </span>
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            Open the folder
            <span
              aria-hidden="true"
              className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </a>
      </Reveal>

      <Reveal delay={0.08}>
        <a
          href={cvPath}
          download
          className={cn(
            "group flex h-full flex-col justify-between gap-6 rounded-3xl border p-7 transition-colors duration-300 sm:p-8",
            light
              ? "border-ink/10 bg-paper shadow-sm hover:border-accent/50"
              : "border-paper/10 bg-ink-2/70 hover:border-accent/50"
          )}
        >
          <span
            aria-hidden="true"
            className="grid size-12 place-items-center rounded-2xl bg-accent/15 text-accent"
          >
            <Download className="size-6" />
          </span>
          <span>
            <span
              className={cn(
                "block font-display text-xl font-bold sm:text-2xl",
                light ? "text-ink" : "text-paper"
              )}
            >
              {cvLabel}
            </span>
            <span
              className={cn(
                "mt-1.5 block text-sm",
                light ? "text-ink/60" : "text-paper/60"
              )}
            >
              PDF · {cvSize}
            </span>
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            Download
            <span
              aria-hidden="true"
              className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              ↓
            </span>
          </span>
        </a>
      </Reveal>
    </div>
  );
}
