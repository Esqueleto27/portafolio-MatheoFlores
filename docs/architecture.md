# architecture.md — Portafolio de Matheo Flores

> **Fase 4 de 6 — Arquitectura técnica.** Este documento define *cómo se
> construye* la web: stack, servicios externos y decisiones técnicas. Deriva
> de `business.md` (por qué), `requirements.md` (qué) y `design.md` (cómo se
> ve). Cualquier IA (Claude Code, Cursor, etc.) debe poder construir el
> proyecto leyendo este documento, sin haber visto la conversación donde se
> decidió.
>
> Cada decisión aquí fue propuesta con opciones y elegida por el cliente
> (Matheo). No hay supuestos por defecto.

---

## 1. Visión general de la arquitectura

**Next.js puro: un solo repositorio para frontend y backend.**

```
┌──────────────────────────────────────────────┐
│              Repositorio único                │
│                  (Next.js)                     │
│                                                 │
│  Frontend (App Router, React, Tailwind,        │
│  Framer Motion, next-intl)                     │
│                                                 │
│  Backend (API Routes — TODA la lógica de       │
│  negocio vive aquí: CRUD, validación,          │
│  envío de notificaciones)                      │
└───────────────────┬─────────────────────────────┘
                     │
       ┌─────────────┼──────────────┐
       ▼             ▼              ▼
  ┌─────────┐   ┌──────────┐  ┌──────────┐
  │ Supabase │   │ Supabase │  │ Resend   │
  │ Postgres │   │ Storage  │  │ (correo) │
  │ (datos)  │   │ (imágenes)│  │          │
  └─────────┘   └──────────┘  └──────────┘
       ▲
       │
  ┌─────────┐
  │ Supabase │
  │ Auth     │
  │ (login)  │
  └─────────┘
```

**Principio rector de esta arquitectura:** Supabase se usa exclusivamente como
infraestructura (base de datos, archivos, autenticación) — **nunca** como
lugar donde vive lógica de negocio (sin Edge Functions, sin Row Level Security
complejo). Toda decisión de negocio (qué pasa cuando se guarda un proyecto,
cómo se valida un formulario, cuándo se envía un correo) se escribe en código
TypeScript dentro del repo de Next.js.

**Consecuencia práctica:** un solo `git push` despliega todo (frontend +
backend) a Vercel. Supabase no se despliega — ya existe como servicio externo,
solo se consume vía API.

---

## 2. Stack técnico — resumen

| Pieza | Elección | Rol |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | Frontend, backend (API Routes), SSR para SEO |
| Base de datos | **Supabase (Postgres)** | Almacenamiento de proyectos, servicios, mensajes |
| Acceso a datos | **`supabase-js`** (sin ORM) | Lectura/escritura desde las API Routes |
| Autenticación | **Supabase Auth** | Login del panel admin (un solo usuario) |
| Storage de archivos | **Supabase Storage** | Imágenes de proyectos y de referencia de servicios |
| Optimización de imágenes | **`<Image>` de Next.js** | Conversión automática a WebP al servir |
| Internacionalización (UI) | **next-intl** | Textos fijos del sitio (menús, botones, secciones) en ES/EN |
| Contenido bilingüe (datos) | **Manual** — sin IA | Proyectos y servicios con campos ES/EN separados, escritos a mano |
| Formularios y validación | **React Hook Form + Zod** | Formulario de contacto y formularios del panel admin |
| Estilos | **Tailwind CSS** | Implementación del sistema de diseño (`design.md`) |
| Modo oscuro/claro | **Dark por defecto** | Toggle manual en navbar; elección del visitante se recuerda |
| Tipografía | **Paquete npm `geist`** (Vercel) | Geist + Geist Mono, sin depender de Google Fonts |
| Animaciones | **Framer Motion (Motion)** | Scroll-driven reveals, marquee, stacking, aurora/beams |
| Envío de correo | **Resend** | Notificación a Matheo cuando llega un mensaje de contacto |
| Hosting | **Vercel** | Despliegue único de todo el proyecto |
| Dominio | *Pendiente* | No bloqueante para el desarrollo |

---

## 3. Por qué este stack (justificación de cada pieza)

### 3.1 Next.js, todo en un repo
Se evaluaron tres caminos: Next.js completo, Vite + backend separado, y Astro
con islas de React. Se eligió **Next.js completo** porque:
- El proyecto necesita SSR real para SEO (parte de la promesa de negocio en
  `business.md`), panel admin con estado vivo, y CRUD — Next.js cubre los tres
  sin salir del framework.
- Un solo repo, un solo lenguaje (TypeScript), un solo despliegue. Relevante
  para un freelancer que mantiene el proyecto solo.

