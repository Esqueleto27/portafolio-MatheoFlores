# Design Spec — Portafolio Matheo Flores

> Valores exactos extraídos del prototipo final (Home + páginas). Listo para
> reimplementar en código real. Acento azul `#2563EB`. Tipografía Geist.
> Dos modos: dark (por defecto) y light.

---

## 1. Paleta de colores

Los colores viven como CSS custom properties en el contenedor raíz y cambian
por modo. Hex exactos:

### Dark mode (por defecto)

| Rol | Variable | Valor |
|-----|----------|-------|
| Fondo principal | `--bg` | `#070708` |
| Fondo secundario | `--bg2` | `#0f0f12` |
| Fondo de tarjeta | `--card` | `#0d0d10` |
| Texto principal | `--text` | `#ffffff` |
| Texto suave (sub) | `--soft` | `#d6dbe6` |
| Texto secundario | `--muted` | `#8a8f9c` |
| Borde / hairline | `--hair` | `rgba(255,255,255,0.09)` |
| Relleno sutil | `--fill` | `rgba(255,255,255,0.035)` |
| Relleno sutil 2 (badges) | `--fill2` | `rgba(255,255,255,0.06)` |
| Fondo navbar | `--nav` | `rgba(10,10,12,0.72)` |
| Fondo mockup/placeholder | `--mockup` | `#0b0c11` |
| Líneas del placeholder | `--stripe` | `rgba(255,255,255,0.05)` |
| Acento | `--accent` | `#2563EB` |
| Acento variante (hover/links) | `--accent-2` | `#5b8cff` |
| Acento hover (botón) | — | `#1d4ed8` |
| Texto sobre acento | `--on-accent` | `#ffffff` |

### Light mode

| Rol | Variable | Valor |
|-----|----------|-------|
| Fondo principal | `--bg` | `#ffffff` |
| Fondo secundario | `--bg2` | `#f4f5f8` |
| Fondo de tarjeta | `--card` | `#ffffff` |
| Texto principal | `--text` | `#0a0a0b` |
| Texto suave (sub) | `--soft` | `#2c2f37` |
| Texto secundario | `--muted` | `#5b606c` |
| Borde / hairline | `--hair` | `rgba(0,0,0,0.1)` |
| Relleno sutil | `--fill` | `rgba(0,0,0,0.03)` |
| Relleno sutil 2 (badges) | `--fill2` | `rgba(0,0,0,0.05)` |
| Fondo navbar | `--nav` | `rgba(255,255,255,0.8)` |
| Fondo mockup/placeholder | `--mockup` | `#eef1f7` |
| Líneas del placeholder | `--stripe` | `rgba(0,0,0,0.05)` |
| Acento | `--accent` | `#2563EB` |
| Acento variante (hover/links) | `--accent-2` | `#1d4ed8` |
| Acento hover (botón) | — | `#1d4ed8` |
| Texto sobre acento | `--on-accent` | `#ffffff` |

### Colores fijos (no cambian por modo)

- Punto "disponible" (verde): `#16a34a`, con glow `#22c55e`
- Semáforo del mockup de navegador: rojo `#ff5f57`, amarillo `#febc2e`, verde `#28c840`

---

## 2. Tipografía

- **Familia principal:** `Geist` (Google Fonts). Pesos cargados: 400, 500, 600, 700.
- **Monoespaciada (etiquetas, kickers, URLs):** `Geist Mono` (Google Fonts). Pesos: 400, 500.
- Import:
  `https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap`
- En código real equivale al paquete npm `geist` (Vercel) o `geist/font`.

| Uso | Tamaño | Peso | Notas |
|-----|--------|------|-------|
| H1 / Hero (nombre) | `clamp(48px, 6.2vw, 84px)` | 600 | `line-height:0.96`, `letter-spacing:-0.045em` |
| H1 de página interior | `clamp(34px, 4.6vw, 60px)` | 600 | `letter-spacing:-0.035em` |
| H2 de sección | `clamp(30px, 3.8vw, 46px)` | 600 | `letter-spacing:-0.03em` |
| H3 (tarjetas, pasos) | `20px – 26px` | 600 | `letter-spacing:-0.02em` |
| Subtítulo hero | `clamp(19px, 2.1vw, 23px)` | 500 | color `--text` |
| Párrafo cuerpo | `16.5px – 18.5px` | 400 | `line-height:1.6` |
| Texto secundario hero | `17.5px` | 400 | color `--muted` |
| Kicker / etiqueta (mono) | `11px – 14px` | 500 | `Geist Mono`, `letter-spacing:0.06–0.1em`, `text-transform:uppercase`, color `--accent-2` |
| Badge pequeño | `13px` | 500 | pill, color `--soft` |

