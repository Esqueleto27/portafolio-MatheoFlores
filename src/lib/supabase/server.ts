import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { isAdminEmail } from "@/lib/admin-email";

// Server-only client bound to the request's auth cookies.
// Use this in Server Components / Server Actions to find out who's calling.
export async function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  const cookieStore = await cookies();
  return createServerClient(url, anonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Called from a Server Component render, where cookies are
          // read-only. The proxy middleware refreshes the session
          // cookie on navigation, so this is safe to ignore.
        }
      },
    },
  });
}

// Re-validates the session against Supabase Auth (unlike getSession(),
// which only decodes the local JWT) — required for a server-side auth check.
export async function getServerUser() {
  const supabase = await getServerSupabase();
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

// Being signed in is not enough — only the configured ADMIN_EMAIL may
// call admin Server Actions or view the admin panel. Without this,
// any Supabase Auth user (e.g. if public signups are enabled) would pass.
export async function requireAdmin() {
  const user = await getServerUser();
  if (!isAdminEmail(user?.email)) throw new Error("No autorizado");
  return user!;
}
