# requirements.md — Portafolio de Matheo Flores

> **Fase 2 de 6 — Requisitos funcionales.** Este documento define *qué* hace la
> web: páginas, funciones y datos. NO define cómo se ve (→ `design.md`) ni con
> qué tecnología se construye (→ `architecture.md`).
>
> Este documento asume leído `business.md` (Fase 1). No repite el porqué del
> negocio, solo lo referencia cuando es relevante.
>
> Es **web con sistema**: hay datos que se guardan y un panel admin con login
> real (no hardcodeado). Por eso están activas las secciones de datos.

---

## 1. Mapa de páginas

### Públicas

1. **Home**
   - Hero (presentación de Matheo, enganche inicial)
   - Proyectos destacados (los que Matheo marca como "destacado" desde el panel)
   - Sección de servicios con imágenes de referencia (ver sección 4)
   - Sección "cómo trabajo" (proceso, forma de encargarse de todo)
   - Llamada final a Contacto

2. **Proyectos**
   - Listado completo de todos los proyectos (no solo destacados)
   - Doble filtro combinable:
     - Filtro 1 — Categoría: **Cliente** / **Demo-Personal**
     - Filtro 2 — Tipo de servicio (los 5 de la sección 4)

3. **Detalle de proyecto** (página propia por cada proyecto)
   - Pensada para contenido rico, tipo caso de estudio (no una ficha corta)
   - Contenido: negocio/cliente, qué problema tenía, cómo lo resolvió Matheo
     (lenguaje de marca personal, no técnico), tecnologías usadas (etiquetas,
     mención ligera para público técnico/reclutador), imágenes del proyecto,
     link al sitio en vivo (si existe)

4. **Sobre mí**
   - Quién es Matheo, bilingüe, propuesta de "se encarga de todo"

5. **Contacto**
   - Formulario de contacto (ver sección 3)
   - Enlaces a LinkedIn, Upwork, Workana (acción secundaria)

6. **Gracias** (tras enviar el formulario)
   - Confirmación de que el mensaje llegó
   - Expectativa de respuesta: **menos de 24 horas**
   - Tercer elemento (mostrar redes / mantener viva la visita): **pendiente de
     definir**, no descartado — se resuelve en `design.md`

### Privadas (sistema)

7. **Login**
   - Acceso con contraseña real (no hardcodeada — el mecanismo se define en
     `architecture.md`)
   - Botón "¿olvidaste tu contraseña?" **no** dispara recuperación real: lleva
     a una página con un mensaje burlón hacia quien intente entrar sin permiso.
     Anotado como **extra / fase de pulido**, no bloqueante para el lanzamiento.

8. **Panel admin**
   - Gestión de proyectos (alta, edición, borrado)
   - Gestión de servicios (entidad central, ver sección 4)
   - Gestión de imágenes de referencia (ver sección 6)
   - Lectura y gestión de estado de mensajes de contacto (ver sección 5)
   - Un solo usuario admin: Matheo

---

## 2. Servicios — entidad central editable

Los "servicios" no son una simple etiqueta: son una entidad central administrada
desde el panel, conectada a **tres lugares** de la web:

- La sección de servicios del Home (con sus imágenes de referencia)
- Las opciones del formulario de contacto
- El filtro de "tipo de servicio" en la página Proyectos

Si Matheo agrega, edita o quita un servicio desde el panel, se actualiza
automáticamente en los tres lugares — no se toca código.

### Los 5 servicios de partida

Nombrados por el resultado que busca el cliente (lenguaje no técnico), con el
nombre técnico entre paréntesis para quien lo reconozca:

1. **Quiero vender mis productos por internet** *(Tienda online / e-commerce)*
2. **Quiero que mi negocio aparezca en Google y lo encuentren** *(Web
   informativa + SEO)*
3. **Quiero mostrar mi trabajo o mi carrera** *(Portafolio profesional)*
4. **Quiero promocionar algo puntual** *(Landing page)*
5. **No estoy seguro / quiero que me asesores** *(A medida)*

