import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

config({ path: ".env.local" });

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Local development fixtures — mirrors what used to live in
// supabase/seed.sql before the migration away from Supabase.
// The real production content (Servicios/Proyectos/Mensajes) that was
// live in Supabase is NOT in this file and must be migrated separately.

const SERVICIOS = [
  {
    id: "ecommerce",
    nameEs: "Quiero vender mis productos por internet",
    nameEn: "I want to sell my products online",
    descriptionEs:
      "Tienda online completa: catálogo, carrito, pagos y panel para que manejes tus productos tú mismo.",
    descriptionEn:
      "Full online store: catalog, cart, payments and a panel so you manage your own products.",
    order: 1,
  },
  {
    id: "seo-web",
    nameEs: "Quiero que mi negocio aparezca en Google y lo encuentren",
    nameEn: "I want my business to show up on Google",
    descriptionEs:
      "Página profesional optimizada para que tus clientes te encuentren cuando busquen lo que ofreces.",
    descriptionEn:
      "Professional page optimized so your customers find you when they search for what you offer.",
    order: 2,
  },
  {
    id: "portfolio",
    nameEs: "Quiero mostrar mi trabajo o mi carrera",
    nameEn: "I want to showcase my work or career",
    descriptionEs:
      "Portafolio o CV digital que transmite quién eres y qué has logrado, de forma profesional.",
    descriptionEn:
      "Portfolio or digital resume that shows who you are and what you have achieved, professionally.",
    order: 3,
  },
  {
    id: "landing",
    nameEs: "Quiero promocionar algo puntual",
    nameEn: "I want to promote something specific",
    descriptionEs:
      "Landing page enfocada en convertir visitantes en clientes para un producto, servicio o evento.",
    descriptionEn:
      "Landing page focused on converting visitors into customers for a product, service, or event.",
    order: 4,
  },
  {
    id: "custom",
    nameEs: "No estoy seguro / quiero que me asesores",
    nameEn: "I'm not sure / I'd like some advice",
    descriptionEs:
      "Cuéntame tu idea y te oriento hacia la solución más adecuada para tu negocio.",
    descriptionEn:
      "Tell me your idea and I'll guide you toward the best solution for your business.",
    order: 5,
  },
];

