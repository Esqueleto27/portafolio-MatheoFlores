# tasks.md — Portafolio de Matheo Flores

> **Fase 5 de 6 — Plan de construcción.** Este documento define *en qué orden*
> se construye la web. Es un **documento vivo**: a medida que se completa cada
> tarea, se marca `[x]` y se anota cualquier decisión nueva que haya surgido
> al implementarla (en una línea de "Nota de implementación" debajo de la
> tarea, si aplica).
>
> Deriva de `business.md`, `requirements.md`,
> `design-spec-portafolio-matheo-flores.md` y `architecture.md` — los cuatro
> ya aprobados. Cualquier IA (Claude Code, Cursor, etc.) debe poder construir
> el proyecto completo leyendo estos 4 documentos, sin haber visto la
> conversación donde se decidieron.
>
> **Regla de oro de esta fase:** cada tarea = un commit. No se mezclan dos
> tareas en un mismo commit. Si al implementar una tarea surge una decisión
> que contradice o completa `architecture.md` o el design-spec, se anota ahí
> primero (ver sección final de este documento) y luego se continúa.

---

## Orden de construcción y por qué

1. **Frontend primero, con datos de prueba** (tareas 1–8). Se construye y se
   *ve* toda la web siguiendo el design-spec, antes de depender de Supabase.
   Decisión de Matheo: ver resultado visual rápido, validar el diseño en
   pantalla real antes de invertir en backend.
2. **Internacionalización (next-intl) desde la tarea 1**, no al final. Cada
   página nace ya bilingüe (`/es/...`, `/en/...`) para no tener que volver a
   tocar cada página después.
3. **Supabase se conecta después** (tareas 9–10), reemplazando los datos de
   prueba por datos reales — sin tocar el diseño ya validado.
4. **Panel admin al final** (tareas 11–13), porque depende de que Supabase ya
   esté funcionando (Auth, tablas, Storage).
5. **Pulido y QA** (tarea 14), justo antes de pasar a `testing.md` (Fase 6).

---

## Leyenda de estado

- `[ ]` Pendiente
- `[x]` Completada

---

## TAREA 1 — Setup del proyecto

`[x]`

**Qué incluye:**
- Proyecto Next.js (App Router) + TypeScript, según `architecture.md` §1–2.
- Tailwind CSS configurado, mapeando los tokens del design-spec §1: dark
  (`--bg #070708`, `--bg2 #0f0f12`, `--card #0d0d10`, `--text #ffffff`,
  `--soft #d6dbe6`, `--muted #8a8f9c`, `--hair`, `--fill`, `--fill2`, `--nav`,
  `--mockup`, `--stripe`, `--accent #2563EB`, `--accent-2 #5b8cff`,
  `--on-accent`) y light (mismos tokens con sus valores propios, design-spec
  §1). Colores fijos (punto disponible verde, semáforo del mockup) también
  como tokens, design-spec §1 "Colores fijos".
- `color-scheme` seteado a `dark`/`light` según el modo activo (design-spec
  §7), para que controles nativos (scrollbars, inputs) acompañen el modo.
- **Modo oscuro por defecto** (`architecture.md` §3.9.1, design-spec §7): el
  sitio carga siempre en dark la primera visita, sin leer
  `prefers-color-scheme`. Toggle manual en la navbar (sol/luna). La elección
  del visitante se guarda (cookie o `localStorage`) y se respeta en visitas
  siguientes.
- Tipografía: paquete npm `geist` (Vercel) — `GeistSans` y `GeistMono`,
  aplicados como variables CSS en el layout raíz (`architecture.md` §3.9.2).
  **No** usar `<link>` de Google Fonts.
- next-intl instalado y configurado con ruteo `/es/...` y `/en/...`
  (`architecture.md` §3.7). Español como locale por defecto.
- Variable `--glow` (0–1) definida globalmente: base `0.7` en dark, `0.4` del
  valor base en light (design-spec §4), ajustable.
- Estructura de carpetas inicial (decidida por Claude Code al implementar,
  `architecture.md` §7).

