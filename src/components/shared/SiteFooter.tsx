import { Linkedin, Mail, MessageCircle } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Clock } from "@/components/shared/Clock";
import { AvailabilityBadge } from "@/components/shared/AvailabilityBadge";
import { HomeLink } from "@/components/shared/HomeLink";
import { site } from "@/content/site";

/**
 * Neutral skill-site footer (Master Prompt §6.12 / §7.13): logo,
 * availability badge, live Lagos time, email, WhatsApp, LinkedIn,
 * "← Home" and the © line. Nothing about the other skill.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Logo variant="dark" />
          <AvailabilityBadge className="font-mono text-xs" />
          <Clock className="font-mono text-xs text-paper/70" />
          <span className="flex-1" aria-hidden="true" />
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${site.email}`}
              aria-label={`Email ${site.person}`}
              className="text-paper/70 transition-colors hover:text-accent"
            >
              <Mail className="size-4" aria-hidden="true" />
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-paper/70 transition-colors hover:text-accent"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-paper/70 transition-colors hover:text-accent"
            >
              <Linkedin className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-6">
          <p className="font-mono text-xs text-paper/40">{site.ui.copyright}</p>
          <HomeLink variant="quiet" />
        </div>
      </div>
    </footer>
  );
}
