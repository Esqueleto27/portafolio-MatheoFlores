"use client";

import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter, Link } from "@/i18n/navigation";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { key: "projects" as const, href: "/projects" },
  { key: "about" as const, href: "/about" },
  { key: "contact" as const, href: "/contact" },
];

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(next: "es" | "en") {
    router.replace(pathname, { locale: next });
  }

  return (
    <header
      style={{
        position: "fixed",
        top: "14px",
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "center",
        padding: "0 clamp(12px, 3vw, 24px)",
        pointerEvents: "none",
      }}
    >
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "1140px",
          height: "52px",
          padding: "0 18px",
          borderRadius: "14px",
          border: "1px solid var(--hair)",
          background: "var(--nav)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.22)",
          pointerEvents: "all",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: "9px",
              height: "9px",
              borderRadius: "50%",
              background: "var(--accent)",
              boxShadow: "0 0 8px var(--accent)",
              flexShrink: 0,
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
        </Link>

        {/* Center links — hidden on mobile */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
          }}
          className="hidden md:flex"
        >
          {NAV_LINKS.map(({ key, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={key}
                href={href}
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  padding: "8px 13px",
                  borderRadius: "8px",
                  color: isActive ? "var(--accent-2)" : "var(--soft)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    (e.target as HTMLElement).style.color = "var(--text)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    (e.target as HTMLElement).style.color = "var(--soft)";
                }}
              >
                {t(key)}
              </Link>
            );
          })}
        </div>

        {/* Right controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexShrink: 0,
          }}
        >
          {/* Locale switcher pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              padding: "4px 5px",
              borderRadius: "999px",
              border: "1px solid var(--hair)",
              background: "var(--fill)",
            }}
          >
            {(["es", "en"] as const).map((loc) => {
              const active = locale === loc;
              return (
                <button
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  style={{
                    fontSize: "12px",
                    fontWeight: active ? 600 : 500,
                    padding: "3px 8px",
                    borderRadius: "999px",
                    border: "none",
                    background: active ? "var(--fill2)" : "transparent",
                    color: active ? "var(--text)" : "var(--muted)",
                    cursor: "pointer",
                    transition: "color 0.2s, background 0.2s",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {loc}
                </button>
              );
            })}
          </div>

          {/* Theme toggle */}
          <ThemeToggle
            className="h-8 w-8 flex items-center justify-center rounded-lg border border-[var(--hair)] bg-[var(--fill)] text-[var(--muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
          />

          {/* CTA button */}
          <Link href="/contact" className="btn-primary compact hidden sm:inline-flex">
            {t("cta")}
          </Link>
        </div>
      </nav>
    </header>
  );
}
