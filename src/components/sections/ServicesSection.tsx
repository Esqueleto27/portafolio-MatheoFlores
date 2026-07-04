"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Search, ShoppingCart, Briefcase, Rocket, MessageCircle, Megaphone } from "lucide-react";
import { ServicePill } from "@/components/ui/Badge";
import type { Service, Locale } from "@/lib/types";

// Purely decorative icon per card position — the actual service name/desc
// always comes from the DB below, so a mismatched order here can't make the
// label lie about what the card offers.
const SERVICE_ICONS = [Search, ShoppingCart, Briefcase, Rocket, MessageCircle, Megaphone];

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rx = (y - 0.5) * -10;
    const ry = (x - 0.5) * 10;
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.025)`;
    el.style.transition = "transform 0.08s ease";

    const glowEl = el.querySelector<HTMLElement>(".svc-glow");
    if (glowEl) {
      glowEl.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgb(37 99 235 / calc(var(--glow) * 0.5)), transparent 65%)`;
      glowEl.style.opacity = "1";
    }
  }

  function onMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    el.style.transition = "transform 0.55s cubic-bezier(0.25, 0.4, 0.25, 1)";
    const glowEl = el.querySelector<HTMLElement>(".svc-glow");
    if (glowEl) glowEl.style.opacity = "0";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ height: "100%", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

export function ServicesSection({
  services,
  locale,
}: {
  services: Service[];
  locale: Locale;
}) {
  const t = useTranslations("services");

  return (
    <section
      style={{
        padding: "80px clamp(20px, 6vw, 72px)",
        background: "var(--bg2)",
      }}
    >
      <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
        <p
          data-reveal
          style={{
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--accent-2)",
            fontFamily: "var(--font-geist-mono)",
            marginBottom: "14px",
          }}
        >
          {t("section_label")}
        </p>

        <h2
          data-reveal
          style={{
            fontSize: "clamp(34px, 4.2vw, 54px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            color: "var(--text)",
            marginBottom: "14px",
            transitionDelay: "0.08s",
          }}
        >
          {t("section_title")}
        </h2>

        <p
          data-reveal
          style={{
            fontSize: "19px",
            color: "var(--muted)",
            marginBottom: "52px",
            transitionDelay: "0.14s",
          }}
        >
          {t("section_desc")}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(330px, 100%), 1fr))",
            gap: "22px",
          }}
        >
          {services.map((service, i) => {
            const name = locale === "en" ? service.name_en : service.name_es;
            const desc =
              locale === "en" ? service.description_en : service.description_es;
            const Icon = SERVICE_ICONS[i];

            return (
              <div
                key={service.id}
                data-reveal
                className="svc-card-hover"
                style={{ height: "100%", transitionDelay: `${i * 0.1}s` }}
              >
                <TiltCard>
                  <div
                    style={{
                      padding: "24px",
                      borderRadius: "16px",
                      border: "1px solid var(--hair)",
                      background: "var(--card)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      height: "100%",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Inner glow */}
                    <div
                      className="svc-glow"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "transparent",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        pointerEvents: "none",
                        borderRadius: "16px",
                      }}
                    />

                    {/* Service header: icon + number */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      {Icon && (
                        <Icon size={20} strokeWidth={2} color="var(--accent)" />
                      )}
                      <span
                        style={{
                          fontSize: "13px",
                          fontFamily: "var(--font-geist-mono)",
                          color: "var(--accent)",
                          letterSpacing: "0.1em",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <ServicePill>{name}</ServicePill>
                    <p
                      style={{
                        fontSize: "16.5px",
                        color: "var(--muted)",
                        lineHeight: 1.6,
                        margin: 0,
                        flex: 1,
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      {desc}
                    </p>

                    {/* Reference image — falls back to a striped placeholder
                        until an image is uploaded for this service in admin */}
                    <div
                      style={{
                        height: "120px",
                        borderRadius: "10px",
                        background: service.image_url ? undefined : "var(--mockup)",
                        backgroundImage: service.image_url
                          ? undefined
                          : "repeating-linear-gradient(135deg, var(--stripe) 0 2px, transparent 2px 13px)",
                        border: "1px solid var(--hair)",
                        marginTop: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        overflow: "hidden",
                        zIndex: 1,
                      }}
                    >
                      {service.image_url ? (
                        <Image
                          src={service.image_url}
                          alt=""
                          fill
                          loading="lazy"
                          sizes="(max-width: 640px) 100vw, 330px"
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <span
                          style={{
                            fontSize: "11px",
                            fontFamily: "var(--font-geist-mono)",
                            color: "var(--muted)",
                          }}
                        >
                          [ referencia ]
                        </span>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
