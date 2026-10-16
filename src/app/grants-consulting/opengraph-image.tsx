import { makeOgImage } from "@/lib/og-image";
import { grantsMeta } from "@/content/grants/meta";

/** Grants & Consultations OG image — Rust colours, this skill only. */
export const alt = grantsMeta.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return makeOgImage({
    accent: "#D9480F",
    label: "Grant & Business Consultations",
    title: "Win the funding you need. Build the plan to grow.",
    sub: grantsMeta.description,
  });
}