**Depende de:** `architecture.md` §1, §2, §3.7, §3.9.1, §3.9.2 ·
design-spec §1, §2, §4, §7.

**Terminado cuando:** el proyecto corre localmente, carga en dark por
defecto, el toggle cambia a light y la elección persiste al recargar, y `/es`
y `/en` muestran una página en blanco con los tokens de color aplicados
correctamente en ambos modos.

---

## TAREA 2 — Componentes base compartidos

`[x]`

**Qué incluye:**
- **Navbar**: pill flotante fija (`top:14px`, `height:52px`, `max-width:1140px`,
  `border-radius:14px`, fondo `--nav` con `backdrop-filter:blur(18px)`,
  design-spec §5 "Barra de navegación"). Logo (punto 9px acento + wordmark
  uppercase), links (Proyectos / Sobre mí / Contacto), toggle ES/EN (pill,
  rutas `/es` `/en`), toggle de tema (sol/luna), botón "Hablemos" (estilo
  primario compacto).
- **Footer**: grid `1.6fr 1fr 1fr`, gap 44px (design-spec §3).
- **Botón primario**: fondo `--accent`, sombra `0 8px 30px rgba(37,99,235,0.45)`,
  hover a `#1d4ed8` con `translateY(-2px)` (design-spec §5 "Botón primario").
- **Botón secundario**: fondo `--fill`, borde `--hair`, hover con borde
  `rgba(37,99,235,0.6)` (design-spec §5 "Botón secundario / link").
- **Badges/pills**: chip de tech, pill de servicio azul, pill glass del hero,
  badge "disponible" con punto verde pulsante (design-spec §5, §6
  `mf-pulse`).
- Layout base de página: ancho máx. 1180px (1000–1080px en páginas interiores
  según design-spec §3), padding horizontal `clamp(20px, 6vw, 72px)`.
- Sistema de animación de entrada `[data-reveal]` vía `IntersectionObserver`
  (design-spec §6), solo `transform`, nunca opacidad en 0 por defecto.
- Textos de Navbar/Footer ya pasan por next-intl (no hardcodeados).

**Depende de:** Tarea 1 · design-spec §3, §5, §6.

**Terminado cuando:** Navbar y Footer se ven correctamente en ES y EN, en
dark y light, los botones y badges existen como componentes reusables, y el
sistema `[data-reveal]` anima al hacer scroll.

---

## TAREA 3 — Home

`[x]`

**Qué incluye (con datos de prueba, no Supabase todavía):**
- **Hero**: grid `1.02fr 0.98fr`, H1 `clamp(48px,6.2vw,84px)` con
  `line-height:0.96`, foto con glow atmosférico detrás (radial gradient azul,
  `filter:blur(54px)`) y wash de fondo de sección, fundido inferior con
  máscara en la foto, pill "Disponible para proyectos" con punto verde
  pulsante, formas geométricas animadas (`mf-float`) — design-spec §3, §4,
  §5, §6.
- **Servicios**: grid `repeat(auto-fill, minmax(330px,1fr))`, gap 22px, usando
  los 5 servicios de `requirements.md` §2 (con imágenes de referencia de
  prueba) — design-spec §3.
- **Proyectos destacados**: grid de tarjetas `repeat(auto-fill,
  minmax(340px,1fr))`, gap 34px. Cada tarjeta con mockup de navegador (3
  puntos semáforo + barra URL en Geist Mono), área de preview 16/10 con
  líneas diagonales `--stripe`, badge de servicio + categoría, título,
  tagline, chips de tech. Hover: `translateY(-6px)`, halo glow, flecha "Ver
  caso" se desplaza — design-spec §5 "Tarjeta de proyecto". Usa 3-4
  proyectos de prueba marcados como "destacado" (`requirements.md` §4).
- **Sección "Cómo trabajo"**: ancho 1000px, pasos numerados — design-spec §3.
- **CTA final**: banner con glow radial centrado arriba (`filter:blur(44px)`)
  — design-spec §4 "Glow en banners CTA".
- Todo el texto fijo (no el contenido de proyectos/servicios) ya en next-intl.

