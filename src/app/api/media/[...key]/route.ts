import { getCloudflareContext } from "@opennextjs/cloudflare";

// Serves admin-uploaded images from the private PHOTOS bucket. Going
// through the Worker (instead of a public r2.dev / custom bucket domain)
// keeps images same-origin — no CSP or next/image allowlist changes — and
// works identically in `next dev`, where the binding is a local simulated
// bucket that no public URL could ever point at.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string[] }> }
) {
  const { key } = await params;
  const objectKey = key.join("/");

  // Only uploads live under projects/ — don't expose anything else that
  // might end up in the bucket.
  if (!objectKey.startsWith("projects/") || objectKey.includes("..")) {
    return new Response("Not found", { status: 404 });
  }

  const { env } = await getCloudflareContext({ async: true });
  const object = await env.PHOTOS.get(objectKey);
  if (!object) return new Response("Not found", { status: 404 });

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  // Keys are unique per upload and never overwritten.
  headers.set("cache-control", "public, max-age=31536000, immutable");
  headers.set("x-content-type-options", "nosniff");

  return new Response(object.body, { headers });
}
