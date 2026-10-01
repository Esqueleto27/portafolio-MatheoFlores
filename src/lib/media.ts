// Public URL for an object in the PHOTOS R2 bucket. Its own module because
// a route.ts can't export helpers, and admin-actions ("use server") can
// only export async functions.
const MEDIA_PREFIX = "/api/media/";

export function mediaUrl(key: string): string {
  return `${MEDIA_PREFIX}${key}`;
}
