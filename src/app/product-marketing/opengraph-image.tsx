import { makeOgImage } from "@/lib/og-image";
import { pmMeta } from "@/content/product-marketing/meta";

/** Product Marketing OG image — Ember colours, this skill only. */
export const alt = pmMeta.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return makeOgImage({
    accent: "#FF5A1F",
    label: "Product Marketing",
    title: "From idea to a widely adopted market product.",
    sub: pmMeta.description,
  });
}
