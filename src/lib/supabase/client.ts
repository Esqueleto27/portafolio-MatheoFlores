// Browser client — stores the session in cookies (not localStorage) so
// Server Components / Server Actions can read who's signed in.
export async function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  const { createBrowserClient } = await import("@supabase/ssr");
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
