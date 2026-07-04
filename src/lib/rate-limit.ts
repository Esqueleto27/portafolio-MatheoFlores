import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const WINDOW_MS = 15 * 60 * 1000;
const LIMIT = 3;

// Distributed, correct across serverless instances — used whenever Upstash
// credentials are configured (set these in production).
const ratelimit =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(LIMIT, "15 m"),
        prefix: "ratelimit:contact",
      })
    : null;

// Fallback for local dev without Upstash credentials. Per-instance only
// (not correct across serverless replicas) — swept periodically so it
// can't grow unbounded, unlike a plain Map that's never pruned.
const memoryStore = new Map<string, { count: number; resetAt: number }>();

function sweepExpired(now: number) {
  for (const [key, entry] of memoryStore) {
    if (now > entry.resetAt) memoryStore.delete(key);
  }
}

function isRateLimitedInMemory(ip: string): boolean {
  const now = Date.now();
  if (memoryStore.size > 500) sweepExpired(now);
  const entry = memoryStore.get(ip);
  if (!entry || now > entry.resetAt) {
    memoryStore.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= LIMIT) return true;
  entry.count++;
  return false;
}

export async function isRateLimited(ip: string): Promise<boolean> {
  if (ratelimit) {
    const { success } = await ratelimit.limit(ip);
    return !success;
  }
  return isRateLimitedInMemory(ip);
}
