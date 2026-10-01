import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    // Runs against the real Workers runtime (workerd), not `next dev` —
    // middleware, bindings and the rate limiter behave like production.
    baseURL: "http://localhost:8787",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run preview",
    url: "http://localhost:8787/api/health",
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
  },
});
