import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/auth";
import { isAdminEmail } from "@/lib/admin-email";
import { AdminHeader } from "@/components/admin/AdminHeader";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Same check as the proxy — being signed in is not enough, only
  // ADMIN_EMAIL may see the panel. Kept here as defense in depth.
  if (!isAdminEmail(session?.user?.email)) {
    redirect("/login");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
      }}
    >
      <AdminHeader />

      {/* Page content */}
      <main
        style={{
          padding: "28px clamp(20px, 3vw, 40px) 60px",
        }}
      >
        {children}
      </main>
    </div>
  );
}
