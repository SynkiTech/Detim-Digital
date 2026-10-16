import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

/**
 * "Send a brief" endpoint (Master Prompt §10).
 * - zod validation
 * - honeypot field (`website`) must stay empty
 * - basic in-memory rate limit (5 submissions / hour / IP)
 * - if RESEND_API_KEY + CONTACT_TO_EMAIL are set, sends via Resend
 * - otherwise returns a prefilled mailto: fallback so the form always works
 * - subject prefix ([Product Marketing] / [Grants & Consultations])
 *   comes from the hidden `site` field
 */

const briefSchema = z.object({
  site: z.enum(["pmm", "grants"]),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  organisation: z.string().trim().max(160).optional().or(z.literal("")),
  need: z.string().trim().min(1).max(200),
  timeline: z.string().trim().min(1).max(80),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(5000),
  website: z.string().optional().or(z.literal("")), // honeypot
});

type BriefData = z.infer<typeof briefSchema>;

const SUBJECT_PREFIX: Record<BriefData["site"], string> = {
  pmm: "[Product Marketing]",
  grants: "[Grants & Consultations]",
};

/** Basic in-memory rate limiting (per server instance). */
const hits = new Map<string, number[]>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

function buildBody(data: BriefData): string {
  return [
    `New brief from the ${SUBJECT_PREFIX[data.site]} site.`,
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Organisation: ${data.organisation || "—"}`,
    `What they need: ${data.need}`,
    `Timeline: ${data.timeline}`,
    `Budget range: ${data.budget || "Not shared"}`,
    "",
    "Message:",
    data.message,
  ].join("\n");
}

function buildMailto(data: BriefData): string {
  const subject = encodeURIComponent(
    `${SUBJECT_PREFIX[data.site]} New brief from ${data.name}`
  );
  const body = encodeURIComponent(buildBody(data));
  const to = process.env.CONTACT_TO_EMAIL || "oluwadetimiajayi@gmail.com";
  return `mailto:${to}?subject=${subject}&body=${body}`;
}

async function sendViaResend(
  data: BriefData,
  apiKey: string
): Promise<boolean> {
  const to = process.env.CONTACT_TO_EMAIL;
  if (!to) return false;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.BRIEF_FROM_EMAIL ?? "Detim Digital <onboarding@resend.dev>",
        to: [to],
        reply_to: data.email,
        subject: `${SUBJECT_PREFIX[data.site]} New brief from ${data.name}`,
        text: buildBody(data),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const parsed = briefSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed.",
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Honeypot filled — almost certainly a bot. Pretend success, send nothing.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey && (await sendViaResend(data, resendKey))) {
    return NextResponse.json({ ok: true, delivery: "email" });
  }

  // No API key (or Resend failed) → prefilled mailto fallback.
  return NextResponse.json({
    ok: true,
    delivery: "mailto",
    fallbackHref: buildMailto(data),
  });
}
