"use client";

import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { AdminGuard } from "@/components/AdminGuard";
import { getSession, signOut } from "@/lib/auth";
import { useRouter } from "@/i18n/navigation";

const NAV = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    href: "/admin/projects",
    label: "Proyectos",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 3V2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M1 7h14" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    href: "/admin/services",
    label: "Servicios",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 1v2M8 13v2M1 8h2M13 8h2M2.93 2.93l1.41 1.41M11.66 11.66l1.41 1.41M2.93 13.07l1.41-1.41M11.66 4.34l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/admin/messages",
    label: "Mensajes",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M14 2H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3l3 3 3-3h3a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M4 6h8M4 9h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    getSession().then((s) => setEmail(s?.user?.email ?? null));
  }, []);

  async function handleLogout() {
    await signOut();
    router.replace("/login");
  }

  const initials = email ? email[0].toUpperCase() : "A";

  return (
    <AdminGuard>
      <div
        style={{
          display: "flex",
          height: "100vh",
          background: "var(--bg)",
          overflow: "hidden",
        }}
      >
        {/* Sidebar */}
        <aside
          style={{
            width: "220px",
            flexShrink: 0,
            background: "var(--bg2)",
            borderRight: "1px solid var(--hair)",
            display: "flex",
            flexDirection: "column",
            padding: "0",
            overflow: "hidden",
          }}
        >
          {/* Brand */}
          <div
            style={{
              padding: "20px 20px 16px",
              borderBottom: "1px solid var(--hair)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "8px",
                background: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: 700,
                color: "#fff",
                fontFamily: "var(--font-geist-mono)",
                flexShrink: 0,
              }}
            >
              MF
            </div>
            <div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--text)",
                  lineHeight: 1.2,
                }}
              >
                Admin Panel
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--muted)",
                  fontFamily: "var(--font-geist-mono)",
                }}
              >
                matheoflores.dev
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav
            style={{
              flex: 1,
              padding: "12px 10px",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              overflowY: "auto",
            }}
          >
            <p
              style={{
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--muted)",
                fontFamily: "var(--font-geist-mono)",
                padding: "6px 10px 4px",
              }}
            >
              Navegación
            </p>
            {NAV.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "9px",
                    padding: "8px 10px",
                    borderRadius: "8px",
                    fontSize: "13.5px",
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "var(--text)" : "var(--muted)",
                    background: isActive ? "var(--fill2)" : "transparent",
                    textDecoration: "none",
                    transition: "background 0.15s, color 0.15s",
                    position: "relative",
                  }}
                >
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "3px",
                        height: "16px",
                        borderRadius: "0 2px 2px 0",
                        background: "var(--accent)",
                      }}
                    />
                  )}
                  <span
                    style={{
                      color: isActive ? "var(--accent-2)" : "var(--muted)",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Footer user */}
          <div
            style={{
              borderTop: "1px solid var(--hair)",
              padding: "12px 10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 10px",
                borderRadius: "8px",
                marginBottom: "4px",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "var(--fill2)",
                  border: "1px solid var(--hair)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--soft)",
                  flexShrink: 0,
                }}
              >
                {initials}
              </div>
              <div style={{ overflow: "hidden" }}>
                <div
                  style={{
                    fontSize: "12px",
                    color: "var(--soft)",
                    fontWeight: 500,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {email ?? "…"}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "var(--muted)",
                  }}
                >
                  Administrador
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "7px 10px",
                borderRadius: "7px",
                fontSize: "13px",
                color: "var(--muted)",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "var(--fill)";
                (e.currentTarget as HTMLButtonElement).style.color =
                  "var(--soft)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "none";
                (e.currentTarget as HTMLButtonElement).style.color =
                  "var(--muted)";
              }}
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
              Cerrar sesión
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Top bar */}
          <header
            style={{
              height: "52px",
              borderBottom: "1px solid var(--hair)",
              padding: "0 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "var(--bg)",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {NAV.find(
                (n) =>
                  (n.href === "/admin" && pathname === "/admin") ||
                  (n.href !== "/admin" && pathname.startsWith(n.href))
              )?.label && (
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "var(--text)",
                  }}
                >
                  {
                    NAV.find(
                      (n) =>
                        (n.href === "/admin" && pathname === "/admin") ||
                        (n.href !== "/admin" && pathname.startsWith(n.href))
                    )?.label
                  }
                </span>
              )}
            </div>
            <Link
              href="/"
              style={{
                fontSize: "12px",
                color: "var(--muted)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                transition: "color 0.15s",
              }}
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
          </header>

          {/* Page content */}
          <main
            style={{
              flex: 1,
              overflow: "auto",
              padding: "28px clamp(20px, 3vw, 40px)",
            }}
          >
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}