Cada servicio incluye una explicación breve y **imágenes de referencia**
(ejemplos ilustrativos de lo que se puede lograr — no plantillas a entregar; el
trabajo final siempre es a medida, ver `business.md` sección 4).

> Nota de redacción para `design.md`: los textos de venta exactos de cada
> servicio se trabajan ahí, no aquí.

---

## 3. Formulario de contacto

Campos:

- **Nombre**
- **Correo**
- **Tipo de proyecto** — selección entre los 5 servicios de la sección 2
- **Plazo** — urgente / 1 mes / sin apuro / explorando opciones
- **Texto libre** — espacio abierto para que la persona escriba lo que quiera

**Presupuesto: descartado a propósito.** Decisión consciente: preguntar un
presupuesto numérico no filtra bien en este público (riesgo de espantar al
visitante o recibir cifras irreales). En su lugar, Matheo revisa cada mensaje
y responde con un estimado a medida.

Al enviar, el visitante llega a la página **Gracias** (sección 1).

---

## 4. Proyectos — dato central del panel

Por cada proyecto, todo editable desde el panel sin tocar código:

- **Categoría:** Cliente / Demo-Personal
- **Tipo de servicio:** uno de los servicios de la sección 2
- **Destacado:** sí/no — si "sí", aparece también en el Home
- **Negocio / cliente:** nombre o descripción del negocio
- **Problema:** qué problema tenía el cliente
- **Solución:** cómo lo resolvió Matheo (lenguaje de marca personal)
- **Tecnologías:** etiquetas (ej. React, Node) — mención ligera para público
  técnico
- **Imágenes:** del proyecto/resultado
- **Link al sitio en vivo:** opcional

### Bilingüe (Español / Inglés)

- **Español es el idioma fuente.** Matheo escribe el proyecto en español.
- Al guardar, el sistema genera automáticamente un **borrador en inglés**
  (traducción asistida por IA, con contexto, usando un servicio gratuito —
  el servicio exacto se decide en `architecture.md`).
- Matheo **revisa y puede editar** la traducción antes de publicar. La
  traducción nunca se publica sin posibilidad de revisión manual.
- La traducción va siempre español → inglés, nunca al revés.

---

## 5. Mensajes de contacto (panel)

Cada mensaje recibido del formulario guarda:

- Nombre, correo, tipo de proyecto elegido, plazo, texto libre
- Fecha de llegada
- **Estado:** pendiente / respondido — Matheo puede marcarlo manualmente desde
  el panel

---

## 6. Imágenes de referencia (panel)

Administrables desde el panel: Matheo puede subir o quitar imágenes de
referencia asociadas a cada servicio (sección 2), sin tocar código.

---

## 7. Multiidioma del sitio completo

Todo el sitio existe en **Español e Inglés**: menús, textos fijos, secciones
del Home, formulario, y los proyectos (ver sección 4 para el flujo bilingüe de
proyectos en particular).

> Nota: el **modo claro/oscuro** mencionado en el chat es una decisión de
> diseño (cómo se ve), no de requisitos. Se resuelve en `design.md`.

---

## 8. Usuarios del sistema

Un solo usuario administrador: **Matheo**. No hay roles ni permisos múltiples
en esta versión.

---

## 9. Fuera de alcance para el lanzamiento (anotado, no descartado)

Cosas que surgieron en la conversación y se decidió **no** construir ahora,
para no frenar el lanzamiento — quedan como evolución futura:

- Página dedicada por cada servicio con contenido extenso tipo landing
  (se empieza con imágenes de referencia dentro del Home; una página propia
  por servicio queda para más adelante si algún servicio se vuelve fuerte)
- Blog
- Recuperación de contraseña "troll" — la idea queda fijada (sección 1,
  punto 7), pero su implementación se trata como pulido, no bloqueante

---

*Documento vivo. Si surge un requisito nuevo durante `design.md` o
`architecture.md` que cambie el QUÉ, se actualiza aquí primero.*
