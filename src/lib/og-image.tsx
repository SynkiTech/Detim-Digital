import { ImageResponse } from "next/og";

type OgImageProps = {
  /** The site's accent hex. */
  accent: string;
  /** Small label chip text. */
  label: string;
  /** Main line (already customer-centric copy from content). */
  title: string;
  /** Serif-italic support line. */
  sub: string;
};

/**
 * Shared 1200×630 OG image generator — each site calls it with its own
 * colours and copy (Master Prompt §11.7).
 * Framer/UI classes don't exist here; satori needs inline styles.
 */
export function makeOgImage({ accent, label, title, sub }: OgImageProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#0A0A0A",
          backgroundImage:
            "radial-gradient(circle at 82% 18%, rgba(242,92,5,0.28) 0%, rgba(242,92,5,0) 42%)",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 18,
              backgroundImage:
                "linear-gradient(160deg, #262019 0%, #121009 55%, #0A0A0A 100%)",
              border: "1px solid rgba(255,255,255,0.18)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.10), 0 16px 36px -14px rgba(242,92,5,0.55)",
            }}
          >
            {/* 3D monogram hint: brand-ramp D over a stepped burnt extrusion */}
            <div
              style={{
                display: "flex",
                fontSize: 44,
                fontWeight: 800,
                color: "#FF5A1F",
                textShadow:
                  "1px 2px 0 #C2410C, 2px 4px 0 #7C2D08, 3px 6px 12px rgba(0,0,0,0.45)",
              }}
            >
              D
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>
            Detim
            <span style={{ fontWeight: 300, opacity: 0.75 }}>Digital</span>
          </div>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              padding: "10px 22px",
              borderRadius: 999,
              border: `1px solid ${accent}`,
              color: accent,
              fontSize: 22,
              letterSpacing: 4,
            }}
          >
            {label.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.08,
              maxWidth: 980,
              letterSpacing: -1,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              fontStyle: "italic",
              opacity: 0.75,
              maxWidth: 900,
            }}
          >
            {sub}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            opacity: 0.6,
          }}
        >
          <div style={{ display: "flex" }}>oluwadetimiajayi@gmail.com</div>
          <div style={{ display: "flex", color: accent }}>Available for projects</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
