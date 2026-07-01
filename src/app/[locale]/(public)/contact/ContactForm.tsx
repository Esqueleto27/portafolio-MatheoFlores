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

function LinkedInIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function UpworkIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.545-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
    </svg>
  );
}

function WorkanaIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 60 60" fill="currentColor" aria-hidden="true">
      <path d="M5 12 L15 48 L30 20 L45 48 L55 12" fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function FreelancerIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="none" />
      <text x="12" y="17" textAnchor="middle" fontSize="15" fontWeight="700" fontFamily="Arial, sans-serif">
        F
      </text>
    </svg>
  );
}

const SOCIAL_LINKS = [
  { href: "https://www.linkedin.com/in/matheo-flores-281160278/", label_key: "social_linkedin" as const, Icon: LinkedInIcon },
  { href: "https://www.upwork.com/freelancers/~018e88181a81bc2eec", label_key: "social_upwork" as const, Icon: UpworkIcon },
  { href: "https://www.workana.com/freelancer/884b69b4188d8850b4253fc9e835a958", label_key: "social_workana" as const, Icon: WorkanaIcon },
  { href: "https://www.freelancer.com/u/Esqueleto27", label_key: "social_freelancer" as const, Icon: FreelancerIcon },
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

          {/* Avatar */}
          <div
            data-reveal
            style={{
              width: "clamp(160px, 20vw, 220px)",
              aspectRatio: "1",
              borderRadius: "50%",
              marginBottom: "36px",
              transitionDelay: "0.26s",
              overflow: "hidden",
              border: "2px solid var(--hair)",
              flexShrink: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/matheo-avatar.jpg"
              alt={t("avatar_alt")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          {/* Social links */}
          <div data-reveal style={{ transitionDelay: "0.34s", display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {SOCIAL_LINKS.map(({ href, label_key, Icon }) => (
              <a
                key={label_key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={footer(label_key)}
                title={footer(label_key)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  border: "1px solid var(--hair)",
                  background: "var(--fill)",
                  color: "var(--soft)",
                  transition: "border-color 0.2s, color 0.2s, transform 0.15s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = ""; (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--hair)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--soft)"; }}
              >
                <Icon />
              </a>
            ))}
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
