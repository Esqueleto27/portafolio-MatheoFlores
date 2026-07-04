import { z } from "zod";

// Shared between the client form (ContactForm.tsx, for inline i18n error
// messages) and the API route (api/contact/route.ts, as the security
// boundary) — one source of truth for field shape and limits.
export const TIMELINE_OPTIONS = ["urgent", "month", "no_rush", "exploring"] as const;

export const contactSchema = z.object({
  name: z.string().min(1, "required").max(100, "required").trim(),
  email: z.string().min(1, "required").max(200, "required").email("invalid_email").trim(),
  service_id: z.string().min(1, "required").max(100, "required"),
  // Kept as a plain string (not z.enum) so it stays assignable from the
  // form's "" default value — membership in TIMELINE_OPTIONS is still
  // enforced at runtime via refine.
  timeline: z
    .string()
    .min(1, "required")
    .refine((v) => (TIMELINE_OPTIONS as readonly string[]).includes(v), "required"),
  message: z.string().min(1, "required").max(5000, "required").trim(),
  // Honeypot — hidden in the UI, so humans leave it empty. Bots that
  // auto-fill every field get a fake success in the API route.
  website: z.string().max(200).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
