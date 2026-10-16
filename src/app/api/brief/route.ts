import { NextResponse } from "next/server";

/**
 * "Send a brief" endpoint — implemented in Phase 2 (shared engine, Master
 * Prompt §10): zod validation, honeypot + basic rate limit, Resend when
 * RESEND_API_KEY is set, prefilled mailto: fallback otherwise, and a
 * `[Product Marketing]` / `[Grants & Consultations]` subject prefix taken
 * from the hidden `site` field.
 */
export async function POST(): Promise<NextResponse> {
  return NextResponse.json(
    { ok: false, error: "Not implemented yet — ships in Phase 2." },
    { status: 501 }
  );
}
