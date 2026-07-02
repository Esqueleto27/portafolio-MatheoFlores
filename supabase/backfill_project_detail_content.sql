-- backfill_project_detail_content.sql
-- One-off backfill for the 7 existing projects (run once in the Supabase SQL Editor,
-- after 002_project_detail_fields.sql). Populates description/objective/challenges/
-- results/features to match src/lib/mock-data.ts. Screenshots are left empty — add
-- those later from /admin/projects/[id]/edit once you have real images.

update public.proyectos set
  description_es = 'Tienda online para un taller artesanal, con catálogo, pagos y gestión de inventario propia.',
  description_en = 'Online store for an artisan workshop, with catalog, payments and self-managed inventory.',
  objective_es = 'Que el taller pudiera vender fuera de Instagram y llegar a clientes que no usan redes sociales.',
  objective_en = 'Get the workshop selling beyond Instagram and reach customers who don''t use social media.',
  challenges_es = 'Necesitaba un checkout simple para clientes poco familiarizados con compras online, y sincronizar el inventario en tiempo real para evitar vender piezas artesanales de stock único que ya no existían.',
  challenges_en = 'The checkout had to stay simple for customers unfamiliar with online shopping, and inventory needed real-time sync to avoid selling one-of-a-kind pieces that were already gone.',
  results_es = 'El taller ahora vende directamente desde su web, sin depender de que un cliente le escriba por Instagram, y controla su inventario sin hojas de cálculo.',
  results_en = 'The workshop now sells directly from its website instead of relying on Instagram DMs, and manages inventory without spreadsheets.',
  features = '[
    {"title_es":"Catálogo de productos","title_en":"Product catalog","benefit_es":"el cliente ve todo el catálogo con fotos y precios sin tener que pedirlo por mensaje.","benefit_en":"customers browse the full catalog with photos and prices without messaging to ask."},
    {"title_es":"Pago con tarjeta (Stripe)","title_en":"Card payments (Stripe)","benefit_es":"el cliente compra y paga en el momento, sin transferencias ni esperar confirmación manual.","benefit_en":"customers buy and pay instantly, no bank transfers or waiting for manual confirmation."},
    {"title_es":"Panel de inventario","title_en":"Inventory dashboard","benefit_es":"el dueño actualiza el stock de cada pieza artesanal él mismo, sin depender de un programador.","benefit_en":"the owner updates stock for each piece himself, without needing a developer."}
  ]'::jsonb
where slug = 'tienda-artesanias-quito';

update public.proyectos set
  description_es = 'Sitio web optimizado para SEO local de un restaurante del centro histórico de Quito.',
  description_en = 'Local-SEO-optimized website for a restaurant in Quito''s historic center.',
  objective_es = 'Que el restaurante apareciera en Google para quienes buscan dónde comer en el centro, sin depender solo del boca a boca.',
  objective_en = 'Get the restaurant showing up on Google for people searching where to eat downtown, instead of relying only on word of mouth.',
  challenges_es = 'El reto fue optimizar la velocidad de carga y la estructura SEO sin perder el diseño visual que el dueño quería, y configurar bien Google Business para que ambos canales trabajaran juntos.',
  challenges_en = 'The challenge was optimizing load speed and SEO structure without losing the visual design the owner wanted, and configuring Google Business correctly so both channels worked together.',
  results_es = 'En tres meses empezó a aparecer en los primeros resultados locales de Google.',
  results_en = 'Within three months it started appearing in top local Google results.',
  features = '[
    {"title_es":"Menú digital actualizable","title_en":"Editable digital menu","benefit_es":"el dueño cambia platos y precios él mismo, sin depender de reimprimir cartas físicas.","benefit_en":"the owner updates dishes and prices himself, without reprinting physical menus."},
    {"title_es":"SEO local","title_en":"Local SEO","benefit_es":"el restaurante aparece cuando alguien busca ''dónde comer'' cerca de esa zona, no solo por su nombre.","benefit_en":"the restaurant shows up when someone searches ''where to eat'' nearby, not just by name."},
    {"title_es":"Galería de fotos y reseñas","title_en":"Photo gallery and reviews","benefit_es":"el cliente decide visitar el lugar antes de llegar, viendo fotos reales y opiniones.","benefit_en":"customers decide to visit before arriving, seeing real photos and reviews."}
  ]'::jsonb
where slug = 'restaurante-la-ronda';

