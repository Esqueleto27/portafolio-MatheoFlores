import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema from "./schema";

// D1 is a Worker binding, not a connection string — it only exists inside
// a request's Cloudflare context, so this is async and per-call rather
// than a module-level singleton.
export async function getDb() {
  const { env } = await getCloudflareContext({ async: true });
  return drizzle(env.DB, { schema });
}
