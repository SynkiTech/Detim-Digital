"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useHireModal } from "@/components/shared/HireModalProvider";

/**
 * Floating "Hire me" button on mobile after the hero (Master Prompt §10.4).
 * Hidden on /book pages where booking is already the focus.
 * z-[45]: above page content, but BELOW the mobile full-screen menu
 * (z-50) so it can never block the menu's bottom Home / CV row.
 */
export function FloatingHire() {
  const { open } = useHireModal();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          key="floating-hire"
          type="button"
          onClick={open}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-5 right-5 z-[45] inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-display text-sm font-bold text-accent-foreground shadow-[0_10px_40px_rgba(242,92,5,0.4)] md:hidden"
        >
          Hire me
          <ArrowRight className="size-4" aria-hidden="true" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
