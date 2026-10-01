import { NextResponse } from "next/server";

// Lightweight endpoint for an external uptime monitor to ping.
export async function GET() {
  return NextResponse.json({ status: "ok" });
}
