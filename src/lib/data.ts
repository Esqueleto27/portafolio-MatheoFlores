import { cache } from "react";
import { asc, desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { proyectos, servicios, mensajesContacto } from "@/db/schema";
import type { Proyecto, Servicio, MensajeContacto } from "@/db/schema";
import { requireAdmin } from "./require-admin";
import type { Project, Service, Locale } from "./types";

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

function mapServicio(s: Servicio): Service {
  return {
    id: s.id,
    name_es: s.nameEs,
    name_en: s.nameEn,
    description_es: s.descriptionEs,
    description_en: s.descriptionEn,
    order: s.order,
  };
}

function mapProyecto(p: Proyecto): Project {
  return {
    id: p.id,
    slug: p.slug,
    created_at: p.createdAt.toISOString(),
    category: p.category,
    service_id: p.serviceId,
    custom_tag_es: p.customTagEs ?? undefined,
    custom_tag_en: p.customTagEn ?? undefined,
    featured: p.featured,
    business_es: p.businessEs,
    business_en: p.businessEn,
    description_es: p.descriptionEs ?? undefined,
    description_en: p.descriptionEn ?? undefined,
    objective_es: p.objectiveEs ?? undefined,
    objective_en: p.objectiveEn ?? undefined,
    problem_es: p.problemEs,
    problem_en: p.problemEn,
    solution_es: p.solutionEs,
    solution_en: p.solutionEn,
    challenges_es: p.challengesEs ?? undefined,
    challenges_en: p.challengesEn ?? undefined,
    results_es: p.resultsEs ?? undefined,
    results_en: p.resultsEn ?? undefined,
    features: p.features,
    technologies: p.technologies,
    live_url: p.liveUrl ?? undefined,
    github_url: p.githubUrl ?? undefined,
    show_code: p.showCode,
    video_url: p.videoUrl ?? undefined,
    image_url: p.imageUrl,
    mobile_image_url: p.mobileImageUrl,
    before_image_url: p.beforeImageUrl,
    before_mobile_image_url: p.beforeMobileImageUrl,
  };
}

function mapMensaje(m: MensajeContacto): ContactMessage {
  return {
    id: m.id,
    name: m.name,
    email: m.email,
    service_id: m.serviceId,
    timeline: m.timeline,
    message: m.message,
    status: m.status,
    created_at: m.createdAt.toISOString(),
  };
}

// D1 is read on every request (the pages that call these are
// force-dynamic), so admin edits show up immediately with no cache to
// invalidate. React's cache() only dedupes calls within one render — e.g.
// generateMetadata and the page both asking for the same project.
export const getServices = cache(async (): Promise<Service[]> => {
  const db = await getDb();
  const rows = await db.select().from(servicios).orderBy(asc(servicios.order));
  return rows.map(mapServicio);
});

export const getProjects = cache(async (): Promise<Project[]> => {
  const db = await getDb();
  const rows = await db.select().from(proyectos).orderBy(desc(proyectos.createdAt));
  return rows.map(mapProyecto);
});

export const getFeaturedProjects = cache(async (): Promise<Project[]> => {
  const db = await getDb();
  const rows = await db
    .select()
    .from(proyectos)
    .where(eq(proyectos.featured, true))
    .orderBy(desc(proyectos.createdAt));
  return rows.map(mapProyecto);
});

export async function getProjectById(id: string): Promise<Project | undefined> {
  const db = await getDb();
  const row = await db.query.proyectos.findFirst({ where: eq(proyectos.id, id) });
  return row ? mapProyecto(row) : undefined;
}

export async function getServiceById(id: string): Promise<Service | undefined> {
  const db = await getDb();
  const row = await db.query.servicios.findFirst({ where: eq(servicios.id, id) });
  return row ? mapServicio(row) : undefined;
}

export const getProjectBySlug = cache(async (slug: string): Promise<Project | undefined> => {
  const db = await getDb();
  const row = await db.query.proyectos.findFirst({ where: eq(proyectos.slug, slug) });
  return row ? mapProyecto(row) : undefined;
});

export const getServiceName = cache(async (id: string, locale: Locale): Promise<string> => {
  const service = (await getServices()).find((s) => s.id === id);
  if (!service) return id;
  return locale === "en" ? service.name_en : service.name_es;
});

export async function getMessages(): Promise<ContactMessage[]> {
  // Re-validates the caller's session on every call — this is the real
  // access-control boundary, not the UI.
  await requireAdmin();
  const db = await getDb();
  const rows = await db.select().from(mensajesContacto).orderBy(desc(mensajesContacto.createdAt));
  return rows.map(mapMensaje);
}

export async function createMessage(
  msg: Omit<ContactMessage, "id" | "created_at" | "status">
): Promise<ContactMessage | null> {
  const db = await getDb();
  const [row] = await db
    .insert(mensajesContacto)
    .values({
      name: msg.name,
      email: msg.email,
      serviceId: msg.service_id,
      timeline: msg.timeline as MensajeContacto["timeline"],
      message: msg.message,
    })
    .returning();
  return row ? mapMensaje(row) : null;
}