**Depende de:** Tarea 2 · `requirements.md` §1 (Home), §2, §4 · design-spec
§3, §4, §5, §6.

**Terminado cuando:** la Home completa se ve y se comporta según el
design-spec en ES y EN, dark y light, con datos de prueba para servicios y
proyectos destacados, y el glow se reduce visiblemente en light (40% de
intensidad, design-spec §7).

---

## TAREA 4 — Proyectos (listado + filtros)

`[x]`

**Qué incluye:**
- Listado completo de proyectos de prueba (no solo destacados), mismo grid y
  estilo de tarjeta que la Tarea 3 (design-spec §5 "Tarjeta de proyecto").
- Doble filtro combinable: Categoría (Cliente / Demo-Personal) y Tipo de
  servicio (los 5 de `requirements.md` §2) — `requirements.md` §1.2.
- **Estado vacío** (sin resultados al filtrar): usa el mismo lenguaje visual
  de glow descrito en design-spec §4 ("estado vacío de proyectos").

**Depende de:** Tarea 2, Tarea 3 (reutiliza tarjeta) · `requirements.md`
§1.2 · design-spec §3, §5.

**Terminado cuando:** los filtros combinan correctamente (categoría + tipo de
servicio a la vez) sobre datos de prueba, en ES y EN, dark y light.

---

## TAREA 5 — Detalle de proyecto

`[x]`

**Qué incluye:**
- Página propia por proyecto, tipo caso de estudio: negocio/cliente,
  problema, solución (lenguaje de marca personal), tecnologías (etiquetas),
  imágenes, link al sitio en vivo si existe — `requirements.md` §1.3.
- Layout problema/solución: grid `200px 1fr`, gap 34px (design-spec §3).
- H1 de página interior: `clamp(34px,4.6vw,60px)` (design-spec §2).
- Ancho de contenido 1000–1080px (design-spec §3).
- Ruta dinámica (`[slug]` o `[id]`, a decidir por Claude Code al implementar)
  con datos de prueba.

**Depende de:** Tarea 4 · `requirements.md` §1.3 · design-spec §2, §3.

**Terminado cuando:** al hacer clic en un proyecto del listado, se abre su
página de detalle con todo el contenido de `requirements.md` §4, en ES y EN
(con fallback en español si falta el campo EN, según `requirements.md` §4
corregido).

---

## TAREA 6 — Sobre mí

`[x]`

**Qué incluye:**
- Quién es Matheo, bilingüe, propuesta de "se encarga de todo" —
  `requirements.md` §1.4, basado en `business.md` §3–§4.
- Ancho de contenido 1000–1080px (design-spec §3).
- **Marquee "Mi stack"**: `@keyframes mf-marquee` (`translateX(0 → -50%)`,
  26s linear infinite), lista duplicada + máscara de desvanecido en bordes,
  se pausa en hover (design-spec §6). Esta es la única sección del sitio que
  usa este marquee (no aparece en Home en esta versión del diseño).

**Depende de:** Tarea 2 · `requirements.md` §1.4 · `business.md` §3, §4 ·
design-spec §3, §6.

**Terminado cuando:** la página existe en ES y EN, dark y light, con el
contenido y tono definidos en `business.md` (lenguaje que sirve tanto a
cliente no técnico como a reclutador, según `business.md` §3) y el marquee
del stack funcionando y pausándose en hover.

---

## TAREA 7 — Contacto + Gracias

`[x]`

**Qué incluye:**
- Formulario de contacto con React Hook Form + Zod (`architecture.md` §3.8):
  Nombre, Correo, Tipo de proyecto (los 5 servicios), Plazo (urgente / 1 mes /
  sin apuro / explorando), texto libre — `requirements.md` §3.
