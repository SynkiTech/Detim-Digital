import type { Metadata } from "next";
import { SiteNav } from "@/components/shared/SiteNav";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { HireModalProvider } from "@/components/shared/HireModalProvider";
import { FloatingHire } from "@/components/shared/FloatingHire";
import { grantsMeta } from "@/content/grants/meta";
import { grantsServices } from "@/content/grants/services";
import {
  personJsonLd,
  professionalServiceJsonLd,
} from "@/lib/jsonld";

/**
 * Grants & Business Consultations site layout — "Rust" theme (Master
 * Prompt §7). This site is exclusive to the grants & consultations
 * skill; the layout owns the theme scope, sticky nav and neutral footer.
 */
const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#experience", label: "Experience" },
  { href: "#results", label: "Results" },
  { href: "#portfolio", label: "Portfolio" },
];

export const metadata: Metadata = {
  title: grantsMeta.title,
  description: grantsMeta.description,
  alternates: { canonical: "/grants-consulting" },
  openGraph: {
    title: grantsMeta.title,
    description: grantsMeta.description,
    url: "/grants-consulting",
    siteName: "Detim Digital",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: grantsMeta.title,
    description: grantsMeta.description,
  },
};

export default function GrantsConsultingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = [
    personJsonLd(),
    professionalServiceJsonLd(
      "Grants & Business Consultations, Oluwadetimi Ajayi",
      grantsMeta.description,
      "/grants-consulting",
      grantsServices.map((s) => s.title)
    ),
  ];

  return (
    <HireModalProvider siteKey="grants">
      <div className="theme-grants min-h-screen bg-ink text-paper">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteNav
          label={grantsMeta.label}
          links={NAV_LINKS}
          cvHref={grantsMeta.cvPath}
        />

        {children}

        <SiteFooter />
        <FloatingHire />
      </div>
    </HireModalProvider>
  );
}
