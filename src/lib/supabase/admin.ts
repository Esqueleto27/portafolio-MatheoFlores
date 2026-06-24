import { createClient } from "@supabase/supabase-js";

// Server-only admin client — uses service role key, bypasses RLS.
// NEVER import this in client components or expose to the browser.
export function getAdminSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}