### 3.2 Supabase solo como infraestructura, no como backend
Se evaluó usar Supabase como backend completo (Auth + DB + Storage + Edge
Functions, con el navegador hablándole directo). Se descartó porque reparte la
lógica de negocio entre dos sistemas (el repo Next.js y el panel de Supabase),
lo cual complica el mantenimiento para una sola persona. Se eligió que **toda
la lógica viva en API Routes de Next.js**, y que Supabase se use únicamente
como:
- Base de datos (Postgres)
- Storage de archivos
- Proveedor de autenticación

### 3.3 Supabase Auth (no NextAuth, no auth manual)
- Ya se usa Supabase para DB y Storage — activar Auth no suma infraestructura
  nueva.
- Resuelve exactamente el caso de uso (un usuario, login con email +
  contraseña) sin la complejidad de NextAuth (pensado para múltiples
  proveedores/usuarios) ni el riesgo de seguridad de implementarlo a mano.

### 3.4 Supabase Storage + WebP vía Next.js (no Cloudinary)
Se evaluó Cloudinary por su optimización automática de imágenes (conversión a
WebP/AVIF, redimensionado on-demand). Se descartó porque el componente
`<Image>` de Next.js **ya hace conversión a WebP automáticamente al servir
imágenes**, cubriendo la necesidad principal sin sumar un proveedor externo
más. Decisión final: un solo proveedor (Supabase) para datos, archivos y auth.

### 3.5 `supabase-js` directo, sin Prisma
Se evaluó sumar Prisma como ORM. Se descartó porque:
- Ya se usa `supabase-js` para Auth y Storage — sumar Prisma significa dos
  formas distintas de hablarle a la misma base de datos.
- El modelo de datos de este proyecto es simple (proyectos, servicios,
  mensajes, imágenes) — no justifica la capa adicional.
- Supabase puede generar tipos TypeScript desde el esquema (`supabase gen
  types typescript`), cubriendo buena parte de la ventaja de tipado que
  ofrecería Prisma.
- Las migraciones se manejan con el sistema propio de Supabase (SQL
  versionado vía su CLI).

### 3.6 Sin traducción automática por IA — contenido bilingüe manual
**Decisión que reemplaza lo planteado en `requirements.md` sección 4.**
Originalmente se planteó generar un borrador en inglés por IA al guardar un
proyecto en español, con revisión manual posterior. Tras evaluar costos
(mínimos, centavos/mes) y calidad (mejor tono con IA que con un traductor
literal gratuito), **Matheo decidió eliminar la traducción automática por
completo**. En su lugar:
- **Todo el contenido editable del sitio** (proyectos, servicios, y los
  textos fijos del sitio) tiene **dos campos separados, español e inglés**,
  ambos escritos a mano por Matheo.
- No hay ninguna integración de IA de traducción en el sistema.
- ⚠️ **Acción pendiente:** actualizar `requirements.md` sección 4 para
  eliminar la mención al borrador automático en inglés y reflejar el flujo
  manual descrito acá.

### 3.7 next-intl para textos fijos
Se evaluó escribir un objeto de traducción a mano (`{ es: {...}, en: {...} }`).
Se eligió **next-intl** por ser el estándar en proyectos Next.js App Router,
manejar de forma robusta el ruteo por idioma (`/es/...`, `/en/...`) y la
detección de idioma, evitando reconstruir esa lógica desde cero.

> Nota: next-intl maneja los **textos fijos de la interfaz** (navegación,
> botones, labels). El contenido de proyectos y servicios (sección 3.6) usa
> sus propios campos ES/EN en la base de datos, **no** next-intl.

### 3.8 React Hook Form + Zod
Aclaración importante: **React Hook Form no es una alternativa a Next.js —
funciona dentro de los componentes React que Next.js ya usa por debajo**. Se
eligió este combo porque:
- Zod define las reglas de validación una sola vez (ej. formato de correo) y
  se reusan tanto en el frontend (antes de enviar) como en el backend (al
  recibir, por seguridad).
- Evita lógica de validación duplicada e inconsistente entre el formulario de
  contacto y los formularios del panel admin.

### 3.9 Tailwind CSS
`design.md` define un sistema de tokens centralizado (colores en variables
CSS, radios, espaciados, tipografía). Tailwind se configura directamente desde
esos tokens (`--accent`, `--bg`, etc. mapeados en `tailwind.config`), dando
clases cortas y reusables. Se descartaron CSS Modules (obligaría a repetir
`var(--accent)` manualmente en muchos archivos) y CSS-in-JS (fricción con
Server Components en el App Router).

### 3.9.1 Modo oscuro/claro: dark por defecto
`design.md` (v2) establece que el sitio carga **siempre en modo oscuro** la
primera vez que un visitante entra, sin detectar el sistema operativo del
dispositivo. El visitante puede cambiar a claro con el toggle de la navbar; esa
elección se recuerda para sus próximas visitas (cookie o almacenamiento local).
Se descartó "seguir el sistema" (`prefers-color-scheme`) porque el efecto de
glow —pieza visual distintiva de la marca— se diseñó para verse protagonista en
oscuro y deliberadamente sutil en claro; dark por defecto asegura que todo
visitante nuevo vea primero esa versión más fuerte.

