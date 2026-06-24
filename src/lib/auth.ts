import { getSupabase } from "./supabase/client";

interface AuthSession {
  user: { email: string };
}

let mockSession: AuthSession | null = null;

export async function signIn(
  email: string,
  password: string
): Promise<{ error?: string }> {
  const supabase = await getSupabase();

  if (!supabase) {
    return { error: "Supabase no está configurado" };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };

  const { data: userData } = await supabase.auth.getUser();
  if (userData?.user) {
    mockSession = { user: { email: userData.user.email ?? email } };
  }

  return {};
}

export async function signOut() {
  const supabase = await getSupabase();
  if (supabase) await supabase.auth.signOut();
  mockSession = null;
}

export async function getSession(): Promise<AuthSession | null> {
  if (mockSession) return mockSession;

  const supabase = await getSupabase();
  if (!supabase) return null;

  const { data } = await supabase.auth.getSession();
  if (data.session?.user) {
    mockSession = { user: { email: data.session.user.email ?? "" } };
    return mockSession;
  }

  return null;
}
