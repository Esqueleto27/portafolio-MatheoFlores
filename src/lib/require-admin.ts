import { headers } from "next/headers";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { isAdminEmail } from "./admin-email";

// /admin is protected by Cloudflare Access: there is no login page, user
// table or password in this app. Access authenticates the visitor (email +
// one-time code) before the request reaches the Worker and forwards a
// signed JWT in this header.
const ACCESS_JWT_HEADER = "cf-access-jwt-assertion";

// Cached per isolate — jose refetches the team's signing keys on its own
// when they rotate.
let jwks: { teamDomain: string; keys: ReturnType<typeof createRemoteJWKSet> } | null = null;

async function verifyAccessEmail(token: string, teamDomain: string, aud: string) {
  const issuer = `https://${teamDomain}`;
  if (jwks?.teamDomain !== teamDomain) {
    jwks = { teamDomain, keys: createRemoteJWKSet(new URL(`${issuer}/cdn-cgi/access/certs`)) };
  }
  const { payload } = await jwtVerify(token, jwks.keys, { issuer, audience: aud });
  return typeof payload.email === "string" ? payload.email : null;
}

// The real access-control boundary for the panel: called by the admin
// layout and by every admin Server Action. The middleware's header check
// is only a cheap first filter — the header can be forged by anyone who
// reaches the Worker without going through Access (e.g. workers.dev), the
// signature can't.
export async function requireAdmin(): Promise<{ email: string }> {
  const { env } = await getCloudflareContext({ async: true });

  // `next dev` only (Access never sits in front of localhost). Any built
  // bundle — including `npm run preview` — runs with NODE_ENV=production.
  if (process.env.NODE_ENV === "development") {
    return { email: env.ADMIN_EMAIL };
  }

  const token = (await headers()).get(ACCESS_JWT_HEADER);
  if (!token || !env.CF_ACCESS_TEAM_DOMAIN || !env.CF_ACCESS_AUD) {
    throw new Error("No autorizado");
  }

  const email = await verifyAccessEmail(token, env.CF_ACCESS_TEAM_DOMAIN, env.CF_ACCESS_AUD).catch(
    () => null
  );
  // Being let through by the Access policy is not enough — only
  // ADMIN_EMAIL may use the panel, even if the policy is widened later.
  if (!email || !isAdminEmail(email, env.ADMIN_EMAIL)) throw new Error("No autorizado");
  return { email };
}
