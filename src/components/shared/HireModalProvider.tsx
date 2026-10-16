"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { CalendlyModal } from "@/components/shared/CalendlyModal";
import type { SiteKey } from "@/lib/site-config";

type HireModalContextValue = {
  open: () => void;
  close: () => void;
};

const HireModalContext = createContext<HireModalContextValue | null>(null);

export function useHireModal(): HireModalContextValue {
  const ctx = useContext(HireModalContext);
  if (!ctx) {
    throw new Error("useHireModal must be used inside <HireModalProvider>");
  }
  return ctx;
}

/**
 * Provides the shared, branded Calendly modal for one skill site
 * (or Home). Every HireButton under this provider opens the same
 * modal, styled with that site's theme.
 */
export function HireModalProvider({
  siteKey,
  children,
}: {
  siteKey: SiteKey;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const value = useMemo(
    () => ({ open: () => setOpen(true), close: () => setOpen(false) }),
    []
  );

  return (
    <HireModalContext.Provider value={value}>
      {children}
      <CalendlyModal siteKey={siteKey} open={open} onClose={value.close} />
    </HireModalContext.Provider>
  );
}
