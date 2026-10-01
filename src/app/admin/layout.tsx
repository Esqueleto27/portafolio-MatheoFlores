import { notFound, unstable_rethrow } from "next/navigation";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/require-admin";
import { AdminHeader } from "@/components/admin/AdminHeader";

// Every admin page reads D1 and the Access JWT of the current request.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Verifies the Cloudflare Access JWT (signature, audience, ADMIN_EMAIL).
  // There's no login page to send anyone to — Access handles sign-in
  // before the request gets here, so a failure means "not for you".
  try {
    await requireAdmin();
  } catch (err) {
    unstable_rethrow(err);
    notFound();
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
