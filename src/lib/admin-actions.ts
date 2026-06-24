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
  await db.from("proyectos").insert(project);
  revalidatePath("/", "layout");
}

export async function updateProjectAction(id: string, updates: Partial<Project>) {
  const db = adminClient();
  await db.from("proyectos").update(updates).eq("id", id);
  revalidatePath("/", "layout");
}

export async function deleteProjectAction(id: string) {
  const db = adminClient();
  await db.from("proyectos").delete().eq("id", id);
  revalidatePath("/", "layout");
}

export async function createServiceAction(service: Service) {
  const db = adminClient();
  await db.from("servicios").insert(service);
  revalidatePath("/", "layout");
}

export async function updateServiceAction(id: string, updates: Partial<Service>) {
  const db = adminClient();
  await db.from("servicios").update(updates).eq("id", id);
  revalidatePath("/", "layout");
}

export async function deleteServiceAction(id: string) {
  const db = adminClient();
  await db.from("servicios").delete().eq("id", id);
  revalidatePath("/", "layout");
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
