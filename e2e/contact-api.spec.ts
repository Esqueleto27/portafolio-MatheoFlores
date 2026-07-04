import { test, expect } from "@playwright/test";

// Direct HTTP checks against the route handler — no browser needed.
// Rate limiting is checked first in the handler (before body parsing), so
// these requests never reach the point of writing to the database.
//
// .serial + ordering matters: the rate limit (3 req/15min) is shared by
// IP across all requests this file makes, so the budget-exhausting test
// must run last or it starves the validation checks above it.
test.describe.serial("POST /api/contact", () => {
  test("rejects a payload missing required fields", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: { name: "", email: "not-an-email", message: "" },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toBeTruthy();
  });

  test("rejects an unknown service_id", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: {
        name: "Test",
        email: "test@example.com",
        service_id: "does-not-exist",
        timeline: "urgent",
        message: "Hello",
      },
    });
    expect(res.status()).toBe(400);
  });

  test("enforces the rate limit after repeated requests", async ({ request }) => {
    const attempt = () => request.post("/api/contact", { data: { garbage: true } });

    const results = [];
    for (let i = 0; i < 5; i++) {
      results.push((await attempt()).status());
    }

    expect(results).toContain(429);
  });
});
