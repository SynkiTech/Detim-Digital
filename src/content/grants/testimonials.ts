import type { Testimonial } from "../types";

/**
 * TODO(Phase 6): real testimonials only. Never invent quotes (Master Prompt §9).
 * In production, render only entries with `verified: true`. If this array has
 * no verified entries, the section falls back to the verified numbers strip.
 */
export const grantsTestimonials: Testimonial[] = [];
