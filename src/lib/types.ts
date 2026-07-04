export type Locale = "es" | "en";

export interface Service {
  id: string;
  name_es: string;
  name_en: string;
  description_es: string;
  description_en: string;
  order: number;
  image_url?: string | null;
}

export interface Feature {
  title_es: string;
  title_en: string;
  benefit_es: string;
  benefit_en: string;
}

export interface Project {
  id: string;
  slug: string;
  created_at?: string;
  category: "cliente" | "demo";
  service_id: string;
  custom_tag_es?: string;
  custom_tag_en?: string;
  featured: boolean;
  business_es: string;
  business_en: string;
  description_es?: string;
  description_en?: string;
  objective_es?: string;
  objective_en?: string;
  problem_es: string;
  problem_en: string;
  solution_es: string;
  solution_en: string;
  challenges_es?: string;
  challenges_en?: string;
  results_es?: string;
  results_en?: string;
  features?: Feature[];
  technologies: string[];
  live_url?: string;
  github_url?: string;
  show_code?: boolean;
  video_url?: string;
  image_url?: string | null;
  mobile_image_url?: string | null;
  before_image_url?: string | null;
  before_mobile_image_url?: string | null;
}

// Resolves the display name for a project's service using the real
// (DB-backed) services list the caller already fetched — falls back to
// the project's custom tag override when set.
export function resolveServiceName(
  project: Pick<Project, "service_id" | "custom_tag_es" | "custom_tag_en">,
  services: Service[],
  locale: Locale
): string {
  const customTag = locale === "en" ? project.custom_tag_en : project.custom_tag_es;
  if (customTag) return customTag;
  const service = services.find((s) => s.id === project.service_id);
  if (!service) return project.service_id;
  return locale === "en" ? service.name_en : service.name_es;
}
