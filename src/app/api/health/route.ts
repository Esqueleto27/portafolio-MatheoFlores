import { NextResponse } from "next/server";

// Used by Coolify's Healthcheck tab to know when the container is actually
// ready to serve traffic (not just that the Node process started).
export async function GET() {
  return NextResponse.json({ status: "ok" });
}
