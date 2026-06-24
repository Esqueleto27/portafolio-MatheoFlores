"use client";

import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { AdminGuard } from "@/components/AdminGuard";
import { getSession, signOut } from "@/lib/auth";
import { useRouter } from "@/i18n/navigation";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/projects", label: "Proyectos" },
  { href: "/admin/services", label: "Servicios" },
  { href: "/admin/messages", label: "Mensajes" },
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

  return (
    <AdminGuard>
      <div style={{ display: "flex", minHeight: "calc(100vh - 80px)" }}>
        <aside
          style={{
            width: "240px",
            flexShrink: 0,
            borderRight: "1px solid var(--hair)",
            padding: "32px 20px",
            background: "var(--bg2)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--accent-2)",
                fontFamily: "var(--font-geist-mono)",
                marginBottom: "4px",
              }}
            >
              Admin
            </p>
            <p
              style={{
                fontSize: "12px",
                color: "var(--soft)",
                marginBottom: "20px",
              }}
            >
              {email}
            </p>
            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              {NAV.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: isActive ? "var(--text)" : "var(--soft)",
                      background: isActive ? "var(--fill)" : "transparent",
                      textDecoration: "none",
                      transition: "background 0.2s",
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              fontSize: "13px",
              color: "var(--soft)",
              background: "none",
              border: "1px solid var(--hair)",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            Cerrar sesión
          </button>
        </aside>
        <main style={{ flex: 1, padding: "32px clamp(20px, 4vw, 48px)" }}>
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}