- Avatar/elemento de contacto con glow (design-spec §4 menciona "avatar de
  contacto" entre los lugares donde aparece el efecto).
- Validación en frontend con Zod (la validación en backend llega en la tarea
  13, cuando se conecta Resend/Supabase).
- **Todavía no envía nada real** — al enviar, redirige a la página Gracias
  (simulado por ahora).
- Página Gracias: confirmación, expectativa de respuesta menos de 24 horas,
  tercer elemento pendiente de definir (`requirements.md` §1.6) — si no se
  define en este punto, se deja sin ese tercer elemento y se anota como
  pendiente en la sección "Decisiones abiertas" al final de este documento.
- Enlaces a LinkedIn, Upwork, Workana en la página de Contacto
  (`requirements.md` §1.5).

**Depende de:** Tarea 2 · `requirements.md` §1.5, §1.6, §3 · `architecture.md`
§3.8 · design-spec §4.

**Terminado cuando:** el formulario valida correctamente los campos (formato
de correo, campos requeridos) y redirige a Gracias, en ES y EN, dark y light.

---

## TAREA 8 — Login (UI) + página troll

`[x]`

**Qué incluye:**
- Página de Login: diseño minimal reutilizando tokens y componentes ya
  construidos — **sin lógica de autenticación real todavía** (eso es la
  tarea 12, con Supabase Auth).
- Botón "¿olvidaste tu contraseña?" que lleva a una página con mensaje
  burlón hacia quien intente entrar sin permiso — `requirements.md` §1.7.
- Copys finales de la página troll: **anotados como pendiente de pulido**, no
  bloqueante (`architecture.md` §7). Se puede dejar un placeholder de tono
  burlón genérico por ahora.

**Depende de:** Tarea 2 · `requirements.md` §1.7.

**Terminado cuando:** ambas páginas existen visualmente y son navegables
(Login → botón → página troll), sin que el login funcione todavía de verdad.

---

## TAREA 9 — Setup de Supabase

`[x]`

**Qué incluye:**
- Crear proyecto en Supabase.
- Crear tablas según el modelo conceptual de `architecture.md` §4:
  `proyectos`, `servicios`, `mensajes_contacto` (columnas exactas, tipos e
  índices definidos por Claude Code al implementar, siguiendo ese modelo como
  contrato).
- Configurar Supabase Storage para imágenes de proyectos y de referencia de
  servicios.
- Configurar Supabase Auth para un solo usuario admin (Matheo).
- Generar tipos TypeScript desde el esquema (`supabase gen types
  typescript`, `architecture.md` §3.5).
- Variables de entorno: URL y claves de Supabase (`architecture.md` §6).

**Depende de:** `architecture.md` §1–§4, §6.

**Terminado cuando:** las tablas existen en Supabase con la estructura
acordada, Storage tiene los buckets necesarios, Auth tiene a Matheo como
único usuario, y el proyecto Next.js puede conectarse (variables de entorno
configuradas localmente y en Vercel).

---

## TAREA 10 — Conectar Home / Proyectos / Detalle a Supabase

`[x]`

**Qué incluye:**
- Reemplazar los datos de prueba de las tareas 3, 4 y 5 por datos reales
  leídos desde Supabase vía `supabase-js` (`architecture.md` §3.5).
- Cargar manualmente en Supabase (Matheo, vía algún método temporal — SQL
  directo o un primer proyecto de prueba) al menos 2-3 proyectos demo para
  verificar que el flujo real funciona de punta a punta.
- Verificar que el filtro de Proyectos y el fallback ES→EN
  (`requirements.md` §4) funcionan con datos reales.

**Depende de:** Tarea 9 · Tareas 3, 4, 5.

**Terminado cuando:** Home, Proyectos y Detalle muestran datos reales de
Supabase (no hardcodeados), en ES y EN, con el fallback funcionando.

---

## TAREA 11 — Panel admin: CRUD de proyectos, servicios e imágenes

`[x]`

**Qué incluye:**
- CRUD de proyectos (alta, edición, borrado) — todos los campos de
  `requirements.md` §4, incluyendo los dos campos ES/EN por contenido.
- CRUD de servicios (entidad central) — `requirements.md` §2: nombre,
  descripción (ES/EN), orden de aparición.
- Gestión de imágenes de referencia: subir/quitar imágenes asociadas a cada
  servicio — `requirements.md` §6.
- Subida de imágenes de proyecto a Supabase Storage.
- **Sin protección de login todavía** (eso es la tarea 12) — se construye y
  prueba localmente o detrás de una ruta no enlazada públicamente.

**Depende de:** Tarea 9 · `requirements.md` §2, §4, §6 · `architecture.md`
§4.

**Terminado cuando:** Matheo puede crear, editar y borrar un proyecto y un
servicio completo (con imágenes) desde el panel, y el cambio se refleja en el
sitio público (Home/Proyectos/Detalle) sin tocar código.

---

## TAREA 12 — Panel admin: login real

`[x]`

**Qué incluye:**
- Conectar la página de Login (tarea 8) a Supabase Auth (`architecture.md`
  §3.3) con email + contraseña reales.
- Proteger todas las rutas del panel admin (tarea 11) — solo accesibles
  autenticado.
- Redirección a Login si se intenta acceder al panel sin sesión.

**Depende de:** Tarea 8 · Tarea 9 · Tarea 11 · `architecture.md` §3.3.

**Terminado cuando:** nadie puede acceder al panel ni a sus rutas de CRUD sin
iniciar sesión con las credenciales reales de Matheo.

---

## TAREA 13 — Mensajes de contacto: guardado real + notificación + estado

`[x]`

**Qué incluye:**
- El formulario de Contacto (tarea 7) ahora guarda cada envío en la tabla
  `mensajes_contacto` de Supabase: nombre, correo, tipo de proyecto, plazo,
  texto libre, fecha de llegada (`requirements.md` §5).
- Validación con Zod también en el backend (API Route), no solo en frontend
  (`architecture.md` §3.8).
- Envío de correo de notificación a Matheo vía Resend al llegar un mensaje
  nuevo (`architecture.md` §3.11, §6).
- En el panel admin: vista de mensajes con estado pendiente/respondido,
  editable manualmente por Matheo (`requirements.md` §5).

**Depende de:** Tarea 7 · Tarea 9 · Tarea 12 (el panel ya debe estar
protegido antes de exponer mensajes de contacto reales en él) ·
`architecture.md` §3.11, §6.

**Terminado cuando:** un mensaje enviado desde el formulario público queda
guardado en Supabase, dispara un correo real a Matheo, y aparece en el panel
admin con estado "pendiente" (editable a "respondido").

---

## TAREA 14 — Pulido y QA previo a testing.md

`[ ]`

**Qué incluye:**
- SEO básico: metadata por página (title, description) en ES/EN, sitemap,
  favicon — soporte de la promesa de negocio de aparecer en buscadores
  (`business.md` §2). Verificar que `/es/...` y `/en/...` quedan indexables
  como rutas separadas.
- Revisión responsive de las 8 páginas públicas + panel admin, en dark y
  light.
- Verificar que el glow se reduce correctamente al 40% en light en todas las
  secciones donde aparece (hero, tarjetas, CTA, avatar de contacto, estado
  vacío — design-spec §4, §7).
- Copys finales (no placeholder) de la página troll "olvidaste tu
  contraseña" (`requirements.md` §1.7, anotado como pulido en
  `architecture.md` §7).
