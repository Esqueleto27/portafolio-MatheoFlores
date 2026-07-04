import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/supabase/server";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const user = await getServerUser();

  if (!user) {
    redirect(`/${locale}/login`);
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
