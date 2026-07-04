"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SOCIAL_LINKS } from "@/components/SocialLinks";

const NAV_LINKS = [
  { key: "projects" as const, href: "/projects" },
  { key: "about" as const, href: "/about" },
  { key: "contact" as const, href: "/contact" },
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
            {SOCIAL_LINKS.map(({ label_key, href, Icon }) => (
              <a
                key={label_key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={t(label_key)}
                aria-label={t(label_key)}
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