- Resolución del "tercer elemento" pendiente de la página Gracias
  (`requirements.md` §1.6), si no se resolvió en la tarea 7.
- Revisión general de que el acento (`--accent` `#2563EB`) y los componentes
  (botones, badges, tarjetas) se usan de forma consistente en todo el sitio.

**Depende de:** Todas las tareas anteriores.

**Terminado cuando:** el sitio está listo para pasar a la checklist de QA de
`testing.md` (Fase 6).

---

## Decisiones abiertas que pueden surgir al implementar

> Esta sección se completa a medida que se construye. Si algo no estaba
> decidido en los documentos previos y hay que resolverlo en código, se anota
> aquí y, si afecta el contrato de `architecture.md` o el design-spec, se
> actualiza ahí primero.

- **Logo wordmark:** se usa "MATHEO FLORES" (nombre completo en uppercase) con letterSpacing 0.13em. No solo iniciales — el nombre es la marca (business.md §1).
- **Social links en Footer:** URLs placeholder (`linkedin.com`, `upwork.com`, `workana.com`) — reemplazar con URLs reales de Matheo antes del lanzamiento.
- **`[data-reveal]` implementado con RevealObserver:** componente cliente incluido en el locale layout. Cualquier elemento server-rendered puede usar `data-reveal` directamente como atributo HTML.
- **Button polimórfico:** usa `as` prop para renderizar como `<button>`, `<a>` o cualquier componente (ej. next-intl `Link`).
- **Foto hero (Tarea 3):** placeholder visual en la columna derecha del hero. Reemplazar con foto real de Matheo antes del lanzamiento.
- **Hover de ProjectCard:** implementado con CSS classes `.project-card`, `.card-glow`, `.card-arrow` en globals.css (no inline `<style>`).
- **`useTranslations` en Server Components:** las secciones de Home son server components que usan `useTranslations` síncronamente; `getLocale()` se usa async para el locale.
- **Next.js 16:** usa `src/proxy.ts` en lugar de `src/middleware.ts` para el
  proxy de next-intl (el nombre `middleware` está deprecado en Next.js 16).
