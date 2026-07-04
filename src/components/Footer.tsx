"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

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
    <footer
      data-reveal
      className="border-t border-hair px-[clamp(20px,6vw,72px)] pt-14 pb-10"
    >
      <div
        className="footer-grid max-w-[1180px] mx-auto grid gap-11"
        style={{ gridTemplateColumns: "1.6fr 1fr 1fr" }}
      >
        {/* Col 1 — Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span
              className="w-[9px] h-[9px] rounded-full bg-accent shrink-0 inline-block"
              style={{ animation: "mf-dot-glow 2.5s ease-in-out infinite" }}
            />
            <span className="text-sm font-semibold tracking-[0.13em] uppercase text-text">
              Matheo Flores
            </span>
          </div>
          <p className="text-base text-muted leading-normal">{t("tagline")}</p>
          <div className="flex gap-4 mt-1">
            {SOCIAL_LINKS.map(({ key, href, Icon }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={t(key)}
                aria-label={t(key)}
                className="link-muted footer-social-hover inline-flex items-center justify-center p-2 rounded-[10px] border border-hair bg-fill transition-colors"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Col 2 — Nav */}
        <div className="flex flex-col gap-3">
          <span className="text-[13px] font-medium tracking-[0.08em] uppercase text-muted font-mono">
            {t("nav_title")}
          </span>
          {NAV_LINKS.map(({ key, href }) => (
            <div key={key} className="footer-link-x-hover">
              <Link href={href} className="link-muted text-base text-soft">
                {tNav(key)}
              </Link>
            </div>
          ))}
        </div>

        {/* Col 3 — Contact */}
        <div className="flex flex-col gap-3">
          <span className="text-[13px] font-medium tracking-[0.08em] uppercase text-muted font-mono">
            {t("contact_title")}
          </span>
          <a
            href="mailto:matheofloresloor@gmail.com"
            className="link-muted footer-link-x-hover text-base text-soft"
          >
            matheofloresloor@gmail.com
          </a>
          <div className="footer-link-x-hover">
            <Link href="/contact" className="link-accent text-base">
              {tNav("cta")} →
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1180px] mx-auto mt-10 pt-6 border-t border-hair flex justify-between items-center gap-4 flex-wrap">
        <span className="text-[15px] text-muted">
          © {year} Matheo Flores. {t("rights")}.
        </span>
      </div>
    </footer>
  );
}
