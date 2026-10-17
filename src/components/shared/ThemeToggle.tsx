"use client";

import { useCallback, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export const MODE_STORAGE_KEY = "dd-mode";

export type Mode = "day" | "night";

const MODE_EVENT = "dd-mode-change";

/** Reads the mode straight from the document root (source of truth). */
function getModeSnapshot(): Mode {
  return document.documentElement.dataset.mode === "day" ? "day" : "night";
}

/** Server render (and hydration pass) always paints night, the default. */
function getServerMode(): Mode {
  return "night";
}

/**
 * The document root's data-mode attribute is an external store here, so
 * every mounted toggle (nav pill, mobile menu, Home) stays in sync and
 * hydration never mismatches, whatever the pre-paint script restored.
 */
function subscribeToMode(onChange: () => void) {
  window.addEventListener(MODE_EVENT, onChange);
  return () => window.removeEventListener(MODE_EVENT, onChange);
}

function publishMode(mode: Mode) {
  document.documentElement.dataset.mode = mode;
  window.dispatchEvent(new Event(MODE_EVENT));
  try {
    localStorage.setItem(MODE_STORAGE_KEY, mode);
  } catch {
    /* storage unavailable, the toggle still works for this visit */
  }
}

type ThemeToggleProps = {
  className?: string;
};

/**
 * Day / night switch. Night is the authored default; day flips the
 * ink/paper token axes (globals.css). The choice persists in
 * localStorage and is restored before paint by the inline script in
 * the root layout, so there is no flash of the wrong mode.
 * Like the reference site, the button shows the mode you will switch
 * to: a sun while in night, a moon while in day.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const mode = useSyncExternalStore(
    subscribeToMode,
    getModeSnapshot,
    getServerMode
  );
  const reduce = useReducedMotion();

  const toggle = useCallback(() => {
    publishMode(getModeSnapshot() === "day" ? "night" : "day");
  }, []);

  const isDay = mode === "day";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDay ? "Switch to night mode" : "Switch to day mode"}
      aria-pressed={isDay}
      title={isDay ? "Night mode" : "Day mode"}
      className={cn(
        // .hit-sm: the 36px control gets a 44px touch target. overflow-hidden
        // is intentionally absent — it would clip the expanded hit zone, and
        // the icon swap never paints outside the circle anyway.
        "hit-sm relative grid size-9 shrink-0 place-items-center rounded-full border border-paper/15 text-paper transition-colors duration-300 hover:border-accent hover:text-accent",
        className
      )}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={mode}
          initial={reduce ? { opacity: 0 } : { opacity: 0, rotate: -90, scale: 0.5 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, rotate: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="grid place-items-center"
        >
          {isDay ? (
            <Moon className="size-4" aria-hidden="true" />
          ) : (
            <Sun className="size-4" aria-hidden="true" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