update public.proyectos set
  description_es = 'Portafolio visual para una fotógrafa profesional, con galerías por categoría y carga rápida de imágenes.',
  description_en = 'Visual portfolio for a professional photographer, with category galleries and fast image loading.',
  objective_es = 'Que pudiera mostrar su trabajo de forma profesional a clientes corporativos, más allá de Instagram.',
  objective_en = 'Let her present her work professionally to corporate clients, beyond Instagram.',
  challenges_es = 'El reto fue optimizar decenas de imágenes en alta resolución sin sacrificar calidad visual, manteniendo tiempos de carga rápidos incluso en conexiones móviles.',
  challenges_en = 'The challenge was optimizing dozens of high-resolution images without sacrificing visual quality, keeping load times fast even on mobile connections.',
  results_es = 'Ahora envía un solo link a marcas y agencias en vez de compartir carpetas de Drive o su perfil de Instagram.',
  results_en = 'She now sends a single link to brands and agencies instead of sharing Drive folders or her Instagram profile.',
  features = '[
    {"title_es":"Galerías por categoría","title_en":"Category galleries","benefit_es":"el cliente encuentra rápido el tipo de trabajo que busca (bodas, retratos, eventos) sin scrollear todo.","benefit_en":"clients quickly find the type of work they need (weddings, portraits, events) without scrolling everything."},
    {"title_es":"Carga rápida de imágenes","title_en":"Fast image loading","benefit_es":"las fotos se ven nítidas y cargan al instante, incluso en celular.","benefit_en":"photos look sharp and load instantly, even on mobile."},
    {"title_es":"Formulario de contacto directo","title_en":"Direct contact form","benefit_es":"un cliente interesado la contrata sin salir del sitio.","benefit_en":"an interested client can hire her without leaving the site."}
  ]'::jsonb
where slug = 'portafolio-fotografa';

update public.proyectos set
  description_es = 'Landing page de lanzamiento para un curso online de finanzas personales.',
  description_en = 'Launch landing page for an online personal finance course.',
  objective_es = 'Convertir a personas interesadas en el curso en compradores, con una página enfocada 100% en la venta.',
  objective_en = 'Turn people interested in the course into buyers, with a page focused entirely on conversion.',
  challenges_es = 'El reto fue generar urgencia real (cupos limitados) sin que se sintiera forzado, y conectar el botón de compra directo con la pasarela de pago sin fricciones.',
  challenges_en = 'The challenge was creating real urgency (limited spots) without it feeling forced, and connecting the direct purchase button to the payment gateway without friction.',
  results_es = 'Vendió el 80% de los cupos disponibles en la primera semana de lanzamiento.',
  results_en = 'They sold 80% of available spots in the first week after launch.',
  features = '[
    {"title_es":"Contador de plazas","title_en":"Seat counter","benefit_es":"el visitante ve cuántos cupos quedan y decide comprar antes de perder su lugar.","benefit_en":"visitors see how many spots are left and decide to buy before losing their seat."},
    {"title_es":"Testimonios en video","title_en":"Video testimonials","benefit_es":"quien duda del curso ve resultados de alumnos reales antes de pagar.","benefit_en":"someone unsure about the course sees real student results before paying."},
    {"title_es":"Compra directa","title_en":"Direct checkout","benefit_es":"paga en el momento sin salir del sitio ni escribir por WhatsApp para coordinar el pago.","benefit_en":"pays instantly without leaving the site or messaging on WhatsApp to arrange payment."}
  ]'::jsonb
where slug = 'landing-curso-online';

