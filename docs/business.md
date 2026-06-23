# business.md — Portafolio de Matheo Flores

> **Fase 1 de 6 — Negocio.** Este documento define *por qué* existe esta web.
> No habla de páginas, diseño ni tecnología (eso es de las fases siguientes).
> Es la fuente de verdad del negocio. Cualquier IA que retome el proyecto debe
> leer esto primero.

---

## 1. Qué es

Portafolio web de **Matheo Flores**, desarrollador web full-stack basado en
**Quito, Ecuador**, que ofrece sus servicios como **freelancer**.

El sitio se construye como **marca personal** (no como empresa ni estudio). La
gente del mundo freelance contrata personas, no logos: el activo de venta es el
propio Matheo —una persona real, accesible y bilingüe—.

**Decisión consciente de marca:** se lanza como persona ("Matheo Flores"). La
opción de abrir una **LLC con su nombre/marca** queda planteada como evolución
**futura**, a activar cuando existan ingresos en dólares que justifiquen su
costo y contabilidad. No es una decisión pendiente por olvido, sino diferida a
propósito.

---

## 2. Objetivo principal

Conseguir que un visitante que necesita una página web **contrate a Matheo para
construírsela de cero hasta producción**.

La promesa de fondo: el cliente obtiene **presencia en internet** —una web que
funciona, se ve profesional y aparece en buscadores (Google y buscadores de
IA), lista para SEO— contratando a **una sola persona** que se encarga de todo.

---

## 3. Públicos

El sitio sirve a dos públicos, con una **prioridad clara**.

### Público primario — Clientes que necesitan una web
- **Local:** personas y negocios de Quito / Ecuador.
- **Global:** clientes de cualquier parte del mundo, llegados vía plataformas
  freelance (Upwork, Workana, etc.).
- Quieren saber: quién es Matheo, qué sabe hacer, qué ha hecho antes, y poder
  contactarlo para encargarle su web.

### Público secundario — Reclutadores
- Remotos (USA o en general) evaluando capacidad técnica.
- Se atienden con **toque ligero**: mencionar las tecnologías usadas en cada
  proyecto y poco más. La web **no** se convierte en un documento técnico.

### Regla de comunicación transversal
La web debe ser entendible **a la vez** por una persona **no técnica** y una
**técnica**. El trabajo se describe en **lenguaje de cliente**, no de
programador.

> Ejemplo del tono buscado:
> ❌ "Implementé un CRUD con auth en panel admin."
> ✅ "Le hice una página donde el dueño puede subir y manejar sus productos él
> mismo, sin depender de nadie."
>
> El no técnico lo entiende y le suena profesional; el técnico lee entre líneas
> y sabe lo que se hizo. Un solo mensaje sirve a ambos, priorizando al cliente.

---

## 4. Propuesta de valor (qué lo diferencia)

Tres ventajas reales, honestas y concretas:

1. **Trabajo hecho correctamente.** Código limpio, moderno y escalable
   (TypeScript moderno), entregado en buen tiempo. El mensaje es **calidad +
   eficiencia**, nunca "rápido y barato" (que suena a chapucero).

2. **Bilingüe español / inglés.** Puede entregar webs en español, en inglés o
   en ambos. Conecta sin fricción con el cliente local de Quito y con el
   mercado global. Diferenciador fuerte frente a muchos freelancers de LatAm.

3. **Se encarga de todo y entiende el negocio antes de programar.** No es "un
   programador que recibe órdenes": primero investiga cómo debería ser la web
   para *ese* negocio (incluido encontrar un buen dominio/URL), la diseña, la
   deja preparada para SEO y funcionando. El cliente contrata a una persona y
   se despreocupa.

### Posicionamiento sobre la IA (decisión consciente)
Matheo trabaja asistido por IA de forma profesional, pero **esto NO es el
argumento de venta**. Muchos clientes asocian "hecho con IA" a barato y mal
hecho. Por tanto:
- **No se vende** "uso IA".
- **Sí se vende** el resultado que esa forma de trabajar permite: entregar con
  calidad, moderno y en buen tiempo, a mejor precio que una agencia tradicional.
- La IA es la *manera interna* de trabajar (su ventaja de productividad), no el
  mensaje al cliente. El cliente no compra el motor; compra que el auto llegue.

---

## 5. Acción principal del visitante (Call to Action)

Lo que se quiere que el visitante haga antes de irse:

**Llenar un mini formulario de contacto.** Campos previstos:
- Nombre
- Correo
- 2–3 preguntas guiadas (para **calificar** al cliente: p. ej. tipo de
  proyecto, presupuesto aproximado, plazo — el detalle exacto se define en
  `requirements.md`)
- Un campo de texto libre para que escriba lo que quiera

**Acción secundaria:** enlaces a perfiles externos para quien prefiera otro
canal — **LinkedIn, Upwork, Workana** (y similares).

> Las "2–3 preguntas guiadas" son valiosas: permiten filtrar con quién vale la
> pena sentarse antes de responder. Su definición exacta se trabaja en la
> fase 2 (requirements).

---

## 6. Estrategia de proyectos a mostrar

Estado actual: **aún no hay proyectos de clientes reales.** Se resuelve así, de
forma honesta y profesional:

- La sección de proyectos se divide en **dos categorías**:
  1. **Clientes**
  2. **Demos / Personales**
- Se lanza con **demos bien presentados**. Un buen demo puede vender más que un
  cliente mediocre, y el cliente entiende perfectamente que se muestren mientras
  se construye la cartera.

**Implicación de negocio clave:** el lanzamiento del portafolio **no depende de
tener clientes**. Se lanza con demos y eso basta para empezar a vender. No hay
que frenarse esperando el primer cliente.

> Nota técnica para fases posteriores: los proyectos **no van escritos a mano en
> el código**; se cargan y administran desde un panel. Cuando llegue el primer
> cliente real, se sube en minutos sin tocar código. La web crece con Matheo.

---

## 7. Naturaleza del proyecto (tamaño)

**Web con sistema** (no es una web simple informativa).

Interruptor: *¿alguien edita o guarda información en la web?* → **Sí.**
- Se **guardan** los mensajes / datos de contacto del formulario.
- Hay un **CRUD** para que Matheo agregue, edite y elimine proyectos (y otras
  cosas) desde un **panel de administración**.
- Por tanto se requiere **login / autenticación** para ese panel.

> Consecuencia: en las fases siguientes se **activan** las secciones de datos y
> seguridad (modelado de datos en `requirements.md` / `architecture.md`, y auth
> en `architecture.md`). El detalle técnico NO se decide aquí.

---

## 8. Pendientes de negocio (no bloquean el avance)

- **Dominio:** aún por definir. Recomendación: asegurar un dominio con el nombre
  (p. ej. `matheoflores.dev` / `.com`) — es barato, profesional y sigue siendo
  útil aunque después se monte la LLC.
- **Nombre exacto de marca:** "Matheo Flores" (confirmar apellido/grafía final
  si se quiere algo específico).
- **LLC:** evolución futura, no para el lanzamiento.

---

## 9. Definición de éxito

El portafolio funciona si un cliente potencial —llegado de Quito o de una
plataforma freelance— entra, entiende rápido **quién es Matheo, qué hace y qué
ha hecho**, confía, y **llena el formulario de contacto** (o lo contacta por sus
perfiles) para encargarle su web.

---

*Documento vivo. Si una decisión de negocio cambia, se actualiza aquí primero.*
