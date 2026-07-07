import { test, expect } from "@playwright/test";

test.describe("public site smoke flow", () => {
  test("home -> project detail -> contact form validation and submit", async ({ page }) => {
    // Home renders with the hero and at least one featured project card.
    await page.goto("/es");
    await expect(page.getByRole("heading", { name: /Matheo Flores/ })).toBeVisible();

    const firstCard = page.locator("a.project-card").first();
    await expect(firstCard).toBeVisible();
    await firstCard.click();

    // Project detail page loaded with a case study.
    await expect(page).toHaveURL(/\/es\/projects\/.+/);
    await expect(page.getByRole("link", { name: /Todos los proyectos/ })).toBeVisible();

    // Navigate to contact.
    await page.goto("/es/contact");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Submitting empty required fields shows inline validation, not a
    // silent failure or a native alert().
    await page.getByRole("button", { name: /Enviar mensaje/ }).click();
    await expect(page.getByText("Este campo es obligatorio").first()).toBeVisible();

    // Fill valid data. The actual network call is mocked so this test
    // doesn't write a real row into the contact_messages table.
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({ status: 200, json: { success: true } });
    });

    await page.getByLabel("Nombre").fill("Test E2E");
    await page.getByLabel("Correo electrónico").fill("test@example.com");
    await page.getByLabel("Tipo de proyecto").selectOption({ index: 1 });
    await page.getByLabel("Plazo").selectOption({ index: 1 });
    await page.getByLabel(/Cuéntame qué quieres lograr/).fill("Mensaje de prueba end-to-end.");

    await page.getByRole("button", { name: /Enviar mensaje/ }).click();
    await expect(page).toHaveURL(/\/es\/thank-you/);
  });

  test("admin routes redirect to login when signed out", async ({ page }) => {
    // The admin area lives outside the locale prefixes (/admin, not
    // /es/admin) — the proxy middleware must bounce anonymous visitors
    // to /login before anything renders.
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/login/);
  });
});
