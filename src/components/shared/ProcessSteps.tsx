import type { ProcessContent } from "@/content/types";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/Reveal";

type ProcessStepsProps = {
  process: ProcessContent;
  tone?: "light" | "dark";
};

/**
 * "How I work" steps (Master Prompt §6.8 / §7.9) — numbered flow with
 * connecting rules between the steps.
 */
export function ProcessSteps({ process, tone = "dark" }: ProcessStepsProps) {
  const light = tone === "light";

  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {process.steps.map((step, i) => (
        <Reveal
          as="li"
          key={step.id}
          delay={i * 0.08}
          className={cn(
            "relative flex flex-col gap-3 rounded-3xl border p-6",
            light
              ? "border-ink/10 bg-paper shadow-sm"
              : "border-paper/10 bg-ink-2/70"
          )}
        >
          <span
            aria-hidden="true"
            className="font-display text-4xl font-extrabold tabular-nums text-accent/90"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3
            className={cn(
              "font-display text-xl font-bold",
              light ? "text-ink" : "text-paper"
            )}
          >
            {step.title}
          </h3>
          <p
            className={cn(
              "text-sm leading-relaxed",
              light ? "text-ink/70" : "text-paper/70"
            )}
          >
            {step.description}
          </p>
        </Reveal>
      ))}
    </ol>
  );
}
