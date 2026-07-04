import { NextResponse } from "next/server";
import { createMessage, getServices } from "@/lib/data";
import { isRateLimited } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/contact-schema";

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (await isRateLimited(ip)) {
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

    const services = await getServices();
    if (!services.some((s) => s.id === parsed.data.service_id)) {
      return NextResponse.json(
        { error: "Datos inválidos", details: { service_id: "unknown" } },
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
