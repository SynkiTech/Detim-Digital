"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import {
  BRIEF_BUDGET_OPTIONS,
  BRIEF_TIMELINE_OPTIONS,
  type SiteKey,
} from "@/lib/site-config";
import { cn } from "@/lib/utils";

const briefSchema = z.object({
  name: z.string().trim().min(2, "Please tell me your name.").max(120),
  email: z.string().trim().email("Please use a valid email address.").max(200),
  organisation: z.string().trim().max(160).optional(),
  need: z.string().min(1, "Pick what you need."),
  timeline: z.string().min(1, "Pick a timeline."),
  budget: z.string().optional(),
  message: z
    .string()
    .trim()
    .min(10, "A sentence or two helps me prepare.")
    .max(5000),
  website: z.string().optional(), // honeypot — humans leave this empty
});

type BriefValues = z.infer<typeof briefSchema>;

type BriefFormProps = {
  siteKey: Extract<SiteKey, "pmm" | "grants">;
  /** "What do you need?" options — this site's service titles only. */
  needs: string[];
};

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const inputClasses =
  "w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-paper placeholder:text-paper/40 transition-colors focus:border-accent focus:outline-none";

/**
 * "Send a brief" form (Master Prompt §10). Parameterised by site:
 * the "what you need" options and the email subject prefix are
 * exclusive to the skill site the form lives on.
 */
export function BriefForm({ siteKey, needs }: BriefFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BriefValues>({
    resolver: zodResolver(briefSchema),
    defaultValues: {
      name: "",
      email: "",
      organisation: "",
      need: "",
      timeline: "",
      budget: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = async (values: BriefValues) => {
    // Honeypot filled → silently pretend success.
    if (values.website) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, site: siteKey }),
      });
      const json = (await res.json()) as {
        ok: boolean;
        delivery?: string;
        fallbackHref?: string;
      };

      if (json.ok && json.delivery === "mailto" && json.fallbackHref) {
        window.location.assign(json.fallbackHref);
        setStatus("mailto");
        reset();
        return;
      }
      if (json.ok) {
        setStatus("sent");
        reset();
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent" || status === "mailto") {
    return (
      <div
        role="status"
        className="rounded-3xl border border-accent/40 bg-accent/10 p-8"
      >
        <CheckCircle2 className="size-8 text-accent" aria-hidden="true" />
        <p className="mt-4 font-display text-xl font-bold">
          Brief received. I&apos;ll reply within 1 to 2 working days.
        </p>
        <p className="mt-2 text-sm text-paper/70">
          {status === "mailto"
            ? "Your email app should have opened with everything ready to send — just press send."
            : "Keep an eye on your inbox. Anything urgent in the meantime, WhatsApp works fastest."}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 font-mono text-xs uppercase tracking-widest text-accent underline-offset-4 hover:underline"
        >
          Send another brief
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid gap-5 rounded-3xl border border-white/10 bg-ink-2/60 p-6 sm:p-8"
    >
      {/* Honeypot — visually hidden, ignored by humans */}
      <div className="absolute -left-[9999px] size-px overflow-hidden" aria-hidden="true">
        <label htmlFor="brief-website">Website</label>
        <input
          id="brief-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" error={errors.name?.message} htmlFor="brief-name">
          <input
            id="brief-name"
            type="text"
            autoComplete="name"
            placeholder="Ada Obi"
            className={inputClasses}
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
        </Field>

        <Field label="Email" error={errors.email?.message} htmlFor="brief-email">
          <input
            id="brief-email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            className={inputClasses}
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Organisation (optional)"
          error={errors.organisation?.message}
          htmlFor="brief-org"
        >
          <input
            id="brief-org"
            type="text"
            autoComplete="organization"
            placeholder="Company or organisation"
            className={inputClasses}
            {...register("organisation")}
          />
        </Field>

        <Field
          label="What do you need?"
          error={errors.need?.message}
          htmlFor="brief-need"
        >
          <select
            id="brief-need"
            className={cn(inputClasses, "appearance-none")}
            aria-invalid={Boolean(errors.need)}
            defaultValue=""
            {...register("need")}
          >
            <option value="" disabled>
              Choose one
            </option>
            {needs.map((n) => (
              <option key={n} value={n} className="bg-ink text-paper">
                {n}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Timeline"
          error={errors.timeline?.message}
          htmlFor="brief-timeline"
        >
          <select
            id="brief-timeline"
            className={cn(inputClasses, "appearance-none")}
            aria-invalid={Boolean(errors.timeline)}
            defaultValue=""
            {...register("timeline")}
          >
            <option value="" disabled>
              When do you need it?
            </option>
            {BRIEF_TIMELINE_OPTIONS.map((t) => (
              <option key={t} value={t} className="bg-ink text-paper">
                {t}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Budget range (optional)"
          htmlFor="brief-budget"
        >
          <select
            id="brief-budget"
            className={cn(inputClasses, "appearance-none")}
            defaultValue=""
            {...register("budget")}
          >
            <option value="" className="bg-ink text-paper">
              Prefer not to say
            </option>
            {BRIEF_BUDGET_OPTIONS.map((b) => (
              <option key={b} value={b} className="bg-ink text-paper">
                {b}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="Tell me about it"
        error={errors.message?.message}
        htmlFor="brief-message"
      >
        <textarea
          id="brief-message"
          rows={5}
          placeholder="Where you are now, what you want to happen, and anything I should know."
          className={cn(inputClasses, "resize-y")}
          aria-invalid={Boolean(errors.message)}
          {...register("message")}
        />
      </Field>

      {status === "error" ? (
        <p role="alert" className="text-sm text-red-400">
          Something went wrong sending the form. Please email me directly at
          oluwadetimiajayi@gmail.com — or try again.
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-display text-sm font-bold text-accent-foreground transition-colors duration-300 hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-70 sm:text-base"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Sending
            </>
          ) : (
            <>
              Send a brief
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </>
          )}
        </button>
        <p className="font-mono text-[11px] text-paper/50">
          No spam, no mailing lists. Just a reply from Oluwadetimi.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-paper/70"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p role="alert" className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}