---

## 3. Espaciados y layout

- **Ancho máximo de contenido:** `1180px` (`max-width:1180px; margin:0 auto`). El hero usa el mismo 1180px; el bloque de proceso usa `1000px`; detalle/sobre-mí usan `1000–1080px`.
- **Padding horizontal de página:** `clamp(20px, 6vw, 72px)`.
- **Padding vertical entre secciones:** ~`56px–90px` arriba/abajo por sección (`padding:56px … 80px` típico). El hero: `min-height:96vh`, `padding-top:108px`.
- **Navbar:** fija, `top:14px`, altura `52px`, `max-width:1140px`.

### Grids
- **Grid de proyectos (destacados y listado):**
  `grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap:34px`.
- **Grid de servicios (cards):**
  `repeat(auto-fill, minmax(330px, 1fr)); gap:22px`.
- **Hero:** `grid-template-columns: 1.02fr 0.98fr; gap:clamp(20px,3vw,48px); align-items:center`.
- **Footer:** `grid-template-columns: 1.6fr 1fr 1fr; gap:44px`.
- **Detalle (problema/solución):** `grid-template-columns: 200px 1fr; gap:34px`.

---

## 4. Efecto de glow / gradiente

El glow se controla con una variable `--glow` (0–1). En **dark** el valor base es
`0.7`; en **light** se multiplica por `0.4` (queda mucho más sutil). El usuario
puede ajustar la intensidad base 0–100.

Patrones exactos:

- **Glow atmosférico del hero (detrás de la foto):**
  ```css
  background: radial-gradient(46% 52% at 50% 46%,
    rgb(37 99 235 / calc(var(--glow) * 0.85)) 0%,
    rgb(37 99 235 / calc(var(--glow) * 0.32)) 40%,
    transparent 72%);
  filter: blur(54px);
  width:160%; height:120%;   /* se extiende más allá de la foto */
  ```
- **Wash de fondo del hero (sección completa):**
  ```css
  background: radial-gradient(70% 60% at 64% 46%,
    rgb(37 99 235 / calc(var(--glow) * 0.4)) 0%, transparent 72%);
  ```
- **Glow detrás de tarjetas de proyecto (en hover):** halo radial
  `radial-gradient(60% 60% at 50% 38%, rgb(37 99 235 / calc(var(--glow) * 0.9)), transparent 70%)`,
  `filter:blur(32px)`, `opacity` 0→1 en hover.
- **Glow en banners CTA:** radial centrado arriba,
  `rgb(37 99 235 / calc(var(--glow) * 0.95))`, `filter:blur(44px)`.
- **Integración de la foto del hero:** además del glow, la imagen tiene un fundido
  inferior con máscara: `mask-image: linear-gradient(to bottom, #000 64%, transparent 97%)`
  y `drop-shadow(0 30px 70px rgb(37 99 235 / calc(var(--glow)*0.45)))`.

Aparece en: hero, tarjetas de proyecto (hover), banners/CTA, avatar de contacto,
estado vacío de proyectos. **En light mode el glow no desaparece pero se reduce al 40%.**

---

## 5. Componentes

### Botón primario
- Fondo `--accent` (`#2563EB`); texto `--on-accent` (`#fff`).
- `border:none; border-radius:12px; padding:15px 28px; font-size:15.5px; font-weight:500`.
- Sombra: `0 8px 30px rgba(37,99,235,0.45)` + borde interno `0 0 0 1px rgba(37,99,235,0.5) inset`.
- **Hover:** fondo `#1d4ed8`, `transform:translateY(-2px)`, sombra a `0 12px 40px rgba(37,99,235,0.6)`.

### Botón secundario / link
- Fondo `--fill`; texto `--soft`; `border:1px solid --hair; border-radius:12px; padding:15px 28px`.
- **Hover:** texto `--text`, borde `rgba(37,99,235,0.6)`, `translateY(-2px)`.
- Links de texto: color `--accent-2`, sin subrayado; hover → `--text`.

### Tarjeta de proyecto
- Fondo `--card`; `border:1px solid --hair; border-radius:18px; overflow:hidden`.
- Lleva un **mockup de navegador** arriba: barra con 3 puntos de semáforo
  (`#ff5f57 / #febc2e / #28c840`) + barra de URL en `Geist Mono 10.5px`.
