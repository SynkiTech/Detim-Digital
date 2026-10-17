"use client";

import { useEffect, useRef, useState } from "react";
import { InlineWidget } from "react-calendly";
import { getCalendlyUrl, SITE_CONFIG, type SiteKey } from "@/lib/site-config";
import { site } from "@/content/site";

/**
 * Calendly inline widget with per-site page settings and a skeleton
 * loader (Master Prompt §10). The widget's own load event is internal,
 * so we watch for its iframe and hide the skeleton once it fires load.
 */
export function CalendlyInline({
  siteKey,
  className,
}: {
  siteKey: SiteKey;
  className?: string;
}) {
  const cfg = SITE_CONFIG[siteKey];
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let observer: MutationObserver | null = null;
    const attach = (iframe: HTMLIFrameElement) => {
      const done = () => setLoaded(true);
      if (iframe.contentWindow?.length !== undefined) {
        // Fire early for cached iframes that load before we attach.
        try {
          if (iframe.contentDocument?.readyState === "complete") done();
        } catch {
          /* cross-origin — wait for the load event */
        }
      }
      iframe.addEventListener("load", done);
    };

    const existing = container.querySelector("iframe");
    if (existing) {
      attach(existing as HTMLIFrameElement);
    } else {
      observer = new MutationObserver(() => {
        const iframe = container.querySelector("iframe");
        if (iframe) {
          observer?.disconnect();
          attach(iframe as HTMLIFrameElement);
        }
      });
      observer.observe(container, { childList: true, subtree: true });
    }

    const fallbackTimer = setTimeout(() => {
      if (!loaded) setFailed(true);
    }, 9000);

    return () => {
      observer?.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [loaded]);

  return (
    <div ref={containerRef} className={className}>
      {!loaded ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex flex-col gap-4 p-6 sm:p-10"
        >
          <div className="h-7 w-56 animate-pulse rounded-full bg-paper/10" />
          <div className="h-4 w-72 animate-pulse rounded-full bg-paper/10" />
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-20 animate-pulse rounded-2xl border border-paper/10 bg-paper/5"
                style={{ animationDelay: `${i * 120}ms` }}
              />
            ))}
          </div>
        </div>
      ) : null}

      <InlineWidget
        url={process.env.NEXT_PUBLIC_CALENDLY_URL || site.calendly}
        pageSettings={{
          backgroundColor: "0a0a0a",
          textColor: "ffffff",
          primaryColor: cfg.accent.replace("#", ""),
          hideEventTypeDetails: true,
          hideLandingPageDetails: true,
          hideGdprBanner: true,
        }}
        utm={{ utmSource: cfg.utmSource }}
        styles={{
          width: "100%",
          height: "100%",
          visibility: loaded ? "visible" : "hidden",
        }}
      />

      {failed || loaded ? (
        <a
          href={getCalendlyUrl(cfg)}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 left-1/2 z-10 w-max max-w-[calc(100%-2rem)] -translate-x-1/2 rounded-full border border-paper/20 bg-ink px-5 py-2 text-center font-mono text-xs text-paper/80 transition-colors after:absolute after:inset-[-0.875rem] after:rounded-full after:content-[''] hover:border-accent hover:text-accent"
        >
          Open Calendly in a new tab
        </a>
      ) : null}
    </div>
  );
}
