import { getCloudflareContext } from "@opennextjs/cloudflare";

// Workers Rate Limiting binding (CONTACT_RATE_LIMITER in wrangler.jsonc):
// counted at Cloudflare's edge, so it holds across isolates — no Redis.
// For stricter rules (e.g. 3 per 15 min, or blocking an IP for a while),
// add a WAF rate limiting rule for POST /api/contact in the dashboard.
export async function isRateLimited(ip: string): Promise<boolean> {
  const { env } = await getCloudflareContext({ async: true });
  const { success } = await env.CONTACT_RATE_LIMITER.limit({ key: ip });
  return !success;
}
