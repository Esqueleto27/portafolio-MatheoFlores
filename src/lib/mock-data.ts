/* Mock data — reemplazado por Supabase en Tarea 10 */

export type Locale = "es" | "en";

export interface Service {
  id: string;
  name_es: string;
  name_en: string;
  description_es: string;
  description_en: string;
  order: number;
}

export interface Project {
  id: string;
  slug: string;
  category: "cliente" | "demo";
  service_id: string;
  featured: boolean;
  business_es: string;
  business_en: string;
  problem_es: string;
  problem_en: string;
  solution_es: string;
  solution_en: string;
  technologies: string[];
  live_url?: string;
}

/* ── Services (requirements.md §2) ─────────────────────────────── */
export const SERVICES: Service[] = [
  {
    id: "ecommerce",
    name_es: "Quiero vender mis productos por internet",
    name_en: "I want to sell my products online",
    description_es:
      "Tienda online completa: catálogo, carrito, pagos y panel para que manejes tus productos tú mismo.",
    description_en:
      "Full online store: catalog, cart, payments and a panel so you manage your own products.",
    order: 1,
  },
  {
    id: "seo-web",
    name_es: "Quiero que mi negocio aparezca en Google y lo encuentren",
    name_en: "I want my business to show up on Google",
    description_es:
      "Página profesional optimizada para que tus clientes te encuentren cuando busquen lo que ofreces.",
    description_en:
      "Professional page optimized so your customers find you when they search for what you offer.",
    order: 2,
  },
  {
    id: "portfolio",
    name_es: "Quiero mostrar mi trabajo o mi carrera",
    name_en: "I want to showcase my work or career",
    description_es:
      "Portafolio o CV digital que transmite quién eres y qué has logrado, de forma profesional.",
    description_en:
      "Portfolio or digital resume that shows who you are and what you have achieved, professionally.",
    order: 3,
  },
  {
    id: "landing",
    name_es: "Quiero promocionar algo puntual",
    name_en: "I want to promote something specific",
    description_es:
      "Landing page enfocada en convertir visitantes en clientes para un producto, servicio o evento.",
    description_en:
      "Landing page focused on converting visitors into customers for a product, service, or event.",
    order: 4,
  },
  {
    id: "custom",
    name_es: "No estoy seguro / quiero que me asesores",
    name_en: "I'm not sure / I'd like some advice",
    description_es:
      "Cuéntame tu idea y te oriento hacia la solución más adecuada para tu negocio.",
    description_en:
      "Tell me your idea and I'll guide you toward the best solution for your business.",
    order: 5,
  },
];