- Área de preview: `aspect-ratio:16/10`, fondo `--mockup` con líneas diagonales
  (`repeating-linear-gradient(135deg, var(--stripe) 0 2px, transparent 2px 13px)`).
- Cuerpo: `padding:20px 22px 24px`. Badge de servicio (pill azul) + categoría (mono).
  Título `22px/600`, tagline `14.5px --muted`, chips de tech.
- **Hover:** `transform:translateY(-6px)`, borde → `rgba(37,99,235,0.55)`, halo glow
  visible, flecha "Ver caso" se desplaza `+4px`. Transición `0.5s cubic-bezier(.2,.7,.2,1)`.

### Badge / etiqueta de tecnología o categoría
- **Chip de tech:** `font-size:11px; font-weight:500; color:--muted; padding:3px 9px;
  border-radius:6px; background:--fill2; border:1px solid --hair`.
- **Pill de servicio (azul):** `padding:5px 11px; border-radius:999px;
  background:rgb(37 99 235 / 0.1); border:1px solid rgb(37 99 235 / 0.32)`,
  punto `5px` color `--accent`, texto `11.5px --soft`.
- **Pill del hero (glass):** `padding:7px 13px; border-radius:999px; background:--fill2;
  border:1px solid --hair; backdrop-filter:blur(8px); font-size:13px`.
- **Badge "disponible":** pill con punto verde `#16a34a` (glow `#22c55e`), texto `13px --soft`.

### Barra de navegación
- Pill flotante: `position:fixed; top:14px`, `height:52px`, `max-width:1140px`,
  `border-radius:14px`, `border:1px solid --hair`, fondo `--nav` con
  `backdrop-filter:blur(18px)`, sombra `0 12px 40px rgba(0,0,0,0.22)`.
- Logo: punto `9px` color acento con glow + wordmark `14px/600`, `letter-spacing:0.13em`, uppercase.
- Links: `font-size:14px; font-weight:500; padding:8px 13px`; activo en `--accent-2`, resto `--soft` → hover `--text`.
- Incluye toggle ES/EN (pill), toggle de tema (sol/luna), y botón "Hablemos" (estilo botón primario compacto, `padding:9px 17px`).

---

## 6. Animaciones

- **Entrada por sección (slide-up):** elementos con `[data-reveal]` parten en
  `transform:translateY(20–22px)` y se llevan a `translateY(0)` vía
  `IntersectionObserver` (threshold ~0.06). Transición típica:
  `transform .7s–.85s cubic-bezier(.25,.4,.25,1)`. En el hero se escalonan con
  `transition-delay` de `.12s` a `.56s`.
  > Nota: la entrada usa **solo transform** (la opacidad queda en 1) para que el
  > contenido nunca se vea en blanco si el navegador frena las animaciones.
- **Formas geométricas del hero (fondo):** "píldoras" azules que entran desde
  arriba (`translateY(-48px)` → 0, `transition 1.5s cubic-bezier(.23,.86,.39,.96)`)
  y luego flotan en loop con `@keyframes mf-float` (`translateY` ±15px,
  `ease-in-out infinite`, 11–15s).
- **Punto "disponible":** `@keyframes mf-pulse` (opacidad/scale, 2.4s infinite).
- **Marquee "Mi stack" (Sobre mí):** `@keyframes mf-marquee` (`translateX(0 → -50%)`,
  `26s linear infinite`); se **pausa en hover**. Lista duplicada + máscara de
  desvanecido en los bordes.
- **Hover de tarjetas/botones:** transiciones de `0.2s–0.5s ease`.

---

## 7. Diferencias entre dark y light mode

Además de los colores de la sección 1:

- **Glow:** no desaparece, pero su intensidad se multiplica por `0.4` en light
  (`--glow` base 0.7 → efectivo ~0.28). En dark queda protagonista; en light, sutil.
- **Placeholders (mockups/imágenes):** fondo `--mockup` y líneas `--stripe` se
  invierten (de oscuro translúcido-blanco a claro translúcido-negro).
- **Navbar:** fondo translúcido pasa de negro (`rgba(10,10,12,0.72)`) a blanco
  (`rgba(255,255,255,0.8)`); el blur se mantiene.
- **`--accent-2`:** en dark es un azul claro (`#5b8cff`) para destacar sobre fondo
  oscuro; en light es más oscuro (`#1d4ed8`) para contraste sobre blanco.
- **`color-scheme`:** se setea a `dark`/`light` para que controles nativos
  (scrollbars, inputs) acompañen el modo.
- El resto de la estructura, espaciados, radios y sombras **no cambian** entre modos.
