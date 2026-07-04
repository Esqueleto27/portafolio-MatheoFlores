import { NextResponse } from "next/server";
import { createMessage, getServices } from "@/lib/data";
import { isRateLimited } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/contact-schema";
import { renderAdminNotificationEmail, renderVisitorConfirmationEmail } from "@/lib/email-templates";

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (await isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Demasiados intentos. Espera 15 minutos." },
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

    // Honeypot filled → bot. Pretend everything went fine so it doesn't
    // learn the field is a trap, but store nothing and send nothing.
    if (parsed.data.website) {
      return NextResponse.json({ success: true });
    }

    const services = await getServices();
    const service = services.find((s) => s.id === parsed.data.service_id);
    if (!service) {
      return NextResponse.json(
        { error: "Datos inválidos", details: { service_id: "unknown" } },
        { status: 400 }
      );
    }

    const { name, email, service_id, timeline, message, locale } = parsed.data;
    const messageData = { name, email, service_id, timeline, message };
    await createMessage(messageData);

    // The message is already stored (visible in the admin panel) — a
    // notification failure must not surface as an error to the visitor,
    // or they'll retry and create duplicates.
    try {
      const apiKey = process.env.RESEND_API_KEY;
      if (apiKey) {
        const { Resend } = await import("resend");
        const resend = new Resend(apiKey);
        const from = process.env.RESEND_FROM ?? "Portafolio <noreply@matheoflores.dev>";

        const adminEmail = renderAdminNotificationEmail({
          name,
          email,
          serviceName: service.name_es,
          timeline,
          message,
        });
        const visitorEmail = renderVisitorConfirmationEmail({
          name,
          serviceName: locale === "en" ? service.name_en : service.name_es,
          message,
          locale,
        });

        // Sent independently — a failed confirmation email to the visitor
        // shouldn't stop Matheo's own notification from going out.
        await Promise.allSettled([
          resend.emails.send({
            from,
            to: "matheofloresloor@gmail.com",
            subject: adminEmail.subject,
            html: adminEmail.html,
          }),
          resend.emails.send({
            from,
            to: email,
            subject: visitorEmail.subject,
            html: visitorEmail.html,
          }),
        ]);
      }
    } catch (emailError) {
      console.error("[contact] email notification failed:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
