import type { Metadata } from "next";
import { SiteNav } from "@/components/shared/SiteNav";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { HireModalProvider } from "@/components/shared/HireModalProvider";
import { FloatingHire } from "@/components/shared/FloatingHire";
import { pmMeta } from "@/content/product-marketing/meta";
import { pmServices } from "@/content/product-marketing/services";
import {
  personJsonLd,
  professionalServiceJsonLd,
} from "@/lib/jsonld";

/**
 * Product Marketing site layout — "Ember" theme (Master Prompt §6).
 * This site is exclusive to the product marketing skill; the layout owns
 * the theme scope, sticky nav and neutral footer.
 */
const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#experience", label: "Experience" },
  { href: "#results", label: "Results" },
  { href: "#portfolio", label: "Portfolio" },
];

export const metadata: Metadata = {
  title: pmMeta.title,
  description: pmMeta.description,
  alternates: { canonical: "/product-marketing" },
  openGraph: {
    title: pmMeta.title,
    description: pmMeta.description,
    url: "/product-marketing",
    siteName: "Detim Digital",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pmMeta.title,
    description: pmMeta.description,
  },
};

export default function ProductMarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = [
    personJsonLd(),
    professionalServiceJsonLd(
      "Product Marketing, Oluwadetimi Ajayi",
      pmMeta.description,
      "/product-marketing",
      pmServices.map((s) => s.title)
    ),
  ];

  return (
    <HireModalProvider siteKey="pmm">
      <div className="theme-pmm min-h-screen bg-ink text-paper">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteNav
          label={pmMeta.label}
          links={NAV_LINKS}
          cvHref={pmMeta.cvPath}
        />

        {children}

        <SiteFooter />
        <FloatingHire />
      </div>
    </HireModalProvider>
  );
}
