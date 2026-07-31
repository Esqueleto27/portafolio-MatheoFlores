import { unstable_cache } from "next/cache";
import { prisma } from "./prisma";
import { requireAdmin } from "./require-admin";
import type { Project, Service, Feature, Locale } from "./types";
import type { Proyecto, Servicio, MensajeContacto } from "@prisma/client";

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
    features: (p.features as unknown as Feature[]) ?? undefined,
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

// Public read paths are cached at the data layer — independent of whether
// the route itself renders statically — and invalidated by admin-actions.ts
// via updateTag() on every write, so edits show up immediately.
export const getServices = unstable_cache(
  async (): Promise<Service[]> => {
    const rows = await prisma.servicio.findMany({ orderBy: { order: "asc" } });
    return rows.map(mapServicio);
  },
  ["services"],
  { tags: ["services"], revalidate: 3600 }
);

export const getProjects = unstable_cache(
  async (): Promise<Project[]> => {
    const rows = await prisma.proyecto.findMany({ orderBy: { createdAt: "desc" } });
    return rows.map(mapProyecto);
  },
  ["projects"],
  { tags: ["projects"], revalidate: 3600 }
);

export const getFeaturedProjects = unstable_cache(
  async (): Promise<Project[]> => {
    const rows = await prisma.proyecto.findMany({
      where: { featured: true },
      orderBy: { createdAt: "desc" },
    });
    return rows.map(mapProyecto);
  },
  ["featured-projects"],
  { tags: ["projects"], revalidate: 3600 }
);

// Admin needs to see writes immediately, so these stay uncached.
export async function getProjectById(id: string): Promise<Project | undefined> {
  const row = await prisma.proyecto.findUnique({ where: { id } });
  return row ? mapProyecto(row) : undefined;
}

export async function getServiceById(id: string): Promise<Service | undefined> {
  const row = await prisma.servicio.findUnique({ where: { id } });
  return row ? mapServicio(row) : undefined;
}

export const getProjectBySlug = unstable_cache(
  async (slug: string): Promise<Project | undefined> => {
    const row = await prisma.proyecto.findUnique({ where: { slug } });
    return row ? mapProyecto(row) : undefined;
  },
  ["project-by-slug"],
  { tags: ["projects"], revalidate: 3600 }
);

export const getServiceName = unstable_cache(
  async (id: string, locale: Locale): Promise<string> => {
    const row = await prisma.servicio.findUnique({ where: { id } });
    if (!row) return id;
    return locale === "en" ? row.nameEn : row.nameEs;
  },
  ["service-name"],
  { tags: ["services"], revalidate: 3600 }
);

export async function getMessages(): Promise<ContactMessage[]> {
  // Re-validates the caller's session on every call — this is the real
  // access-control boundary, not the UI.
  await requireAdmin();
  const rows = await prisma.mensajeContacto.findMany({ orderBy: { createdAt: "desc" } });
  return rows.map(mapMensaje);
}

export async function createMessage(
  msg: Omit<ContactMessage, "id" | "created_at" | "status">
): Promise<ContactMessage | null> {
  const row = await prisma.mensajeContacto.create({
    data: {
      name: msg.name,
      email: msg.email,
      serviceId: msg.service_id,
      timeline: msg.timeline as "urgent" | "month" | "no_rush" | "exploring",
      message: msg.message,
      status: "pendiente",
    },
  });
  return mapMensaje(row);
}
