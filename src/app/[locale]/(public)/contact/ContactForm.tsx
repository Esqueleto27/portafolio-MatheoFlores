"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import type { Service } from "@/lib/types";
import { contactSchema, TIMELINE_OPTIONS, type ContactFormData } from "@/lib/contact-schema";

export function ContactForm({ services }: { services: Service[] }) {
  const t = useTranslations("contact");
  const router = useRouter();
  const locale = useLocale();
  const [submitError, setSubmitError] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      service_id: "",
      timeline: "",
      message: "",
      website: "",
    },
  });

  async function onSubmit(data: ContactFormData) {
    setSubmitError(false);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      setSubmitError(true);
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
        className="grid-cols-2-mobile"
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
                htmlFor="contact-name"
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
                id="contact-name"
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
                htmlFor="contact-email"
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
                id="contact-email"
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
                htmlFor="contact-service"
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
              <Controller
                name="service_id"
                control={control}
                render={({ field }) => (
                  <Select
                    id="contact-service"
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.service_id}
                    options={services.map((s) => ({
                      value: s.id,
                      label: locale === "en" ? s.name_en : s.name_es,
                    }))}
                  />
                )}
              />
              {errors.service_id && (
                <span style={errorStyle}>{t("required")}</span>
              )}
            </div>

            {/* Timeline */}
            <div>
              <label
                htmlFor="contact-timeline"
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
              <Controller
                name="timeline"
                control={control}
                render={({ field }) => (
                  <Select
                    id="contact-timeline"
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.timeline}
                    options={TIMELINE_OPTIONS.map((opt) => ({
                      value: opt,
                      label: t(`timeline_${opt}`),
                    }))}
                  />
                )}
              />
              {errors.timeline && (
                <span style={errorStyle}>{t("required")}</span>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="contact-message"
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
                id="contact-message"
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

            {/* Honeypot — visually removed and skipped by keyboard/screen
                readers; humans never fill it, bots that do get dropped
                server-side. */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-9999px",
                width: "1px",
                height: "1px",
                overflow: "hidden",
              }}
            >
              <label htmlFor="contact-website">Website</label>
              <input
                id="contact-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...register("website")}
              />
            </div>

            {submitError && (
              <p role="alert" style={{ ...errorStyle, fontSize: "14px" }}>
                {t("error_sending")}
              </p>
            )}

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

const errorStyle: React.CSSProperties = {
  fontSize: "12.5px",
  color: "#ef4444",
  marginTop: "4px",
  display: "block",
};
