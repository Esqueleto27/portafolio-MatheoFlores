import { getSupabase } from "./supabase/client";

export async function signIn(
  email: string,
  password: string
): Promise<{ error?: string }> {
  const supabase = await getSupabase();

  if (!supabase) {
    return { error: "Supabase no está configurado" };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return error ? { error: error.message } : {};
}

export async function signOut() {
  const supabase = await getSupabase();
  if (supabase) await supabase.auth.signOut();
}
