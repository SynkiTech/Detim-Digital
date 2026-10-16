import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Detim Digital logo (Master Prompt §3).
 * Inline SVG "D" monogram in orange inside a black rounded square,
 * plus the wordmark: "Detim" (Bricolage, heavy) + "Digital" (Inter, light).
 * The wordmark inherits the surrounding text colour; pass variant
 * according to the surface the logo sits on.
 */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M20 12h13.5C45.6 12 52.5 19.8 52.5 32S45.6 52 33.5 52H20V12Zm9 8.5v23h4.2c6.9 0 10.5-4.1 10.5-11.5S39.9 20.5 33 20.5H29Z"
      />
    </svg>
  );
}

type LogoProps = {
  /** The surface the logo sits on: "dark" (black bg) or "light" (white bg). */
  variant?: "dark" | "light";
  href?: string;
  withWordmark?: boolean;
  className?: string;
};

export function Logo({
  variant = "light",
  href = "/",
  withWordmark = true,
  className,
}: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="Detim Digital — home"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span
        aria-hidden="true"
        className={cn(
          "grid size-9 shrink-0 place-items-center rounded-xl bg-ink text-accent transition-transform duration-300 group-hover:scale-105",
          variant === "dark" && "ring-1 ring-white/15"
        )}
      >
        <Monogram className="size-5" />
      </span>
      {withWordmark ? (
        <span className="text-lg leading-none tracking-tight">
          <span className="font-display font-bold">Detim</span>{" "}
          <span className="font-sans font-light opacity-70">Digital</span>
        </span>
      ) : null}
    </Link>
  );
}
