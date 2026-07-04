import { unstable_cache } from "next/cache";
import { getSupabase } from "./supabase/client";
import { getAdminSupabase } from "./supabase/admin";
import type { Project, Service } from "./types";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  service_id: string;
  timeline: string;
  message: string;
  status: "pendiente" | "respondido";
  created_at: string;
}

// Public read paths are cached at the data layer — independent of whether
// the route itself renders statically — and invalidated by admin-actions.ts
// via updateTag() on every write, so edits show up immediately.
export const getServices = unstable_cache(
  async (): Promise<Service[]> => {
    const supabase = await getSupabase();
    if (!supabase) return [];
    const { data } = await supabase.from("servicios").select("*").order("order");
    return data ?? [];
  },
  ["services"],
  { tags: ["services"], revalidate: 3600 }
);

export const getProjects = unstable_cache(
  async (): Promise<Project[]> => {
    const supabase = await getSupabase();
    if (!supabase) return [];
    const { data } = await supabase
      .from("proyectos")
      .select("*")
      .order("created_at", { ascending: false });
    return data ?? [];
  },
  ["projects"],
  { tags: ["projects"], revalidate: 3600 }
);

export const getFeaturedProjects = unstable_cache(
  async (): Promise<Project[]> => {
    const supabase = await getSupabase();
    if (!supabase) return [];
    const { data } = await supabase
      .from("proyectos")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false });
    return data ?? [];
  },
  ["featured-projects"],
  { tags: ["projects"], revalidate: 3600 }
);

// Admin needs to see writes immediately, so these stay uncached.
export async function getProjectById(id: string): Promise<Project | undefined> {
  const supabase = await getSupabase();
  if (!supabase) return undefined;
  const { data } = await supabase
    .from("proyectos")
    .select("*")
    .eq("id", id)
    .single();
  return data ?? undefined;
}

export async function getServiceById(id: string): Promise<Service | undefined> {
  const supabase = await getSupabase();
  if (!supabase) return undefined;
  const { data } = await supabase
    .from("servicios")
    .select("*")
    .eq("id", id)
    .single();
  return data ?? undefined;
}

export const getProjectBySlug = unstable_cache(
  async (slug: string): Promise<Project | undefined> => {
    const supabase = await getSupabase();
    if (!supabase) return undefined;
    const { data } = await supabase
      .from("proyectos")
      .select("*")
      .eq("slug", slug)
      .single();
    return data ?? undefined;
  },
  ["project-by-slug"],
  { tags: ["projects"], revalidate: 3600 }
);

export const getServiceName = unstable_cache(
  async (id: string, locale: "es" | "en"): Promise<string> => {
    const supabase = await getSupabase();
    if (!supabase) return id;
    const { data } = await supabase
      .from("servicios")
      .select(`name_${locale}`)
      .eq("id", id)
      .single();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data ? (data as any)[`name_${locale}`] : id;
  },
  ["service-name"],
  { tags: ["services"], revalidate: 3600 }
);

export async function getMessages(): Promise<ContactMessage[]> {
  const supabase = getAdminSupabase();
  if (!supabase) return [];
  const { data } = await supabase
    .from("mensajes_contacto")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function createMessage(
  msg: Omit<ContactMessage, "id" | "created_at" | "status">
): Promise<ContactMessage | null> {
  const supabase = getAdminSupabase();
  if (!supabase) throw new Error("SUPABASE_SERVICE_ROLE_KEY no configurado");
  const { data, error } = await supabase
    .from("mensajes_contacto")
    .insert({ ...msg, status: "pendiente" })
    .select()
    .single();
  if (error) {
    console.error("[createMessage]", error);
    throw new Error(error.message);
  }
  return data;
}