const PROYECTOS = [
  {
    slug: "tienda-artesanias-quito",
    category: "demo" as const,
    serviceId: "ecommerce",
    featured: true,
    businessEs: "Artesanías del Ecuador",
    businessEn: "Ecuador Crafts",
    descriptionEs:
      "Tienda online para un taller artesanal, con catálogo, pagos y gestión de inventario propia.",
    descriptionEn:
      "Online store for an artisan workshop, with catalog, payments and self-managed inventory.",
    objectiveEs:
      "Que el taller pudiera vender fuera de Instagram y llegar a clientes que no usan redes sociales.",
    objectiveEn:
      "Get the workshop selling beyond Instagram and reach customers who don't use social media.",
    problemEs:
      "Un taller artesanal en Quito vendía solo por Instagram, perdiendo clientes que no usaban redes sociales.",
    problemEn:
      "An artisan workshop in Quito was selling only through Instagram, missing customers who don't use social media.",
    solutionEs:
      "Le hice una tienda online donde los clientes pueden ver el catálogo completo, pagar con tarjeta y el dueño maneja su inventario sin depender de nadie.",
    solutionEn:
      "I built them an online store where customers can browse the full catalog, pay by card, and the owner manages their inventory independently.",
    challengesEs:
      "Necesitaba un checkout simple para clientes poco familiarizados con compras online, y sincronizar el inventario en tiempo real para evitar vender piezas artesanales de stock único que ya no existían.",
    challengesEn:
      "The checkout had to stay simple for customers unfamiliar with online shopping, and inventory needed real-time sync to avoid selling one-of-a-kind pieces that were already gone.",
    resultsEs:
      "El taller ahora vende directamente desde su web, sin depender de que un cliente le escriba por Instagram, y controla su inventario sin hojas de cálculo.",
    resultsEn:
      "The workshop now sells directly from its website instead of relying on Instagram DMs, and manages inventory without spreadsheets.",
    features: [
      {
        title_es: "Catálogo de productos",
        title_en: "Product catalog",
        benefit_es:
          "el cliente ve todo el catálogo con fotos y precios sin tener que pedirlo por mensaje.",
        benefit_en:
          "customers browse the full catalog with photos and prices without messaging to ask.",
      },
      {
        title_es: "Pago con tarjeta (Stripe)",
        title_en: "Card payments (Stripe)",
        benefit_es:
          "el cliente compra y paga en el momento, sin transferencias ni esperar confirmación manual.",
        benefit_en:
          "customers buy and pay instantly, no bank transfers or waiting for manual confirmation.",
      },
      {
        title_es: "Panel de inventario",
        title_en: "Inventory dashboard",
        benefit_es:
          "el dueño actualiza el stock de cada pieza artesanal él mismo, sin depender de un programador.",
        benefit_en:
          "the owner updates stock for each piece himself, without needing a developer.",
      },
    ],
    technologies: ["Next.js", "PostgreSQL", "Stripe", "TypeScript"],
    liveUrl: null,
  },
  {
    slug: "restaurante-la-ronda",
    category: "demo" as const,
    serviceId: "seo-web",
    featured: true,
    businessEs: "Restaurante La Ronda",
    businessEn: "La Ronda Restaurant",
    descriptionEs:
      "Sitio web optimizado para SEO local de un restaurante del centro histórico de Quito.",
    descriptionEn:
      "Local-SEO-optimized website for a restaurant in Quito's historic center.",
    objectiveEs:
      "Que el restaurante apareciera en Google para quienes buscan dónde comer en el centro, sin depender solo del boca a boca.",
    objectiveEn:
      "Get the restaurant showing up on Google for people searching where to eat downtown, instead of relying only on word of mouth.",
    problemEs:
      "Un restaurante del centro histórico no aparecía en Google y sus clientes llegaban solo por recomendación boca a boca.",
    problemEn:
      "A historic center restaurant wasn't showing up on Google and customers only found it through word of mouth.",
    solutionEs:
      "Le construí una página optimizada para buscadores con menú, fotos, ubicación y reseñas.",
    solutionEn:
      "I built them a search-optimized page with menu, photos, location and reviews.",
    challengesEs:
      "El reto fue optimizar la velocidad de carga y la estructura SEO sin perder el diseño visual que el dueño quería, y configurar bien Google Business para que ambos canales trabajaran juntos.",
    challengesEn:
      "The challenge was optimizing load speed and SEO structure without losing the visual design the owner wanted, and configuring Google Business correctly so both channels worked together.",
    resultsEs: "En tres meses empezó a aparecer en los primeros resultados locales de Google.",
    resultsEn: "Within three months it started appearing in top local Google results.",
    features: [
      {
        title_es: "Menú digital actualizable",
        title_en: "Editable digital menu",
        benefit_es:
          "el dueño cambia platos y precios él mismo, sin depender de reimprimir cartas físicas.",
        benefit_en:
          "the owner updates dishes and prices himself, without reprinting physical menus.",
      },
      {
        title_es: "SEO local",
        title_en: "Local SEO",
        benefit_es:
          "el restaurante aparece cuando alguien busca 'dónde comer' cerca de esa zona, no solo por su nombre.",
        benefit_en:
          "the restaurant shows up when someone searches 'where to eat' nearby, not just by name.",
      },
      {
        title_es: "Galería de fotos y reseñas",
        title_en: "Photo gallery and reviews",
        benefit_es:
          "el cliente decide visitar el lugar antes de llegar, viendo fotos reales y opiniones.",
        benefit_en:
          "customers decide to visit before arriving, seeing real photos and reviews.",
      },
    ],
    technologies: ["Next.js", "Tailwind CSS", "TypeScript"],
    liveUrl: null,
  },
  {
    slug: "portafolio-fotografa",
    category: "demo" as const,
    serviceId: "portfolio",
    featured: true,
    businessEs: "Daniela López — Fotógrafa",
    businessEn: "Daniela López — Photographer",
    descriptionEs:
      "Portafolio visual para una fotógrafa profesional, con galerías por categoría y carga rápida de imágenes.",
    descriptionEn:
      "Visual portfolio for a professional photographer, with category galleries and fast image loading.",
    objectiveEs:
      "Que pudiera mostrar su trabajo de forma profesional a clientes corporativos, más allá de Instagram.",
    objectiveEn: "Let her present her work professionally to corporate clients, beyond Instagram.",
    problemEs:
      "Una fotógrafa profesional compartía su trabajo solo en Instagram, sin poder presentar un portafolio profesional a clientes corporativos.",
    problemEn:
      "A professional photographer was sharing work only on Instagram, unable to present a professional portfolio to corporate clients.",
    solutionEs:
      "Le diseñé un portafolio visual con galerías por categoría, página de contacto y carga ultra-rápida de imágenes para que nunca pierda a un cliente por lentitud.",
    solutionEn:
      "I designed a visual portfolio with galleries by category, a contact page and ultra-fast image loading so she never loses a client due to slow load times.",
    challengesEs:
      "El reto fue optimizar decenas de imágenes en alta resolución sin sacrificar calidad visual, manteniendo tiempos de carga rápidos incluso en conexiones móviles.",
    challengesEn:
      "The challenge was optimizing dozens of high-resolution images without sacrificing visual quality, keeping load times fast even on mobile connections.",
    resultsEs:
      "Ahora envía un solo link a marcas y agencias en vez de compartir carpetas de Drive o su perfil de Instagram.",
    resultsEn:
      "She now sends a single link to brands and agencies instead of sharing Drive folders or her Instagram profile.",
    features: [
      {
        title_es: "Galerías por categoría",
        title_en: "Category galleries",
        benefit_es:
          "el cliente encuentra rápido el tipo de trabajo que busca (bodas, retratos, eventos) sin scrollear todo.",
        benefit_en:
          "clients quickly find the type of work they need (weddings, portraits, events) without scrolling everything.",
      },
      {
        title_es: "Carga rápida de imágenes",
        title_en: "Fast image loading",
        benefit_es: "las fotos se ven nítidas y cargan al instante, incluso en celular.",
        benefit_en: "photos look sharp and load instantly, even on mobile.",
      },
      {
        title_es: "Formulario de contacto directo",
        title_en: "Direct contact form",
        benefit_es: "un cliente interesado la contrata sin salir del sitio.",
        benefit_en: "an interested client can hire her without leaving the site.",
      },
    ],
    technologies: ["Next.js", "Framer Motion", "PostgreSQL"],
    liveUrl: null,
  },
  {
    slug: "landing-curso-online",
    category: "demo" as const,
    serviceId: "landing",
    featured: false,
    businessEs: "Curso de Finanzas Personales",
    businessEn: "Personal Finance Course",
    descriptionEs: "Landing page de lanzamiento para un curso online de finanzas personales.",
    descriptionEn: "Launch landing page for an online personal finance course.",
    objectiveEs:
      "Convertir a personas interesadas en el curso en compradores, con una página enfocada 100% en la venta.",
    objectiveEn:
      "Turn people interested in the course into buyers, with a page focused entirely on conversion.",
    problemEs:
      "Un coach financiero lanzaba un curso pero no tenía una página convincente para convertir interesados en compradores.",
    problemEn:
      "A financial coach was launching a course but had no convincing page to convert interested people into buyers.",
    solutionEs:
      "Le hice una landing page con testimonios, módulos del curso, contador de plazas y botón de compra directo.",
    solutionEn:
      "I built a landing page with testimonials, course modules, a seat counter and a direct purchase button.",
    challengesEs:
      "El reto fue generar urgencia real (cupos limitados) sin que se sintiera forzado, y conectar el botón de compra directo con la pasarela de pago sin fricciones.",
    challengesEn:
      "The challenge was creating real urgency (limited spots) without it feeling forced, and connecting the direct purchase button to the payment gateway without friction.",
    resultsEs: "Vendió el 80% de los cupos disponibles en la primera semana de lanzamiento.",
    resultsEn: "They sold 80% of available spots in the first week after launch.",
    features: [
      {
        title_es: "Contador de plazas",
        title_en: "Seat counter",
        benefit_es:
          "el visitante ve cuántos cupos quedan y decide comprar antes de perder su lugar.",
        benefit_en: "visitors see how many spots are left and decide to buy before losing their seat.",
      },
      {
        title_es: "Testimonios en video",
        title_en: "Video testimonials",
        benefit_es: "quien duda del curso ve resultados de alumnos reales antes de pagar.",
        benefit_en: "someone unsure about the course sees real student results before paying.",
      },
      {
        title_es: "Compra directa",
        title_en: "Direct checkout",
        benefit_es:
          "paga en el momento sin salir del sitio ni escribir por WhatsApp para coordinar el pago.",
        benefit_en: "pays instantly without leaving the site or messaging on WhatsApp to arrange payment.",
      },
    ],
    technologies: ["Next.js", "Tailwind CSS", "Stripe"],
    liveUrl: null,
  },
  {
    slug: "app-gestion-inventarios",
    category: "cliente" as const,
    serviceId: "custom",
    featured: false,
    businessEs: "Distribuidora El Sol",
    businessEn: "El Sol Distributors",
    descriptionEs: "App web a medida para reemplazar las hojas de cálculo de inventario de una distribuidora.",
    descriptionEn: "Custom web app to replace a distributor's spreadsheet-based inventory.",
    objectiveEs:
      "Que la distribuidora dejara de perder el rastro de productos y de duplicar pedidos a proveedores por errores manuales.",
    objectiveEn:
      "Stop the distributor from losing track of products and duplicating supplier orders due to manual errors.",
    problemEs:
      "Una distribuidora local manejaba su inventario en hojas de cálculo, perdiendo el rastro de productos y generando pedidos duplicados a proveedores.",
    problemEn:
      "A local distributor was managing inventory in spreadsheets, losing track of products and generating duplicate supplier orders.",
    solutionEs:
      "Les desarrollé una app web a medida con panel de control, alertas de stock bajo y generación automática de órdenes de compra.",
    solutionEn:
      "I built a custom web app with a dashboard, low-stock alerts and automatic purchase order generation.",
    challengesEs:
      "El mayor reto fue diseñar las alertas de stock bajo para que fueran útiles sin saturar al equipo de notificaciones, y migrar años de datos históricos desde hojas de cálculo sin perder información.",
    challengesEn:
      "The biggest challenge was designing low-stock alerts that were useful without overwhelming the team with notifications, and migrating years of historical data from spreadsheets without losing information.",
    resultsEs:
      "Redujeron los errores de inventario en un 90% y dejaron de generar pedidos duplicados a proveedores.",
    resultsEn: "They reduced inventory errors by 90% and stopped generating duplicate supplier orders.",
    features: [
      {
        title_es: "Panel de control",
        title_en: "Dashboard",
        benefit_es: "el encargado ve de un vistazo qué productos están por agotarse, sin abrir ningún Excel.",
        benefit_en:
          "the manager sees at a glance which products are about to run out, without opening any spreadsheet.",
      },
      {
        title_es: "Alertas de stock bajo",
        title_en: "Low-stock alerts",
        benefit_es: "el sistema avisa antes de que un producto se agote, evitando ventas perdidas.",
        benefit_en: "the system warns before a product runs out, avoiding lost sales.",
      },
      {
        title_es: "Órdenes de compra automáticas",
        title_en: "Automatic purchase orders",
        benefit_es: "ya no se piden productos duplicados a proveedores por error humano.",
        benefit_en: "duplicate supplier orders from human error no longer happen.",
      },
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    liveUrl: null,
  },
  {
    slug: "sitio-corredora-propiedades",
    category: "cliente" as const,
    serviceId: "seo-web",
    featured: false,
    businessEs: "Corredora de Propiedades MG",
    businessEn: "MG Real Estate",
    descriptionEs: "Rediseño de sitio web con SEO completo para una corredora de propiedades.",
    descriptionEn: "Full website redesign with complete SEO for a real estate agency.",
    objectiveEs:
      "Que el sitio volviera a aparecer en Google y generara consultas reales de compradores interesados.",
    objectiveEn: "Get the site showing up on Google again and generating real inquiries from interested buyers.",
    problemEs:
      "Una corredora de propiedades tenía un sitio web desactualizado que no aparecía en Google y no generaba leads.",
    problemEn: "A real estate agent had an outdated website that didn't appear on Google and generated no leads.",
    solutionEs:
      "Le rediseñé el sitio con listado de propiedades, filtros por zona/precio, formulario de contacto integrado y SEO completo.",
    solutionEn:
      "I redesigned their site with property listings, filters by area/price, an integrated contact form and full SEO.",
    challengesEs:
      "El reto fue reestructurar todo el SEO técnico de un sitio desactualizado (URLs, metadatos, velocidad) sin perder el poco tráfico que ya tenía durante la migración.",
    challengesEn:
      "The challenge was restructuring all the technical SEO of an outdated site (URLs, metadata, speed) without losing the little traffic it already had during the migration.",
    resultsEs: "En 2 meses triplicó las consultas de clientes interesados en propiedades.",
    resultsEn: "Within 2 months, inquiries from interested buyers tripled.",
    features: [
      {
        title_es: "Listado con filtros",
        title_en: "Filterable listings",
        benefit_es: "el comprador filtra por zona y precio y encuentra propiedades que le interesan en segundos.",
        benefit_en:
          "buyers filter by area and price and find properties they're interested in within seconds.",
      },
      {
        title_es: "Formulario de contacto integrado",
        title_en: "Integrated contact form",
        benefit_es: "un interesado deja sus datos directamente en la ficha de la propiedad, sin llamar.",
        benefit_en: "an interested buyer leaves their info directly on the listing page, without calling.",
      },
      {
        title_es: "SEO técnico completo",
        title_en: "Full technical SEO",
        benefit_es: "la corredora aparece en Google cuando alguien busca propiedades en su zona.",
        benefit_en: "the agency shows up on Google when someone searches for properties in their area.",
      },
    ],
    technologies: ["Next.js", "Tailwind CSS", "TypeScript"],
    liveUrl: "https://mg-propiedades.example.com",
  },
  {
    slug: "landing-evento-tech",
    category: "demo" as const,
    serviceId: "landing",
    featured: false,
    businessEs: "Conferencia TechQuito 2025",
    businessEn: "TechQuito 2025 Conference",
    descriptionEs: "Landing page de registro para una conferencia de tecnología en Quito.",
    descriptionEn: "Registration landing page for a tech conference in Quito.",
    objectiveEs:
      "Registrar asistentes y patrocinadores en menos de dos semanas, con un proceso de pago integrado.",
    objectiveEn: "Register attendees and sponsors in under two weeks, with an integrated payment process.",
    problemEs:
      "La organización de una conferencia tech necesitaba una landing para registrar asistentes y patrocinadores en menos de dos semanas.",
    problemEn:
      "A tech conference organization needed a landing page to register attendees and sponsors in under two weeks.",
    solutionEs:
      "Construí una landing con contador regresivo, formulario de registro, grid de speakers y pasarela de pago.",
    solutionEn:
      "I built a landing page with a countdown timer, registration form, speaker grid and payment gateway.",
    challengesEs:
      "El reto fue construir y lanzar la página completa —incluyendo pagos— en menos de dos semanas, sin sacrificar el diseño ni la confiabilidad del checkout.",
    challengesEn:
      "The challenge was building and launching the entire page —including payments— in under two weeks, without sacrificing design or checkout reliability.",
    resultsEs: "Registraron más de 300 asistentes en los primeros 10 días desde el lanzamiento.",
    resultsEn: "They registered over 300 attendees in the first 10 days after launch.",
    features: [
      {
        title_es: "Contador regresivo",
        title_en: "Countdown timer",
        benefit_es: "el visitante siente la urgencia de registrarse antes de que se acabe el tiempo.",
        benefit_en: "visitors feel the urgency to register before time runs out.",
      },
      {
        title_es: "Grid de speakers",
        title_en: "Speaker grid",
        benefit_es: "el asistente ve quién va a hablar antes de decidir comprar su entrada.",
        benefit_en: "attendees see who's speaking before deciding to buy a ticket.",
      },
      {
        title_es: "Pasarela de pago integrada",
        title_en: "Integrated payment gateway",
        benefit_es: "compra su entrada al instante, sin transferencias ni coordinación manual.",
        benefit_en: "buys a ticket instantly, no bank transfers or manual coordination.",
      },
    ],
    technologies: ["Next.js", "Stripe", "Tailwind CSS", "TypeScript"],
    liveUrl: null,
  },
];

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await prisma.user.upsert({
      where: { email: adminEmail.toLowerCase() },
      update: { passwordHash },
      create: { email: adminEmail.toLowerCase(), passwordHash, name: "Admin" },
    });
    console.log(`[seed] admin user ready: ${adminEmail}`);
  } else {
    console.warn("[seed] ADMIN_EMAIL/ADMIN_PASSWORD not set — skipping admin user");
  }

  for (const servicio of SERVICIOS) {
    await prisma.servicio.upsert({
      where: { id: servicio.id },
      update: servicio,
      create: servicio,
    });
  }
  console.log(`[seed] ${SERVICIOS.length} servicios ready`);

  for (const proyecto of PROYECTOS) {
    await prisma.proyecto.upsert({
      where: { slug: proyecto.slug },
      update: proyecto,
      create: proyecto,
    });
  }
  console.log(`[seed] ${PROYECTOS.length} proyectos ready`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
