"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
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

export function ContactForm({ services }: { services: Service[] }) {
  const t = useTranslations("contact");
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
