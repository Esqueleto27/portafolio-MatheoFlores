import { NextResponse } from "next/server";
import { z } from "zod";
import { createMessage } from "@/lib/data";

const VALID_SERVICE_IDS = ["ecommerce", "seo-web", "portfolio", "landing", "custom"] as const;
const VALID_TIMELINES = ["urgent", "month", "no_rush", "exploring"] as const;

const contactSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  email: z.string().email().max(200).trim(),
  service_id: z.enum(VALID_SERVICE_IDS),
  timeline: z.enum(VALID_TIMELINES),
  message: z.string().min(1).max(5000).trim(),
});

// In-memory rate limiter: max 3 requests per 15 min per IP
const rateMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const limit = 3;
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }
  if (entry.count >= limit) return true;
  entry.count++;
  return false;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Demasiados intentos. Esperá 15 minutos." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    await createMessage(parsed.data);

    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      const from = process.env.RESEND_FROM ?? "Portafolio <noreply@matheoflores.dev>";
      await resend.emails.send({
        from,
        to: "matheofloresloor@gmail.com",
        subject: `Nuevo mensaje de ${parsed.data.name}`,
        text: [
          `Nombre: ${parsed.data.name}`,
          `Email: ${parsed.data.email}`,
          `Servicio: ${parsed.data.service_id}`,
          `Plazo: ${parsed.data.timeline}`,
          "",
          parsed.data.message,
        ].join("\n"),
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
