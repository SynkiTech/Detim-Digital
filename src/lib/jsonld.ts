import { site } from "@/content/site";

/**
 * Per-site JSON-LD (Master Prompt §11.7): each skill site gets a
 * Person + ProfessionalService that mention ONLY its own services.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.person,
    url: SITE_URL,
    email: `mailto:${site.email}`,
    telephone: site.phone,
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "NG",
      },
    },
    worksFor: {
      "@type": "Organization",
      name: site.name,
      url: SITE_URL,
    },
  };
}

export function professionalServiceJsonLd(
  name: string,
  description: string,
  path: string,
  serviceTypeNames: string[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name,
    description,
    url: `${SITE_URL}${path}`,
    areaServed: "Worldwide",
    founder: {
      "@type": "Person",
      name: site.person,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name,
      itemListElement: serviceTypeNames.map((serviceName) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: serviceName,
        },
      })),
    },
  };
}
