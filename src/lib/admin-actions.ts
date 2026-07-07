"use server";

import { revalidatePath, updateTag } from "next/cache";
import { getAdminSupabase } from "./supabase/admin";
import { requireAdmin } from "./supabase/server";
import type { Project, Service } from "./types";
import type { ContactMessage } from "./data";

// Every action in this file uses the service-role key, which bypasses RLS.
// requireAdmin() re-validates the caller's session against Supabase Auth
// on every call — this is the real access-control boundary, not the UI.
async function adminClient() {
  await requireAdmin();
  const client = getAdminSupabase();
  if (!client) throw new Error("SUPABASE_SERVICE_ROLE_KEY no configurado");
  return client;
}

export async function createProjectAction(project: Omit<Project, "id">) {
  const db = await adminClient();
  const { error } = await db.from("proyectos").insert(project);
  if (error) { console.error("[admin] createProject:", error); throw new Error(error.message); }
  updateTag("projects");
  revalidatePath("/", "layout");
}

export async function updateProjectAction(id: string, updates: Partial<Project>) {
  const db = await adminClient();
  const { error } = await db.from("proyectos").update(updates).eq("id", id);
  if (error) { console.error("[admin] updateProject:", error); throw new Error(error.message); }
  updateTag("projects");
  revalidatePath("/", "layout");
}

export async function deleteProjectAction(id: string) {
  const db = await adminClient();
  const { error } = await db.from("proyectos").delete().eq("id", id);
  if (error) { console.error("[admin] deleteProject:", error); throw new Error(error.message); }
  updateTag("projects");
  revalidatePath("/", "layout");
}

export async function createServiceAction(service: Service) {
  const db = await adminClient();
  const { error } = await db.from("servicios").insert(service);
  if (error) { console.error("[admin] createService:", error); throw new Error(error.message); }
  updateTag("services");
  revalidatePath("/", "layout");
}

export async function updateServiceAction(id: string, updates: Partial<Service>) {
  const db = await adminClient();
  const { error } = await db.from("servicios").update(updates).eq("id", id);
  if (error) { console.error("[admin] updateService:", error); throw new Error(error.message); }
  updateTag("services");
  revalidatePath("/", "layout");
}

export async function deleteServiceAction(id: string) {
  const db = await adminClient();
  const { error } = await db.from("servicios").delete().eq("id", id);
  if (error) { console.error("[admin] deleteService:", error); throw new Error(error.message); }
  updateTag("services");
  revalidatePath("/", "layout");
}

export async function reorderServiceAction(id: string, newOrder: number) {
  const db = await adminClient();
  const { error } = await db.from("servicios").update({ order: newOrder }).eq("id", id);
  if (error) { console.error("[admin] reorderService:", error); throw new Error(error.message); }
  updateTag("services");
  revalidatePath("/", "layout");
}

const ALLOWED_IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB

export async function uploadImageAction(formData: FormData): Promise<string> {
  const db = await adminClient();
  const file = formData.get("file") as File;
  if (!file || file.size === 0) throw new Error("No se seleccionó ningún archivo");
  if (file.size > MAX_IMAGE_BYTES) throw new Error("La imagen supera el límite de 5MB");
  const ext = ALLOWED_IMAGE_TYPES[file.type];
  if (!ext) throw new Error("Formato no permitido. Usa JPG, PNG o WebP.");
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
  const db = await adminClient();
  // No revalidatePath here: messages never appear on public pages, so
  // purging the whole site's cache on every toggle/delete is pure waste —
  // the admin routes are force-dynamic and re-render on their own.
  const { data } = await db
    .from("mensajes_contacto")
    .update({ status })
    .eq("id", id)
    .select("status")
    .single();
  return data ?? null;
}

export async function deleteMessageAction(id: string) {
  const db = await adminClient();
  const { error } = await db.from("mensajes_contacto").delete().eq("id", id);
  if (error) { console.error("[admin] deleteMessage:", error); throw new Error(error.message); }
}
