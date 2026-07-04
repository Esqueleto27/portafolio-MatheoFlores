// Transactional email HTML. Kept intentionally table/inline-style based
// (not the app's usual CSS) — email clients (Outlook, Gmail, etc.) strip
// <style> tags and don't support flexbox/grid, so this is the one place
// in the codebase where that old-school approach is the correct choice.

const ACCENT = "#2563eb";
const TEXT = "#0f172a";
const MUTED = "#64748b";
const BORDER = "#e2e8f0";
const BG = "#f1f5f9";

const TIMELINE_LABELS: Record<"es" | "en", Record<string, string>> = {
  es: {
    urgent: "Urgente",
    month: "1 mes",
    no_rush: "Sin apuro",
    exploring: "Explorando opciones",
  },
  en: {
    urgent: "Urgent",
    month: "1 month",
    no_rush: "No rush",
    exploring: "Exploring options",
  },
};

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Converts plain-text line breaks to <br> after escaping — the message
// body is user input, so it must never be interpolated unescaped into HTML.
function escapeHtmlMultiline(input: string): string {
  return escapeHtml(input).replace(/\n/g, "<br>");
}

function shell(bodyHtml: string): string {
  return `
<!DOCTYPE html>
<html lang="es">
  <body style="margin:0;padding:0;background:${BG};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid ${BORDER};">
            <tr>
              <td style="background:${ACCENT};padding:22px 28px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-right:8px;">
                      <div style="width:9px;height:9px;border-radius:50%;background:#ffffff;"></div>
                    </td>
                    <td style="color:#ffffff;font-size:14px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">
                      Matheo Flores
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 28px;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px;border-top:1px solid ${BORDER};">
                <p style="margin:0;font-size:12px;color:${MUTED};">
                  matheoflores.dev · matheofloresloor@gmail.com
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`.trim();
}

function fieldRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 0;border-top:1px solid ${BORDER};">
        <p style="margin:0 0 3px;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:${MUTED};">
          ${escapeHtml(label)}
        </p>
        <p style="margin:0;font-size:15px;color:${TEXT};">
          ${value}
        </p>
      </td>
    </tr>`;
}

export interface AdminNotificationInput {
  name: string;
  email: string;
  serviceName: string;
  timeline: string;
  message: string;
}

// Sent to Matheo whenever the contact form is submitted.
export function renderAdminNotificationEmail({
  name,
  email,
  serviceName,
  timeline,
  message,
}: AdminNotificationInput): { subject: string; html: string } {
  const timelineLabel = TIMELINE_LABELS.es[timeline] ?? timeline;
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);

  const body = `
    <p style="margin:0 0 4px;font-size:20px;font-weight:700;color:${TEXT};">
      Nuevo mensaje de contacto
    </p>
    <p style="margin:0 0 20px;font-size:14px;color:${MUTED};">
      Alguien llenó el formulario en matheoflores.dev
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${fieldRow("Nombre", safeName)}
      ${fieldRow("Correo", `<a href="mailto:${safeEmail}" style="color:${ACCENT};text-decoration:none;">${safeEmail}</a>`)}
      ${fieldRow("Servicio", escapeHtml(serviceName))}
      ${fieldRow("Plazo", escapeHtml(timelineLabel))}
      ${fieldRow("Mensaje", escapeHtmlMultiline(message))}
    </table>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:24px;">
      <tr>
        <td style="border-radius:8px;background:${ACCENT};">
          <a href="mailto:${safeEmail}" style="display:inline-block;padding:11px 20px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">
            Responder a ${safeName}
          </a>
        </td>
      </tr>
    </table>`;

  return {
    subject: `Nuevo mensaje de ${name}`,
    html: shell(body),
  };
}

export interface VisitorConfirmationInput {
  name: string;
  serviceName: string;
  message: string;
  locale: "es" | "en";
}

// Sent back to the person who submitted the form, confirming receipt.
export function renderVisitorConfirmationEmail({
  name,
  serviceName,
  message,
  locale,
}: VisitorConfirmationInput): { subject: string; html: string } {
  const safeFirstName = escapeHtml(name.split(" ")[0]);
  const safeService = escapeHtml(serviceName);
  const safeMessage = escapeHtmlMultiline(message);

  const copy =
    locale === "en"
      ? {
          subject: "I received your message — Matheo Flores",
          title: `Thanks for reaching out, ${safeFirstName}!`,
          intro: `I received your message about <strong>${safeService}</strong> and I'll personally review it and reply within 24 hours with a clear next step.`,
          quoteLabel: "What you sent me",
          signoff: "Talk soon,",
          from: "Matheo Flores — Full-Stack Developer",
        }
      : {
          subject: "Recibí tu mensaje — Matheo Flores",
          title: `¡Gracias por escribirme, ${safeFirstName}!`,
          intro: `Recibí tu mensaje sobre <strong>${safeService}</strong> y lo voy a revisar personalmente — te respondo en menos de 24 horas con el siguiente paso claro.`,
          quoteLabel: "Lo que me escribiste",
          signoff: "Hablamos pronto,",
          from: "Matheo Flores — Full-Stack Developer",
        };

  const body = `
    <p style="margin:0 0 16px;font-size:20px;font-weight:700;color:${TEXT};">
      ${copy.title}
    </p>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:${TEXT};">
      ${copy.intro}
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};border-radius:10px;">
      <tr>
        <td style="padding:16px 18px;">
          <p style="margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:${MUTED};">
            ${copy.quoteLabel}
          </p>
          <p style="margin:0;font-size:14px;line-height:1.6;color:${TEXT};">
            ${safeMessage}
          </p>
        </td>
      </tr>
    </table>
    <p style="margin:24px 0 0;font-size:15px;color:${TEXT};">
      ${copy.signoff}<br>
      <strong>${copy.from}</strong>
    </p>`;

  return {
    subject: copy.subject,
    html: shell(body),
  };
}
