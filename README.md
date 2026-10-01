# Matheo Flores — Portafolio

Portafolio personal de **Matheo Flores**, desarrollador web full-stack en Quito, Ecuador.

Sitio: [matheoflores.dev](https://www.matheoflores.dev)

## Stack

Stack B (Thexify Dynamic) — hay datos que se administran desde un panel (proyectos, servicios, mensajes).

| Pieza | Elección |
|---|---|
| Framework | Next.js 15.5.x (App Router) + TypeScript — fijado con `~`, sin saltar a 16 hasta validarlo contra OpenNext |
| Hosting | Cloudflare Workers vía `@opennextjs/cloudflare` |
| Base de datos | Cloudflare D1 (binding `DB`) + Drizzle ORM |
| Imágenes subidas | Cloudflare R2 privado (binding `PHOTOS`), servido por `/api/media/...` |
| Optimización de imágenes | `next/image` con el binding `IMAGES` (Cloudflare Images) |
| Panel `/admin` | Cloudflare Access (sin login propio, sin contraseñas en la app) |
| Rate limiting | Binding de Workers Rate Limiting (`CONTACT_RATE_LIMITER`) |
| Correo | Resend (aviso de mensaje nuevo + confirmación al visitante) |
| i18n | next-intl (`/es`, `/en`) |
| Estilos | Tailwind CSS v4, Geist |
| Analítica | Cloudflare Web Analytics (se activa en el dashboard) |

## Desarrollo local

```bash
npm install
cp .dev.vars.example .dev.vars
npm run db:migrate:local   # crea las tablas + servicios por defecto en la D1 local
npm run db:seed-demo       # opcional: proyectos de ejemplo
npm run dev
```

`next dev` usa D1/R2 simulados en `.wrangler/state`. En `next dev` el panel `/admin` está abierto (no hay Access en localhost).

Para probar en el runtime real de Workers (workerd), igual que producción:

```bash
npm run preview            # http://localhost:8787
```

En `preview` el panel queda **cerrado** (403): sólo se entra a través de Cloudflare Access.

Otros comandos: `npm run lint`, `npm run typecheck`, `npm run test:e2e` (Playwright contra `preview`).

### Cambiar el esquema

1. Editar `src/db/schema.ts`
2. `npm run db:generate` → crea un `.sql` nuevo en `migrations/`
3. `npm run db:migrate:local`
4. Si cambian bindings o vars en `wrangler.jsonc`: `npm run cf-typegen`

## Primer despliegue

Una sola vez, con `npx wrangler login` en la cuenta de Cloudflare que corresponda:

```bash
npx wrangler d1 create matheo-flores-db       # copiar el database_id a wrangler.jsonc
npx wrangler r2 bucket create matheo-flores-photos
npx wrangler secret put RESEND_API_KEY
npm run db:migrate:remote
npm run deploy
```

Después, en el dashboard:

1. **Dominio** — con la zona `matheoflores.dev` en la cuenta, descomentar `routes` en `wrangler.jsonc` y volver a desplegar. Luego poner `workers_dev: false`.
2. **Cloudflare Access** (Zero Trust → Access → Applications → Self-hosted):
   - Hostname: `matheoflores.dev/admin*` (y `www.matheoflores.dev/admin*`)
   - Policy: Allow → Emails → `matheofloresloor@gmail.com`
   - Copiar el *Application Audience (AUD) tag* a `CF_ACCESS_AUD` y el team domain (`<equipo>.cloudflareaccess.com`) a `CF_ACCESS_TEAM_DOMAIN` en `wrangler.jsonc`, y redesplegar. Hasta entonces `/admin` responde 403/404 en producción.
3. **Seguridad de la zona**: SSL/TLS "Full (strict)", Bot Fight Mode, regla WAF `(len(http.request.headers["x-middleware-subrequest"]) > 0)` → Block, y opcionalmente una regla de rate limiting para `POST /api/contact`.
4. **Web Analytics**: activarlo para el dominio (la CSP ya permite el beacon).
5. **Resend**: verificar el dominio del remitente (`RESEND_FROM`).

### Deploy automático (GitHub Actions)

`.github/workflows/deploy.yml` corre lint + typecheck + build en cada push/PR. El deploy (migraciones remotas + `npm run deploy`) se activa al definir en el repo:

- Secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
- Variable: `CLOUDFLARE_DEPLOY` = `true`

## Notas

- **Windows**: si `opennextjs-cloudflare build` falla con `EPERM: symlink`, activar el *Modo de desarrollador* de Windows. No trabajar el proyecto dentro de OneDrive/iCloud.
- Si el build tira `No loader is configured for ".map" files`, borrar `.next` y `.open-next` y reintentar.
- Las páginas que leen D1 son `force-dynamic` a propósito: así los cambios del panel aparecen al instante y el build no necesita la base.
