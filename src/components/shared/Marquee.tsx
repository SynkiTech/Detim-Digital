import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  className?: string;
  /** Slower strips for long item lists. */
  slow?: boolean;
};

function MarqueeRow({ items, hidden }: { items: string[]; hidden: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-10 pr-10"
    >
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-10 font-display text-base font-bold uppercase tracking-widest sm:text-lg"
        >
          {item}
          <span
            aria-hidden="true"
            className="size-2 shrink-0 rounded-full bg-current opacity-40"
          />
        </li>
      ))}
    </ul>
  );
}

/**
 * Infinite marquee strip (Master Prompt §10).
 * Pure CSS animation; pauses on hover; static under reduced motion.
 */
export function Marquee({ items, className, slow = false }: MarqueeProps) {
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden py-5 select-none",
        className
      )}
    >
      <div
        className={cn(
          "flex w-max group-hover:[animation-play-state:paused]",
          slow ? "animate-marquee-slow" : "animate-marquee",
          "motion-reduce:animate-none"
        )}
      >
        <MarqueeRow items={items} hidden={false} />
        <MarqueeRow items={items} hidden={true} />
      </div>
    </div>
  );
}
