"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { GlassPill } from "@/components/ui/Badge";
import type { Service } from "@/lib/mock-data";

const timelineOptions = ["urgent", "month", "no_rush", "exploring"] as const;

const contactSchema = z.object({
  name: z.string().min(1, "required"),
  email: z.string().min(1, "required").email("invalid_email"),
  service_id: z.string().min(1, "required"),
  timeline: z.string().min(1, "required"),
  message: z.string().min(1, "required"),
});

type FormData = z.infer<typeof contactSchema>;

const SOCIAL_LINKS = [
  { href: "https://linkedin.com", label_key: "social_linkedin" as const },
  { href: "https://upwork.com", label_key: "social_upwork" as const },
  { href: "https://workana.com", label_key: "social_workana" as const },
];

export function ContactForm({ services }: { services: Service[] }) {
  const t = useTranslations("contact");
  const footer = useTranslations("footer");
  const router = useRouter();
  const locale = useLocale();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      service_id: "",
      timeline: "",
      message: "",
    },
  });

  async function onSubmit(data: FormData) {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      alert(t("error_sending"));
      return;
    }
    router.push("/thank-you");
  }

  return (
    <section
      style={{
        padding: "60px clamp(20px, 6vw, 72px) 100px",
      }}
    >
      <div
        style={{
          maxWidth: "min(1080px, 100%)",
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(32px, 5vw, 72px)",
          alignItems: "start",
        }}
        className="grid-cols-1 md:grid-cols-2"
      >
        {/* Left: Avatar + info */}
        <div>
          <p
            data-reveal
            style={{
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--accent-2)",
              fontFamily: "var(--font-geist-mono)",
              marginBottom: "12px",
            }}
          >
            {t("section_label")}
          </p>

          <h1
            data-reveal
            style={{
              fontSize: "clamp(34px, 4.6vw, 60px)",
              fontWeight: 600,
              letterSpacing: "-0.035em",
              color: "var(--text)",
              lineHeight: 1.05,
              marginBottom: "20px",
              transitionDelay: "0.1s",
            }}
          >
            {t("section_title")}
          </h1>

          <p
            data-reveal
            style={{
              fontSize: "17px",
              color: "var(--muted)",
              lineHeight: 1.65,
              marginBottom: "40px",
              transitionDelay: "0.18s",
            }}
          >
            {t("section_desc")}
          </p>

          {/* Avatar with glow */}
          <div
            data-reveal
            style={{
              position: "relative",
              width: "clamp(180px, 22vw, 260px)",
              aspectRatio: "1",
              borderRadius: "24px",
              marginBottom: "40px",
              transitionDelay: "0.26s",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: "-20%",
                background:
                  "radial-gradient(46% 52% at 50% 46%, rgb(37 99 235 / calc(var(--glow) * 0.85)), transparent 60%)",
                filter: "blur(44px)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "24px",
                background: "var(--mockup)",
                backgroundImage:
                  "repeating-linear-gradient(135deg, var(--stripe) 0 2px, transparent 2px 13px)",
                border: "1px solid var(--hair)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontFamily: "var(--font-geist-mono)",
                  color: "var(--muted)",
                }}
              >
                [ {t("avatar_alt")} ]
              </span>
            </div>
          </div>

          {/* Social links */}
          <div data-reveal style={{ transitionDelay: "0.34s" }}>
            <GlassPill
              style={{
                fontSize: "13px",
                color: "var(--muted)",
                marginBottom: "12px",
              }}
            >
              {t("or_find_me")}
            </GlassPill>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {SOCIAL_LINKS.map(({ href, label_key }) => (
                <Button
                  key={label_key}
                  as="a"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="compact"
                >
                  {footer(label_key)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div data-reveal style={{ transitionDelay: "0.18s" }}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* Name */}
            <div>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--soft)",
                  marginBottom: "6px",
                  display: "block",
                }}
              >
                {t("form_name")}
              </label>
              <input
                {...register("name")}
                style={inputStyle(errors.name)}
              />
              {errors.name && (
                <span style={errorStyle}>{t(errors.name.message as "required")}</span>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--soft)",
                  marginBottom: "6px",
                  display: "block",
                }}
              >
                {t("form_email")}
              </label>
              <input
                type="email"
                {...register("email")}
                style={inputStyle(errors.email)}
              />
              {errors.email && (
                <span style={errorStyle}>
                  {t(
                    errors.email.message === "invalid_email"
                      ? "invalid_email"
                      : "required"
                  )}
                </span>
              )}
            </div>

            {/* Service type */}
            <div>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--soft)",
                  marginBottom: "6px",
                  display: "block",
                }}
              >
                {t("form_service")}
              </label>
              <select
                {...register("service_id")}
                style={selectStyle(errors.service_id)}
              >
                <option value="">—</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {locale === "en" ? s.name_en : s.name_es}
                  </option>
                ))}
              </select>
              {errors.service_id && (
                <span style={errorStyle}>{t("required")}</span>
              )}
            </div>

            {/* Timeline */}
            <div>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--soft)",
                  marginBottom: "6px",
                  display: "block",
                }}
              >
                {t("form_timeline")}
              </label>
              <select
                {...register("timeline")}
                style={selectStyle(errors.timeline)}
              >
                <option value="">—</option>
                {timelineOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {t(`timeline_${opt}`)}
                  </option>
                ))}
              </select>
              {errors.timeline && (
                <span style={errorStyle}>{t("required")}</span>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--soft)",
                  marginBottom: "6px",
                  display: "block",
                }}
              >
                {t("form_message")}
              </label>
              <textarea
                {...register("message")}
                rows={5}
                style={{
                  ...inputStyle(errors.message),
                  resize: "vertical",
                  minHeight: "100px",
                  fontFamily: "var(--font-geist-sans)",
                }}
              />
              {errors.message && (
                <span style={errorStyle}>{t("required")}</span>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              style={{ alignSelf: "flex-start" }}
            >
              {isSubmitting ? t("sending") : t("submit")}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ── Input styles ────────────────────────────────────────────────── */
function inputStyle(error?: object) {
  return {
    width: "100%",
    padding: "12px 14px",
    fontSize: "15px",
    fontFamily: "var(--font-geist-sans)",
    color: "var(--text)",
    background: "var(--fill)",
    border: `1px solid ${error ? "#ef4444" : "var(--hair)"}`,
    borderRadius: "10px",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box" as const,
  };
}

function selectStyle(error?: object) {
  return {
    ...inputStyle(error),
    cursor: "pointer",
  };
}

const errorStyle: React.CSSProperties = {
  fontSize: "12.5px",
  color: "#ef4444",
  marginTop: "4px",
  display: "block",
};
