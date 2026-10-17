"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

type ClockProps = {
  showOfficePill?: boolean;
  className?: string;
};

const TIME_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  timeZone: site.timezone,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

const PARTS_FORMATTER = new Intl.DateTimeFormat("en-US", {
  timeZone: site.timezone,
  weekday: "short",
  hour: "numeric",
  hour12: false,
});

function isOfficeHours(date: Date): boolean {
  const parts = PARTS_FORMATTER.formatToParts(date);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const hour = parseInt(
    parts.find((p) => p.type === "hour")?.value ?? "0",
    10
  );
  const inWeek = weekday !== "Sat" && weekday !== "Sun";
  return inWeek && hour >= 9 && hour < 18;
}

/**
 * Live Lagos clock + office-hours pill (Master Prompt §10):
 * Mon–Fri 9:00–18:00 WAT → "Replying today", otherwise
 * "I'll reply next working day".
 */
export function Clock({ showOfficePill = true, className }: ClockProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // First read + 1s subscription. State updates happen inside the
    // timer/rAF callbacks, never synchronously in the effect body.
    const raf = requestAnimationFrame(() => setNow(new Date()));
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);

  const time = now ? TIME_FORMATTER.format(now) : "--:--:--";
  const inOffice = now ? isOfficeHours(now) : false;

  return (
    <span className={cn("inline-flex flex-wrap items-center gap-x-3 gap-y-1", className)}>
      <span className="tabular-nums">{time} WAT</span>
      {showOfficePill ? (
        <span className="inline-flex items-center gap-1.5">
          {inOffice ? (
            <>
              <span aria-hidden="true">🟢</span> Replying today
            </>
          ) : (
            <>
              <span aria-hidden="true">⚪</span> I&apos;ll reply next working day
            </>
          )}
        </span>
      ) : null}
    </span>
  );
}
