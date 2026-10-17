import { site } from "@/content/site";

/**
 * Per-site JSON-LD (Master Prompt §11.7): each skill site gets a
 * Person + ProfessionalService that mention ONLY its own services.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/**
 * Serialise structured data for safe embedding in a <script> tag:
 * escapes "<" so a "</script>" sequence (or any tag) inside a content
 * string can never break out of the JSON-LD block, and the U+2028 /
 * U+2029 line separators which are valid JSON but not valid JS.
 */
export function safeJsonLd(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

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