/* ── Projects (requirements.md §4) ─────────────────────────────── */
export const PROJECTS: Project[] = [
  {
    id: "1",
    slug: "tienda-artesanias-quito",
    category: "demo",
    service_id: "ecommerce",
    featured: true,
    business_es: "Artesanías del Ecuador",
    business_en: "Ecuador Crafts",
    problem_es:
      "Un taller artesanal en Quito vendía solo por Instagram, perdiendo clientes que no usaban redes sociales.",
    problem_en:
      "An artisan workshop in Quito was selling only through Instagram, missing customers who don't use social media.",
    solution_es:
      "Le hice una tienda online donde los clientes pueden ver el catálogo completo, pagar con tarjeta y el dueño maneja su inventario sin depender de nadie.",
    solution_en:
      "I built them an online store where customers can browse the full catalog, pay by card, and the owner manages their inventory independently.",
    technologies: ["Next.js", "Supabase", "Stripe", "TypeScript"],
    live_url: undefined,
  },
  {
    id: "2",
    slug: "restaurante-la-ronda",
    category: "demo",
    service_id: "seo-web",
    featured: true,
    business_es: "Restaurante La Ronda",
    business_en: "La Ronda Restaurant",
    problem_es:
      "Un restaurante del centro histórico no aparecía en Google y sus clientes llegaban solo por recomendación boca a boca.",
    problem_en:
      "A historic center restaurant wasn't showing up on Google and customers only found it through word of mouth.",
    solution_es:
      "Le construí una página optimizada para buscadores con menú, fotos, ubicación y reseñas. En tres meses empezó a aparecer en los primeros resultados locales.",
    solution_en:
      "I built them a search-optimized page with menu, photos, location and reviews. Within three months it started appearing in top local results.",
    technologies: ["Next.js", "Tailwind CSS", "TypeScript"],
    live_url: undefined,
  },
  {
    id: "3",
    slug: "portafolio-fotografa",
    category: "demo",
    service_id: "portfolio",
    featured: true,
    business_es: "Daniela López — Fotógrafa",
    business_en: "Daniela López — Photographer",
    problem_es:
      "Una fotógrafa profesional compartía su trabajo solo en Instagram, sin poder presentar un portafolio profesional a clientes corporativos.",
    problem_en:
      "A professional photographer was sharing work only on Instagram, unable to present a professional portfolio to corporate clients.",
    solution_es:
      "Le diseñé un portafolio visual con galerías por categoría, página de contacto y carga ultra-rápida de imágenes para que nunca pierda a un cliente por lentitud.",
    solution_en:
      "I designed a visual portfolio with galleries by category, a contact page and ultra-fast image loading so she never loses a client due to slow load times.",
    technologies: ["Next.js", "Framer Motion", "Supabase Storage"],
    live_url: undefined,
  },
  {
    id: "4",
    slug: "landing-curso-online",
    category: "demo",
    service_id: "landing",
    featured: false,
    business_es: "Curso de Finanzas Personales",
    business_en: "Personal Finance Course",
    problem_es:
      "Un coach financiero lanzaba un curso pero no tenía una página convincente para convertir interesados en compradores.",
    problem_en:
      "A financial coach was launching a course but had no convincing page to convert interested people into buyers.",
    solution_es:
      "Le hice una landing page con testimonios, módulos del curso, contador de plazas y botón de compra directo. Vendió el 80% de cupos en la primera semana.",
    solution_en:
      "I built a landing page with testimonials, course modules, a seat counter and a direct purchase button. They sold 80% of spots in the first week.",
    technologies: ["Next.js", "Tailwind CSS", "Stripe"],
    live_url: undefined,
  },
  {
    id: "5",
    slug: "app-gestion-inventarios",
    category: "cliente",
    service_id: "custom",
    featured: false,
    business_es: "Distribuidora El Sol",
    business_en: "El Sol Distributors",
    problem_es:
      "Una distribuidora local manejaba su inventario en hojas de cálculo, perdiendo el rastro de productos y generando pedidos duplicados a proveedores.",
    problem_en:
      "A local distributor was managing inventory in spreadsheets, losing track of products and generating duplicate supplier orders.",
    solution_es:
      "Les desarrollé una app web a medida con panel de control, alertas de stock bajo y generación automática de órdenes de compra. Redujeron errores en un 90%.",
    solution_en:
      "I built a custom web app with a dashboard, low-stock alerts and automatic purchase order generation. They reduced errors by 90%.",
    technologies: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    live_url: undefined,
  },
  {
    id: "6",
    slug: "sitio-corredora-propiedades",
    category: "cliente",
    service_id: "seo-web",
    featured: false,
    business_es: "Corredora de Propiedades MG",
    business_en: "MG Real Estate",
    problem_es:
      "Una corredora de propiedades tenía un sitio web desactualizado que no aparecía en Google y no generaba leads.",
    problem_en:
      "A real estate agent had an outdated website that didn't appear on Google and generated no leads.",
    solution_es:
      "Le rediseñé el sitio con listado de propiedades, filtros por zona/precio, formulario de contacto integrado y SEO completo. En 2 meses triplicó las consultas.",
    solution_en:
      "I redesigned their site with property listings, filters by area/price, an integrated contact form and full SEO. Within 2 months inquiries tripled.",
    technologies: ["Next.js", "Tailwind CSS", "TypeScript", "Supabase"],
    live_url: "https://mg-propiedades.example.com",
  },
  {
    id: "7",
    slug: "landing-evento-tech",
    category: "demo",
    service_id: "landing",
    featured: false,
    business_es: "Conferencia TechQuito 2025",
    business_en: "TechQuito 2025 Conference",
    problem_es:
      "La organización de una conferencia tech necesitaba una landing para registrar asistentes y patrocinadores en menos de dos semanas.",
    problem_en:
      "A tech conference organization needed a landing page to register attendees and sponsors in under two weeks.",
    solution_es:
      "Construí una landing con contador regresivo, formulario de registro, grid de speakers y pasarela de pago. Registraron 300+ asistentes en 10 días.",
    solution_en:
      "I built a landing page with a countdown timer, registration form, speaker grid and payment gateway. They registered 300+ attendees in 10 days.",
    technologies: ["Next.js", "Stripe", "Tailwind CSS", "TypeScript"],
    live_url: undefined,
  },
];

/* ── Helpers ────────────────────────────────────────────────────── */
export function getService(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id);
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getServiceName(id: string, locale: Locale): string {
  const s = getService(id);
  if (!s) return id;
  return locale === "en" ? s.name_en : s.name_es;
}

export const CATEGORIES = ["cliente", "demo"] as const;
export type Category = (typeof CATEGORIES)[number];

export function getCategoryLabel(cat: Category, locale: Locale): string {
  if (cat === "cliente") return locale === "en" ? "Client" : "Cliente";
  return "Demo";
}
