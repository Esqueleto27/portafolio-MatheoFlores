"use client";

import { useEffect, useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  // The mobile menu closes on every navigation trigger (link clicks and
  // the locale switch) instead of reacting to pathname changes in an
  // effect, which caused a cascading re-render on every route change.
  function closeMenu() {
    setMenuOpen(false);
  }

  function switchLocale(next: "es" | "en") {
    closeMenu();
    router.replace(pathname, { locale: next });
  }

  return (
    <header className="fixed top-[14px] left-0 right-0 z-[100] flex justify-center px-[clamp(12px,3vw,24px)] pointer-events-none">
      <nav
        aria-label={locale === "es" ? "Navegación principal" : "Main navigation"}
        className="flex flex-col w-full max-w-[1140px] rounded-[14px] border border-hair bg-[var(--nav)] backdrop-blur-[18px] shadow-[0_12px_40px_rgba(0,0,0,0.22)] pointer-events-auto overflow-hidden"
      >
        <div className="flex items-center justify-between w-full h-[52px] px-[clamp(12px,4vw,18px)] shrink-0 gap-2">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-2 no-underline min-w-0 overflow-hidden"
          >
            <span className="w-[9px] h-[9px] rounded-full bg-accent shadow-[0_0_8px_var(--accent)] shrink-0" />
            <span className="text-[clamp(12px,3.4vw,14px)] font-semibold tracking-[0.1em] uppercase text-text overflow-hidden text-ellipsis whitespace-nowrap">
              Matheo Flores
            </span>
          </Link>

          {/* Center links — hidden on mobile */}
          <div className="items-center gap-0.5 navbar-desktop-links">
            {NAV_LINKS.map(({ key, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={key}
                  href={href}
                  className={`text-sm font-medium px-[13px] py-2 rounded-lg no-underline transition-colors ${
                    isActive ? "text-accent-2" : "text-soft hover:text-text focus-visible:text-text"
                  }`}
                >
                  {t(key)}
                </Link>
              );
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Locale switcher pill — always visible */}
            <div className="flex items-center gap-0.5 py-1 px-[5px] rounded-full border border-hair bg-fill shrink-0">
              {(["es", "en"] as const).map((loc) => {
                const active = locale === loc;
                return (
                  <button
                    key={loc}
                    onClick={() => switchLocale(loc)}
                    className={`text-xs px-2 py-[3px] rounded-full border-none cursor-pointer transition-colors tracking-[0.04em] uppercase ${
                      active
                        ? "font-semibold text-text bg-fill2"
                        : "font-medium text-muted bg-transparent hover:text-text"
                    }`}
                  >
                    {loc}
                  </button>
                );
              })}
            </div>

            {/* Theme toggle */}
            <ThemeToggle className="h-8 w-8 flex items-center justify-center rounded-lg border border-[var(--hair)] bg-[var(--fill)] text-[var(--muted)] hover:text-[var(--text)] transition-colors cursor-pointer" />

            {/* CTA button */}
            <Link href="/contact" className="btn-primary compact navbar-desktop-cta">
              {t("cta")}
            </Link>

            {/* Hamburger — mobile only */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? t("menu_close") : t("menu_open")}
              className="navbar-hamburger items-center justify-center w-9 h-9 rounded-lg border border-hair bg-fill text-text cursor-pointer shrink-0"
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

        {/* Mobile menu panel — grid-rows 0fr/1fr trick animates to auto height */}
        <div
          className={`grid navbar-mobile-panel ${menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
          style={{ transition: "grid-template-rows 0.25s cubic-bezier(0.25,0.4,0.25,1)" }}
        >
          <div className="overflow-hidden border-t border-hair">
            <div className="flex flex-col gap-1 px-[18px] pt-3.5 pb-[18px]">
              {NAV_LINKS.map(({ key, href }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={key}
                    href={href}
                    onClick={closeMenu}
                    className={`text-base font-medium px-2.5 py-3 rounded-[10px] no-underline ${
                      isActive ? "text-accent-2 bg-fill" : "text-soft bg-transparent"
                    }`}
                  >
                    {t(key)}
                  </Link>
                );
              })}

              {/* CTA */}
              <Link href="/contact" onClick={closeMenu} className="btn-primary mt-3 w-full">
                {t("cta")}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
