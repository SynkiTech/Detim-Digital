import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  /** Serif italic accent line under the title. */
  sub?: string;
  /** "dark" = on black sections, "light" = on white sections. */
  tone?: "dark" | "light";
  className?: string;
  id?: string;
};

/** Consistent section heading: mono eyebrow, huge display title, serif sub. */
export function SectionHeading({
  eyebrow,
  title,
  sub,
  tone = "dark",
  className,
  id,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      <p
        className={cn(
          "flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em]",
          tone === "dark" ? "text-accent" : "text-accent-deep"
        )}
      >
        <span aria-hidden="true" className="h-px w-7 shrink-0 bg-current" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={cn(
          "mt-4 font-display text-3xl font-bold leading-[1.08] tracking-tight text-balance sm:text-4xl lg:text-5xl",
          tone === "dark" ? "text-paper" : "text-ink"
        )}
      >
        {title}
      </h2>
      {sub ? (
        <p
          className={cn(
            "mt-5 max-w-2xl font-serif text-lg italic leading-relaxed text-pretty sm:text-xl",
            tone === "dark" ? "text-paper/70" : "text-ink/70"
          )}
        >
          {sub}
        </p>
      ) : null}
    </Reveal>
  );
}