### 3.9.2 Tipografía: paquete `geist` (no Google Fonts)
Se evaluó cargar Geist/Geist Mono vía `<link>` de Google Fonts (método
descrito originalmente en `design.md`) contra usar el paquete npm `geist` de
Vercel. Se eligió el **paquete npm**, ya que Next.js lo optimiza e incluye
junto con el resto del sitio sin depender de una petición externa a Google
Fonts en cada visita — mejor tiempo de carga, relevante para el objetivo de
SEO/velocidad de `business.md`.

### 3.10 Framer Motion
`design.md` describe varias animaciones atadas al scroll (reveal letra por
letra en el statement, sticky stacking en proyectos, marquee scroll-driven).
Se eligió Framer Motion por su soporte directo de animaciones basadas en
progreso de scroll y su integración natural con React/Next.js, evitando
reconstruir a mano lógica de `Intersection Observer` y cálculo de posiciones.

### 3.11 Resend
Matheo quiere recibir un correo cuando llega un mensaje de contacto nuevo
(además de quedar guardado en el panel). Se eligió Resend por ser el estándar
actual para envío de correo transaccional en proyectos Next.js/Vercel, con
tier gratis suficiente para el volumen esperado.

### 3.12 Vercel
Next.js fue construido por el mismo equipo detrás de Vercel — despliegue sin
configuración especial, soporte nativo de API Routes y `<Image>` optimizado,
deploy automático en cada push. Gratis para este tamaño de proyecto.

---

## 4. Modelo de datos (alto nivel)

> Detalle de columnas exactas, tipos e índices se define al implementar
> (Claude Code puede proponerlo al construir, siguiendo esta estructura). Este
> es el modelo conceptual que `architecture.md` fija como contrato.

### `proyectos`
- Categoría: Cliente / Demo-Personal
- Tipo de servicio (relación con `servicios`)
- Destacado (booleano)
- Negocio/cliente — **ES y EN** (dos campos)
- Problema — **ES y EN**
- Solución — **ES y EN**
- Tecnologías (etiquetas)
- Imágenes (relación con Supabase Storage)
- Link al sitio en vivo (opcional)

### `servicios`
- Nombre — **ES y EN**
- Descripción — **ES y EN**
- Imágenes de referencia (relación con Supabase Storage)
- Orden de aparición

### `mensajes_contacto`
- Nombre, correo
- Tipo de proyecto (relación con `servicios`)
- Plazo (urgente / 1 mes / sin apuro / explorando)
- Texto libre
- Fecha de llegada
- Estado: pendiente / respondido

### Usuario admin
- Gestionado por Supabase Auth, no por una tabla propia. Un solo usuario
  (Matheo), sin roles múltiples.

---

## 5. Internacionalización — cómo conviven next-intl y los campos manuales

Dos sistemas distintos, cada uno con su responsabilidad, para que no se
confundan al implementar:

| | next-intl | Campos ES/EN en base de datos |
|---|---|---|
| Qué traduce | Textos fijos de la interfaz: nav, botones, labels, secciones del Home | Contenido editable: proyectos, servicios |
| Dónde vive | Archivos de traducción (`es.json`, `en.json`) en el repo | Columnas separadas en las tablas de Supabase |
| Quién lo edita | Matheo, editando código/archivos directamente | Matheo, desde el panel admin, sin tocar código |
| Ejemplo | "Contacto", "Enviar mensaje", "Ver proyecto" | El texto del problema/solución de un proyecto específico |

---

## 6. Variables de entorno necesarias (anticipo para `tasks.md`)

> Se detallan en `tasks.md` al construir, pero se anotan aquí como referencia
> de qué credenciales habrá que conseguir:
- URL y claves de Supabase (proyecto, Auth, Storage)
- API key de Resend
- Correo destino de las notificaciones (el de Matheo)

---

## 7. Lo que NO se decide en este documento

- Estructura exacta de carpetas del proyecto, nombres de archivos — se resuelve
  al construir en `tasks.md` / Claude Code.
- Esquema SQL exacto (columnas, tipos, índices) — se construye siguiendo la
  sección 4 como contrato conceptual.
- Copys finales de la página troll "olvidaste tu contraseña" — anotada como
  tarea de pulido en `tasks.md`, no bloqueante para el lanzamiento.

---

## 8. Cambios que este documento genera en fases anteriores

⚠️ **`requirements.md` sección 4 debe actualizarse:** se elimina la mención a
traducción automática asistida por IA. El flujo correcto es: Matheo escribe
manualmente cada proyecto y servicio en español **y en inglés**, sin
generación de borrador automático.

---

*Documento vivo. Si una decisión técnica cambia durante `tasks.md`, se
actualiza aquí primero.*
