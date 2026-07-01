"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { staggerContainer, fadeInUp } from "@/components/animations";

const NAV_LINKS = [
  { key: "projects" as const, href: "/projects" },
  { key: "about" as const, href: "/about" },
  { key: "contact" as const, href: "/contact" },
];

function LinkedInIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function UpworkIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.545-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
    </svg>
  );
}

function WorkanaIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 60 60" fill="currentColor" aria-hidden="true">
      <path d="M5 12 L15 48 L30 20 L45 48 L55 12" fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function FreelancerIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="none" />
      <text x="12" y="17" textAnchor="middle" fontSize="15" fontWeight="700" fontFamily="Arial, sans-serif">
        F
      </text>
    </svg>
  );
}

const SOCIAL_LINKS = [
  { key: "social_linkedin" as const, href: "https://www.linkedin.com/in/matheo-flores-281160278/", Icon: LinkedInIcon },
  { key: "social_upwork" as const, href: "https://www.upwork.com/freelancers/~018e88181a81bc2eec", Icon: UpworkIcon },
  { key: "social_workana" as const, href: "https://www.workana.com/freelancer/884b69b4188d8850b4253fc9e835a958", Icon: WorkanaIcon },
  { key: "social_freelancer" as const, href: "https://www.freelancer.com/u/Esqueleto27", Icon: FreelancerIcon },
];

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
      style={{
        borderTop: "1px solid var(--hair)",
        padding: "56px clamp(20px, 6vw, 72px) 40px",
      }}
    >
      <motion.div
        variants={staggerContainer(0.12, 0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr 1fr",
          gap: "44px",
        }}
      >
        {/* Col 1 — Brand */}
        <motion.div
          variants={fadeInUp}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <motion.span
              animate={{ boxShadow: ["0 0 6px var(--accent)", "0 0 14px var(--accent)", "0 0 6px var(--accent)"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: "9px",
                height: "9px",
                borderRadius: "50%",
                background: "var(--accent)",
                flexShrink: 0,
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.13em",
                textTransform: "uppercase",
                color: "var(--text)",
              }}
            >
              Matheo Flores
            </span>
          </div>
          <p style={{ fontSize: "16px", color: "var(--muted)", lineHeight: 1.5 }}>
            {t("tagline")}
          </p>
          <div style={{ display: "flex", gap: "16px", marginTop: "4px" }}>
            {SOCIAL_LINKS.map(({ key, href, Icon }) => (
              <motion.a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={t(key)}
                aria-label={t(key)}
                className="link-muted"
                whileHover={{ y: -3, scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px",
                  borderRadius: "10px",
                  border: "1px solid var(--hair)",
                  background: "var(--fill)",
                  transition: "border-color 0.2s, background 0.2s",
                }}
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Col 2 — Nav */}
        <motion.div
          variants={fadeInUp}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <span
            style={{
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--muted)",
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            {t("nav_title")}
          </span>
          {NAV_LINKS.map(({ key, href }) => (
            <motion.div key={key} whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
              <Link
                href={href}
                className="link-muted"
                style={{ fontSize: "16px", color: "var(--soft)" }}
              >
                {tNav(key)}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Col 3 — Contact */}
        <motion.div
          variants={fadeInUp}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <span
            style={{
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--muted)",
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            {t("contact_title")}
          </span>
          <motion.a
            href="mailto:matheofloresloor@gmail.com"
            className="link-muted"
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ fontSize: "16px", color: "var(--soft)" }}
          >
            matheofloresloor@gmail.com
          </motion.a>
          <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            <Link href="/contact" className="link-accent" style={{ fontSize: "16px" }}>
              {tNav("cta")} →
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4 }}
        style={{
          maxWidth: "1180px",
          margin: "40px auto 0",
          paddingTop: "24px",
          borderTop: "1px solid var(--hair)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: "15px", color: "var(--muted)" }}>
          © {year} Matheo Flores. {t("rights")}.
        </span>
      </motion.div>
    </motion.footer>
  );
}