- **Turbopack (Tarea 1):** los imports dinámicos con template literals no
  funcionan con Turbopack. Los mensajes de next-intl se importan de forma
  estática en `src/i18n/request.ts` con un mapa `{ es, en }`.
- **Tarea 4 (Proyectos con filtros):** se implementó como `ProjectsFilter.tsx` (client component) para manejar el estado de los filtros. Los filtros son por Categoría (botones pill) y Tipo de servicio (select). El estado vacío usa glow radial centrado.
- **Tarea 5 (Detalle de proyecto):** ruta dinámica `[locale]/projects/[slug]`. Layout problema/solución con grid `200px 1fr`. Se usa `generateStaticParams` sobre todos los proyectos mock. Placeholder visual para screenshot.
- **Tarea 6 (Sobre mí):** página con contenido de quién es Matheo, enfoque, y marquee "Mi stack" con animación `mf-marquee` (ya existente en globals.css). El marquee se pausa en hover via CSS `animation-play-state: paused`.
- **Mock data:** se agregaron 3 proyectos mock adicionales (ids 5, 6, 7) — incluyendo proyectos de categoría "cliente" para que el filtro tenga variedad.
- **Tarea 7 (Contacto + Gracias):** formulario con React Hook Form + Zod (nombre, email, tipo de proyecto, plazo, mensaje). Validación client-side. Al submit redirige a `/thank-you`. Avatar con glow, enlaces a LinkedIn/Upwork/Workana. Sin envío real todavía.
- **Tarea 8 (Login + Troll):** página `/login` con inputs de email/contraseña (solo UI, sin auth real). Link "¿Olvidaste tu contraseña?" → `/forgot` con glow y mensaje burlón.
- **Tarea 9 (Setup Supabase):** dependencias instaladas (`@supabase/supabase-js`). Cliente configurado en `src/lib/supabase/client.ts` (lazy, fallback a null si no hay env vars). Migración SQL en `supabase/migrations/001_init.sql` con tablas `servicios`, `proyectos`, `mensajes_contacto`, storage buckets, RLS policies. `.env.local.example` con variables necesarias. **Pendiente:** crear el proyecto en Supabase, ejecutar la migración, configurar las variables de entorno reales.
- **Tarea 10 (Conexión a Supabase):** se creó `src/lib/data.ts` como capa de acceso a datos unificada. Cada función intenta conectar a Supabase; si no hay variables de entorno, cae en mock data (`src/lib/mock-data.ts`). Las páginas Home (`page.tsx`), Proyectos (`ProjectsFilter.tsx`) y Detalle (`[slug]/page.tsx`) ahora importan desde `@/lib/data` y reciben datos async. Seed SQL en `supabase/seed.sql` con los 7 proyectos y 5 servicios del mock.
- **Tarea 11 (Panel admin CRUD):** rutas bajo `/[locale]/admin/`. Layout con sidebar (Dashboard, Proyectos, Servicios). Dashboard con contadores. CRUD completo de proyectos: listado con tabla (`/admin/projects`), formulario de creación (`/admin/projects/new`), edición (`/admin/projects/[id]/edit`), confirmación de borrado (`/admin/projects/[id]`). CRUD de servicios: listado, creación, edición, borrado (misma estructura). Sin protección de login (Tarea 12). Opera sobre mock data en memoria; cuando Supabase esté conectado, las funciones de `@/lib/data` persistirán automáticamente.
- [ ] Tercer elemento de la página Gracias (`requirements.md` §1.6) — sin
  definir aún. Resolver en tarea 7 o más tarde, antes de la tarea 14.
