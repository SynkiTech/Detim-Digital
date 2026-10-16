import type { ServiceItem } from "@/content/types";
import { Reveal } from "@/components/shared/Reveal";

/**
 * Service cards (Master Prompt §6.4 / §7.4): plain title, the problem
 * it solves, and what you get — everything in the visitor's language.
 */
export function ServiceCards({ services }: { services: ServiceItem[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, i) => (
        <Reveal
          as="li"
          key={service.id}
          delay={Math.min(i * 0.05, 0.3)}
          className="group flex flex-col rounded-3xl border border-paper/10 bg-ink-2/70 p-6 transition-colors duration-300 hover:border-accent/50"
        >
          <span
            aria-hidden="true"
            className="font-mono text-xs tabular-nums text-accent"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-3 font-display text-xl font-bold leading-snug text-paper">
            {service.title}
          </h3>
          <dl className="mt-4 flex flex-1 flex-col gap-3 text-sm leading-relaxed">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-widest text-paper/50">
                The problem it solves
              </dt>
              <dd className="mt-1 text-paper/80">{service.problem}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-widest text-accent">
                What you get
              </dt>
              <dd className="mt-1 text-paper/90">{service.youGet}</dd>
            </div>
          </dl>
          <span
            aria-hidden="true"
            className="mt-5 h-px w-full bg-paper/10 transition-colors duration-300 group-hover:bg-accent/40"
          />
        </Reveal>
      ))}
    </ul>
  );
}