update public.proyectos set
  description_es = 'App web a medida para reemplazar las hojas de cálculo de inventario de una distribuidora.',
  description_en = 'Custom web app to replace a distributor''s spreadsheet-based inventory.',
  objective_es = 'Que la distribuidora dejara de perder el rastro de productos y de duplicar pedidos a proveedores por errores manuales.',
  objective_en = 'Stop the distributor from losing track of products and duplicating supplier orders due to manual errors.',
  challenges_es = 'El mayor reto fue diseñar las alertas de stock bajo para que fueran útiles sin saturar al equipo de notificaciones, y migrar años de datos históricos desde hojas de cálculo sin perder información.',
  challenges_en = 'The biggest challenge was designing low-stock alerts that were useful without overwhelming the team with notifications, and migrating years of historical data from spreadsheets without losing information.',
  results_es = 'Redujeron los errores de inventario en un 90% y dejaron de generar pedidos duplicados a proveedores.',
  results_en = 'They reduced inventory errors by 90% and stopped generating duplicate supplier orders.',
  features = '[
    {"title_es":"Panel de control","title_en":"Dashboard","benefit_es":"el encargado ve de un vistazo qué productos están por agotarse, sin abrir ningún Excel.","benefit_en":"the manager sees at a glance which products are about to run out, without opening any spreadsheet."},
    {"title_es":"Alertas de stock bajo","title_en":"Low-stock alerts","benefit_es":"el sistema avisa antes de que un producto se agote, evitando ventas perdidas.","benefit_en":"the system warns before a product runs out, avoiding lost sales."},
    {"title_es":"Órdenes de compra automáticas","title_en":"Automatic purchase orders","benefit_es":"ya no se piden productos duplicados a proveedores por error humano.","benefit_en":"duplicate supplier orders from human error no longer happen."}
  ]'::jsonb
where slug = 'app-gestion-inventarios';

update public.proyectos set
  description_es = 'Rediseño de sitio web con SEO completo para una corredora de propiedades.',
  description_en = 'Full website redesign with complete SEO for a real estate agency.',
  objective_es = 'Que el sitio volviera a aparecer en Google y generara consultas reales de compradores interesados.',
  objective_en = 'Get the site showing up on Google again and generating real inquiries from interested buyers.',
  challenges_es = 'El reto fue reestructurar todo el SEO técnico de un sitio desactualizado (URLs, metadatos, velocidad) sin perder el poco tráfico que ya tenía durante la migración.',
  challenges_en = 'The challenge was restructuring all the technical SEO of an outdated site (URLs, metadata, speed) without losing the little traffic it already had during the migration.',
  results_es = 'En 2 meses triplicó las consultas de clientes interesados en propiedades.',
  results_en = 'Within 2 months, inquiries from interested buyers tripled.',
  features = '[
    {"title_es":"Listado con filtros","title_en":"Filterable listings","benefit_es":"el comprador filtra por zona y precio y encuentra propiedades que le interesan en segundos.","benefit_en":"buyers filter by area and price and find properties they''re interested in within seconds."},
    {"title_es":"Formulario de contacto integrado","title_en":"Integrated contact form","benefit_es":"un interesado deja sus datos directamente en la ficha de la propiedad, sin llamar.","benefit_en":"an interested buyer leaves their info directly on the listing page, without calling."},
    {"title_es":"SEO técnico completo","title_en":"Full technical SEO","benefit_es":"la corredora aparece en Google cuando alguien busca propiedades en su zona.","benefit_en":"the agency shows up on Google when someone searches for properties in their area."}
  ]'::jsonb
where slug = 'sitio-corredora-propiedades';

update public.proyectos set
  description_es = 'Landing page de registro para una conferencia de tecnología en Quito.',
  description_en = 'Registration landing page for a tech conference in Quito.',
  objective_es = 'Registrar asistentes y patrocinadores en menos de dos semanas, con un proceso de pago integrado.',
  objective_en = 'Register attendees and sponsors in under two weeks, with an integrated payment process.',
  challenges_es = 'El reto fue construir y lanzar la página completa —incluyendo pagos— en menos de dos semanas, sin sacrificar el diseño ni la confiabilidad del checkout.',
  challenges_en = 'The challenge was building and launching the entire page —including payments— in under two weeks, without sacrificing design or checkout reliability.',
  results_es = 'Registraron más de 300 asistentes en los primeros 10 días desde el lanzamiento.',
  results_en = 'They registered over 300 attendees in the first 10 days after launch.',
  features = '[
    {"title_es":"Contador regresivo","title_en":"Countdown timer","benefit_es":"el visitante siente la urgencia de registrarse antes de que se acabe el tiempo.","benefit_en":"visitors feel the urgency to register before time runs out."},
    {"title_es":"Grid de speakers","title_en":"Speaker grid","benefit_es":"el asistente ve quién va a hablar antes de decidir comprar su entrada.","benefit_en":"attendees see who''s speaking before deciding to buy a ticket."},
    {"title_es":"Pasarela de pago integrada","title_en":"Integrated payment gateway","benefit_es":"compra su entrada al instante, sin transferencias ni coordinación manual.","benefit_en":"buys a ticket instantly, no bank transfers or manual coordination."}
  ]'::jsonb
where slug = 'landing-evento-tech';
