import { makeOgImage } from "@/lib/og-image";
import { home } from "@/content/home";

/** Home OG image — both skills, Home orange. */
export const alt = "Detim Digital — Oluwadetimi Ajayi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return makeOgImage({
    accent: "#F25C05",
    label: "Product Marketing · Grants & Consultations",
    title: "Hi, I'm Oluwadetimi Ajayi.",
    sub: home.subHeading,
  });
}
