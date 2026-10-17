"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Monogram } from "@/components/shared/Logo";

type TransitionFn = (href: string, shade?: string) => void;

const RouteTransitionContext = createContext<TransitionFn>(() => {});

/** Triggers a cinematic wipe, then navigates. */
export function useRouteTransition(): TransitionFn {
  return useContext(RouteTransitionContext);
}

const WIPE_MS = 520;

/**
 * Cinematic route transition (Master Prompt §5.4 / §10): an orange
 * panel in the destination site's shade wipes across, the route
 * prefetches and pushes behind it, then the panel slides away.
 * Instant under reduced motion.
 */
export function RouteTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [wipe, setWipe] = useState<{
    href: string;
    shade: string;
    /** Path where the wipe started — guards against stale overlays. */
    from: string;
  } | null>(null);
  const pushedRef = useRef(false);

  const transitionTo = useCallback<TransitionFn>(
    (href, shade) => {
      if (href === pathname || href.startsWith("#")) return;
      if (reduce) {
        router.push(href);
        return;
      }
      pushedRef.current = false;
      setWipe({ href, shade: shade ?? "var(--accent)", from: pathname });
    },
    [pathname, reduce, router]
  );

  // Cover → navigate.
  useEffect(() => {
    if (!wipe || pushedRef.current) return;
    const t = setTimeout(() => {
      pushedRef.current = true;
      router.push(wipe.href);
    }, WIPE_MS);
    return () => clearTimeout(t);
  }, [wipe, router]);

  // New route mounted → reveal it. Derived: the overlay shows only while
  // we are still on the path where the wipe began and have not yet arrived.
  // (Any other navigation invalidates the wipe, so it never gets stuck.)
  const activeWipe =
    wipe && pathname === wipe.from && pathname !== wipe.href ? wipe : null;

  return (
    <RouteTransitionContext.Provider value={transitionTo}>
      {children}
      <AnimatePresence>
        {activeWipe ? (
          <motion.div
            key="route-wipe"
            aria-hidden="true"
            className="fixed inset-0 z-[92] grid place-items-center"
            style={{ background: activeWipe.shade }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: WIPE_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
          >
            <span className="grid size-16 place-items-center rounded-2xl bg-ink/85 ring-1 ring-black/20">
              <Monogram className="size-8 text-accent" />
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </RouteTransitionContext.Provider>
  );
}

type TransitionLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Overlay colour, e.g. the destination site's orange. */
  shade?: string;
  ariaLabel?: string;
  onNavigate?: () => void;
};

/**
 * Link that plays the cinematic wipe before navigating. Prefetches on
 * hover/viewport like a normal Next.js link.
 */
export function TransitionLink({
  href,
  children,
  className,
  shade,
  ariaLabel,
  onNavigate,
}: TransitionLinkProps) {
  const transitionTo = useRouteTransition();

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        onNavigate?.();
        transitionTo(href, shade);
      }}
    >
      {children}
    </Link>
  );
}
