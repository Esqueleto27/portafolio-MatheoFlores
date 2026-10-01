import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

// Cloudflare Access endpoint — ends the Access session for this domain.
// A plain <a>, not <Link>: it's served by Cloudflare, not by this app.
const ACCESS_LOGOUT_URL = "/cdn-cgi/access/logout";

export function AdminHeader() {
  return (
    <header className="h-14 border-b border-hair px-[clamp(20px,3vw,40px)] flex items-center justify-between bg-bg sticky top-0 z-10">
      <Link href="/admin" className="flex items-center gap-2.5 no-underline">
        <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center text-xs font-bold text-white font-mono shrink-0">
          MF
        </div>
        <span className="text-[13px] font-semibold text-text">Admin Panel</span>
      </Link>

      <div className="flex items-center gap-2.5">
        <Link
          href="/"
          className="text-xs text-muted no-underline flex items-center gap-1.5 px-1 transition-colors hover:text-text focus-visible:text-text"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 1L1 6l5 5M1 6h10"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Ver sitio
        </Link>

        <ThemeToggle className="w-[30px] h-[30px] flex items-center justify-center rounded-lg border border-hair bg-fill text-muted cursor-pointer" />

        <a
          href={ACCESS_LOGOUT_URL}
          aria-label="Cerrar sesión"
          title="Cerrar sesión"
          className="w-[30px] h-[30px] flex items-center justify-center rounded-lg border border-hair bg-fill text-muted transition-colors hover:text-text hover:border-soft focus-visible:text-text focus-visible:border-soft"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M5 2H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3M9 10l3-3-3-3M12 7H5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </header>
  );
}
