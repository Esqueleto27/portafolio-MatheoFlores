"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
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
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

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
        aria-label={locale === "es" ? "Navegación principal" : "Main navigation"}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "1140px",
          borderRadius: "14px",
          border: "1px solid var(--hair)",
          background: "var(--nav)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.22)",
          pointerEvents: "all",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            height: "52px",
            padding: "0 18px",
            flexShrink: 0,
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
            {/* Locale switcher pill — hidden on mobile, moved into the menu */}
            <div
              className="hidden sm:flex"
              style={{
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

            {/* Hamburger — mobile only */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? t("menu_close") : t("menu_open")}
              className="md:hidden"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                border: "1px solid var(--hair)",
                background: "var(--fill)",
                color: "var(--text)",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
              className="md:hidden"
              style={{ borderTop: "1px solid var(--hair)" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  padding: "14px 18px 18px",
                }}
              >
                {NAV_LINKS.map(({ key, href }) => {
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={key}
                      href={href}
                      style={{
                        fontSize: "16px",
                        fontWeight: 500,
                        padding: "12px 10px",
                        borderRadius: "10px",
                        color: isActive ? "var(--accent-2)" : "var(--soft)",
                        background: isActive ? "var(--fill)" : "transparent",
                        textDecoration: "none",
                      }}
                    >
                      {t(key)}
                    </Link>
                  );
                })}

                {/* Locale switcher */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginTop: "6px",
                    padding: "4px 5px",
                    borderRadius: "999px",
                    border: "1px solid var(--hair)",
                    background: "var(--fill)",
                    width: "fit-content",
                  }}
                >
                  {(["es", "en"] as const).map((loc) => {
                    const active = locale === loc;
                    return (
                      <button
                        key={loc}
                        onClick={() => switchLocale(loc)}
                        style={{
                          fontSize: "13px",
                          fontWeight: active ? 600 : 500,
                          padding: "5px 12px",
                          borderRadius: "999px",
                          border: "none",
                          background: active ? "var(--fill2)" : "transparent",
                          color: active ? "var(--text)" : "var(--muted)",
                          cursor: "pointer",
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                        }}
                      >
                        {loc}
                      </button>
                    );
                  })}
                </div>

                {/* CTA */}
                <Link
                  href="/contact"
                  className="btn-primary"
                  style={{ marginTop: "12px", width: "100%" }}
                >
                  {t("cta")}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
