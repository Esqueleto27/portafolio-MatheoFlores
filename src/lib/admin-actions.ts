"use server";

import { revalidatePath, updateTag } from "next/cache";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "./prisma";
import { requireAdmin } from "./require-admin";
import type { Project, Service } from "./types";
import type { ContactMessage } from "./data";
import type { Prisma } from "@prisma/client";

function toProyectoData(project: Partial<Omit<Project, "id">>): Prisma.ProyectoUncheckedUpdateInput {
  const data: Prisma.ProyectoUncheckedUpdateInput = {};
  if (project.slug !== undefined) data.slug = project.slug;
  if (project.category !== undefined) data.category = project.category;
  if (project.service_id !== undefined) data.serviceId = project.service_id;
  if (project.custom_tag_es !== undefined) data.customTagEs = project.custom_tag_es || null;
  if (project.custom_tag_en !== undefined) data.customTagEn = project.custom_tag_en || null;
  if (project.featured !== undefined) data.featured = project.featured;
  if (project.business_es !== undefined) data.businessEs = project.business_es;
  if (project.business_en !== undefined) data.businessEn = project.business_en;
  if (project.description_es !== undefined) data.descriptionEs = project.description_es || null;
  if (project.description_en !== undefined) data.descriptionEn = project.description_en || null;
  if (project.objective_es !== undefined) data.objectiveEs = project.objective_es || null;
  if (project.objective_en !== undefined) data.objectiveEn = project.objective_en || null;
  if (project.problem_es !== undefined) data.problemEs = project.problem_es;
  if (project.problem_en !== undefined) data.problemEn = project.problem_en;
  if (project.solution_es !== undefined) data.solutionEs = project.solution_es;
  if (project.solution_en !== undefined) data.solutionEn = project.solution_en;
  if (project.challenges_es !== undefined) data.challengesEs = project.challenges_es || null;
  if (project.challenges_en !== undefined) data.challengesEn = project.challenges_en || null;
  if (project.results_es !== undefined) data.resultsEs = project.results_es || null;
  if (project.results_en !== undefined) data.resultsEn = project.results_en || null;
  if (project.features !== undefined)
    data.features = project.features as unknown as Prisma.InputJsonValue;
  if (project.technologies !== undefined) data.technologies = project.technologies;
  if (project.live_url !== undefined) data.liveUrl = project.live_url || null;
  if (project.github_url !== undefined) data.githubUrl = project.github_url || null;
  if (project.show_code !== undefined) data.showCode = project.show_code;
  if (project.video_url !== undefined) data.videoUrl = project.video_url || null;
  if (project.image_url !== undefined) data.imageUrl = project.image_url || null;
  if (project.mobile_image_url !== undefined) data.mobileImageUrl = project.mobile_image_url || null;
  if (project.before_image_url !== undefined) data.beforeImageUrl = project.before_image_url || null;
  if (project.before_mobile_image_url !== undefined)
    data.beforeMobileImageUrl = project.before_mobile_image_url || null;
  return data;
}

export async function createProjectAction(project: Omit<Project, "id">) {
  await requireAdmin();
  await prisma.proyecto.create({
    data: toProyectoData(project) as Prisma.ProyectoUncheckedCreateInput,
  });
  updateTag("projects");
  revalidatePath("/", "layout");
}

export async function updateProjectAction(id: string, updates: Partial<Project>) {
  await requireAdmin();
  await prisma.proyecto.update({ where: { id }, data: toProyectoData(updates) });
  updateTag("projects");
  revalidatePath("/", "layout");
}

export async function deleteProjectAction(id: string) {
  await requireAdmin();
  await prisma.proyecto.delete({ where: { id } });
  updateTag("projects");
  revalidatePath("/", "layout");
}

export async function createServiceAction(service: Service) {
  await requireAdmin();
  await prisma.servicio.create({
    data: {
      id: service.id,
      nameEs: service.name_es,
      nameEn: service.name_en,
      descriptionEs: service.description_es,
      descriptionEn: service.description_en,
      order: service.order,
    },
  });
  updateTag("services");
  revalidatePath("/", "layout");
}

export async function updateServiceAction(id: string, updates: Partial<Service>) {
  await requireAdmin();
  await prisma.servicio.update({
    where: { id },
    data: {
      ...(updates.name_es !== undefined && { nameEs: updates.name_es }),
      ...(updates.name_en !== undefined && { nameEn: updates.name_en }),
      ...(updates.description_es !== undefined && { descriptionEs: updates.description_es }),
      ...(updates.description_en !== undefined && { descriptionEn: updates.description_en }),
      ...(updates.order !== undefined && { order: updates.order }),
    },
  });
  updateTag("services");
  revalidatePath("/", "layout");
}

export async function deleteServiceAction(id: string) {
  await requireAdmin();
  await prisma.servicio.delete({ where: { id } });
  updateTag("services");
  revalidatePath("/", "layout");
}

export async function reorderServiceAction(id: string, newOrder: number) {
  await requireAdmin();
  await prisma.servicio.update({ where: { id }, data: { order: newOrder } });
  updateTag("services");
  revalidatePath("/", "layout");
}

const ALLOWED_IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB

// Writes to the local filesystem under public/uploads — this assumes a
// persistent disk (the VPS this app is deployed on), not ephemeral
// serverless storage. Served directly by Next.js as a static public asset.
export async function uploadImageAction(formData: FormData): Promise<string> {
  await requireAdmin();
  const file = formData.get("file") as File;
  if (!file || file.size === 0) throw new Error("No se seleccionó ningún archivo");
  if (file.size > MAX_IMAGE_BYTES) throw new Error("La imagen supera el límite de 5MB");
  const ext = ALLOWED_IMAGE_TYPES[file.type];
  if (!ext) throw new Error("Formato no permitido. Usa JPG, PNG o WebP.");

  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", "projects");
  await mkdir(uploadDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, filename), buffer);

  return `/uploads/projects/${filename}`;
}

export async function updateMessageStatusAction(
  id: string,
  status: ContactMessage["status"]
): Promise<Pick<ContactMessage, "status"> | null> {
  await requireAdmin();
  // No revalidatePath here: messages never appear on public pages, so
  // purging the whole site's cache on every toggle/delete is pure waste —
  // the admin routes are force-dynamic and re-render on their own.
  const row = await prisma.mensajeContacto.update({ where: { id }, data: { status } });
  return { status: row.status };
}

export async function deleteMessageAction(id: string) {
  await requireAdmin();
  await prisma.mensajeContacto.delete({ where: { id } });
}
