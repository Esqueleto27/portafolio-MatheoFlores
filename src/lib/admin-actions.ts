"use server";

import { revalidatePath } from "next/cache";
import { getAdminSupabase } from "./supabase/admin";
import type { Project, Service } from "./mock-data";
import type { ContactMessage } from "./data";

function adminClient() {
  const client = getAdminSupabase();
  if (!client) throw new Error("SUPABASE_SERVICE_ROLE_KEY no configurado");
  return client;
}

export async function createProjectAction(project: Omit<Project, "id">) {
  const db = adminClient();
  const { error } = await db.from("proyectos").insert(project);
  if (error) { console.error("[admin] createProject:", error); throw new Error(error.message); }
  revalidatePath("/", "layout");
}

export async function updateProjectAction(id: string, updates: Partial<Project>) {
  const db = adminClient();
  const { error } = await db.from("proyectos").update(updates).eq("id", id);
  if (error) { console.error("[admin] updateProject:", error); throw new Error(error.message); }
  revalidatePath("/", "layout");
}

export async function deleteProjectAction(id: string) {
  const db = adminClient();
  const { error } = await db.from("proyectos").delete().eq("id", id);
  if (error) { console.error("[admin] deleteProject:", error); throw new Error(error.message); }
  revalidatePath("/", "layout");
}

export async function createServiceAction(service: Service) {
  const db = adminClient();
  const { error } = await db.from("servicios").insert(service);
  if (error) { console.error("[admin] createService:", error); throw new Error(error.message); }
  revalidatePath("/", "layout");
}

export async function updateServiceAction(id: string, updates: Partial<Service>) {
  const db = adminClient();
  const { error } = await db.from("servicios").update(updates).eq("id", id);
  if (error) { console.error("[admin] updateService:", error); throw new Error(error.message); }
  revalidatePath("/", "layout");
}

export async function deleteServiceAction(id: string) {
  const db = adminClient();
  const { error } = await db.from("servicios").delete().eq("id", id);
  if (error) { console.error("[admin] deleteService:", error); throw new Error(error.message); }
  revalidatePath("/", "layout");
}

export async function reorderServiceAction(id: string, newOrder: number) {
  const db = adminClient();
  const { error } = await db.from("servicios").update({ order: newOrder }).eq("id", id);
  if (error) { console.error("[admin] reorderService:", error); throw new Error(error.message); }
  revalidatePath("/", "layout");
}

export async function uploadImageAction(formData: FormData): Promise<string> {
  const db = adminClient();
  const file = formData.get("file") as File;
  if (!file || file.size === 0) throw new Error("No se seleccionó ningún archivo");
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `projects/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const { data, error } = await db.storage
    .from("project-images")
    .upload(path, buffer, { contentType: file.type, upsert: false });
  if (error) { console.error("[admin] uploadImage:", error); throw new Error(error.message); }
  const { data: { publicUrl } } = db.storage.from("project-images").getPublicUrl(data.path);
  return publicUrl;
}

export async function updateMessageStatusAction(
  id: string,
  status: ContactMessage["status"]
): Promise<Pick<ContactMessage, "status"> | null> {
  const db = adminClient();
  const { data } = await db
    .from("mensajes_contacto")
    .update({ status })
    .eq("id", id)
    .select("status")
    .single();
  if (data) revalidatePath("/", "layout");
  return data ?? null;
}
