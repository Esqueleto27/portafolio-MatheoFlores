import { getSupabase } from "./supabase/client";
import {
  PROJECTS as MOCK_PROJECTS,
  SERVICES as MOCK_SERVICES,
  type Project,
  type Service,
} from "./mock-data";

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

const MOCK_MESSAGES: ContactMessage[] = [];

export async function getServices(): Promise<Service[]> {
  const supabase = await getSupabase();
  if (!supabase) return MOCK_SERVICES;
  const { data } = await supabase.from("servicios").select("*").order("order");
  return data ?? [];
}

export async function getProjects(): Promise<Project[]> {
  const supabase = await getSupabase();
  if (!supabase) return MOCK_PROJECTS;
  const { data } = await supabase.from("proyectos").select("*");
  return data ?? [];
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const supabase = await getSupabase();
  if (!supabase) return MOCK_PROJECTS.filter((p) => p.featured);
  const { data } = await supabase
    .from("proyectos")
    .select("*")
    .eq("featured", true);
  return data ?? [];
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  const supabase = await getSupabase();
  if (!supabase) return MOCK_PROJECTS.find((p) => p.id === id);
  const { data } = await supabase
    .from("proyectos")
    .select("*")
    .eq("id", id)
    .single();
  return data ?? undefined;
}

export async function getServiceById(id: string): Promise<Service | undefined> {
  const supabase = await getSupabase();
  if (!supabase) return MOCK_SERVICES.find((s) => s.id === id);
  const { data } = await supabase
    .from("servicios")
    .select("*")
    .eq("id", id)
    .single();
  return data ?? undefined;
}

export async function getProjectBySlug(
  slug: string
): Promise<Project | undefined> {
  const supabase = await getSupabase();
  if (!supabase) return MOCK_PROJECTS.find((p) => p.slug === slug);
  const { data } = await supabase
    .from("proyectos")
    .select("*")
    .eq("slug", slug)
    .single();
  return data ?? undefined;
}

export async function getServiceName(
  id: string,
  locale: "es" | "en"
): Promise<string> {
  const supabase = await getSupabase();
  if (!supabase) {
    const s = MOCK_SERVICES.find((s) => s.id === id);
    if (!s) return id;
    return locale === "en" ? s.name_en : s.name_es;
  }
  const { data } = await supabase
    .from("servicios")
    .select(`name_${locale}`)
    .eq("id", id)
    .single();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data ? (data as any)[`name_${locale}`] : id;
}

export async function createProject(
  project: Omit<Project, "id">
): Promise<Project | null> {
  const supabase = await getSupabase();
  if (!supabase) {
    const newProject: Project = {
      ...project,
      id: String(Date.now()),
    };
    MOCK_PROJECTS.push(newProject);
    return newProject;
  }
  const { data } = await supabase
    .from("proyectos")
    .insert(project)
    .select()
    .single();
  return data;
}

export async function updateProject(
  id: string,
  updates: Partial<Project>
): Promise<Project | null> {
  const supabase = await getSupabase();
  if (!supabase) {
    const idx = MOCK_PROJECTS.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    MOCK_PROJECTS[idx] = { ...MOCK_PROJECTS[idx], ...updates };
    return MOCK_PROJECTS[idx];
  }
  const { data } = await supabase
    .from("proyectos")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  return data;
}

export async function deleteProject(id: string): Promise<boolean> {
  const supabase = await getSupabase();
  if (!supabase) {
    const idx = MOCK_PROJECTS.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    MOCK_PROJECTS.splice(idx, 1);
    return true;
  }
  const { error } = await supabase.from("proyectos").delete().eq("id", id);
  return !error;
}

export async function createService(service: Service): Promise<Service | null> {
  const supabase = await getSupabase();
  if (!supabase) {
    MOCK_SERVICES.push(service);
    return service;
  }
  const { data } = await supabase
    .from("servicios")
    .insert(service)
    .select()
    .single();
  return data;
}

export async function updateService(
  id: string,
  updates: Partial<Service>
): Promise<Service | null> {
  const supabase = await getSupabase();
  if (!supabase) {
    const idx = MOCK_SERVICES.findIndex((s) => s.id === id);
    if (idx === -1) return null;
    MOCK_SERVICES[idx] = { ...MOCK_SERVICES[idx], ...updates };
    return MOCK_SERVICES[idx];
  }
  const { data } = await supabase
    .from("servicios")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  return data;
}

export async function deleteService(id: string): Promise<boolean> {
  const supabase = await getSupabase();
  if (!supabase) {
    const idx = MOCK_SERVICES.findIndex((s) => s.id === id);
    if (idx === -1) return false;
    MOCK_SERVICES.splice(idx, 1);
    return true;
  }
  const { error } = await supabase.from("servicios").delete().eq("id", id);
  return !error;
}

export async function getMessages(): Promise<ContactMessage[]> {
  const supabase = await getSupabase();
  if (supabase) {
    const { data } = await supabase
      .from("mensajes_contacto")
      .select("*")
      .order("created_at", { ascending: false });
    return data ?? [];
  }
  return [...MOCK_MESSAGES].reverse();
}

export async function createMessage(
  msg: Omit<ContactMessage, "id" | "created_at" | "status">
): Promise<ContactMessage | null> {
  const supabase = await getSupabase();
  if (supabase) {
    const { data } = await supabase
      .from("mensajes_contacto")
      .insert({ ...msg, status: "pendiente" })
      .select()
      .single();
    return data;
  }
  const entry: ContactMessage = {
    ...msg,
    id: String(Date.now()),
    status: "pendiente",
    created_at: new Date().toISOString(),
  };
  MOCK_MESSAGES.push(entry);
  return entry;
}

export async function updateMessageStatus(
  id: string,
  status: "pendiente" | "respondido"
): Promise<ContactMessage | null> {
  const idx = MOCK_MESSAGES.findIndex((m) => m.id === id);
  if (idx !== -1) {
    MOCK_MESSAGES[idx].status = status;
    return MOCK_MESSAGES[idx];
  }
  const supabase = await getSupabase();
  if (!supabase) return null;
  const { data } = await supabase
    .from("mensajes_contacto")
    .update({ status })
    .eq("id", id)
    .select()
    .single();
  return data;
}