- [ ] Copys finales de la página troll (`requirements.md` §1.7) — resolver en
  tarea 14 a más tardar.
- [ ] Dominio (`business.md` §8) — no bloqueante para construir, pero
  necesario antes de lanzar a producción final.
- [x] Mecanismo exacto de persistencia de la preferencia de tema
  (cookie vs. `localStorage`) — **Decisión: `localStorage`**. El tema es
  preferencia puramente visual, no hay lógica de server-side que lo necesite.
  El script inline en `<head>` previene el flash (lee `localStorage` antes de
  que React hidrate). Resuelto en tarea 1.

---

## PROMPT DE REINICIO

> Copiar y pegar este bloque al abrir un chat nuevo de Claude Code (o
> cualquier otra IA) para retomar el proyecto sin haber visto esta
> conversación.

```
Estoy construyendo el portafolio web de Matheo Flores (freelancer full-stack,
Quito, Ecuador). El proyecto se documentó en 5 fases, todas aprobadas:

1. business.md — por qué existe la web (negocio, públicos, propuesta de valor)
2. requirements.md — qué hace la web (páginas, funciones, datos)
3. design-spec-portafolio-matheo-flores.md — cómo se ve y se siente (tokens
   exactos, acento azul #2563EB, dark por defecto, componentes, animaciones)
4. architecture.md — cómo se construye (stack: Next.js + Supabase + Tailwind +
   Framer Motion + next-intl + Resend + Vercel + paquete npm `geist`)
5. tasks.md (este documento) — en qué orden se construye, 14 tareas

Lee los 4 documentos anteriores completos antes de escribir código. Luego
revisa tasks.md: identifica la primera tarea marcada [ ] (no completada) y
constrúyela. Una tarea = un commit. No avances a la siguiente tarea sin marcar
la actual como [x] y confirmar conmigo que quedó bien.

Si durante la construcción de una tarea encuentras que necesitas una decisión
que no está en ningún documento (un nombre de campo, una estructura de
carpeta, un detalle visual no especificado), tómala tú mismo de forma
razonable y anótala brevemente al final de tasks.md, en la sección
"Decisiones abiertas". No te detengas a preguntarme por detalles menores de
implementación — sí pregúntame si la decisión contradice algo ya escrito en
business.md, requirements.md, el design-spec o architecture.md.
```

---

## SECCIÓN DE ENTREGA

> Al completar la tarea 14, antes de pasar a `testing.md` (Fase 6), verificar:

- [ ] Las 14 tareas están marcadas `[x]`.
- [ ] Las "Decisiones abiertas" de este documento están todas resueltas o
  explícitamente diferidas a una fase futura anotada en `business.md` o
  `architecture.md`.
- [ ] El sitio corre en Vercel (no solo localmente) con las variables de
  entorno de producción configuradas (`architecture.md` §6).
- [ ] Matheo puede entrar al panel admin en producción con sus credenciales
  reales y hacer un alta/edición/borrado de prueba.
- [ ] Un mensaje de prueba enviado desde el formulario público de producción
  llega realmente al correo de Matheo.
- [ ] **Próximo paso:** abrir el chat de Fase 6 — `testing.md` — para la
  checklist de QA final antes del lanzamiento.

---

*Documento vivo. Cada tarea completada se marca `[x]`. Si surge una decisión
nueva al implementar, se anota en "Decisiones abiertas" o se actualiza el
documento de fase correspondiente (`architecture.md` o el design-spec)
primero.*
