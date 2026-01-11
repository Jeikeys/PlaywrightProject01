import { test, expect } from "@playwright/test";

test.describe("Practicing Different Locators Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/locators");
  });

  test("getByRole locator", async ({ page }) => {
  await page.getByRole('button', { name: 'Add Item' }).click();
  await page.getByRole('link', { name: 'Contact' }).click();
  await expect(page.getByRole('textbox').first()).toBeVisible;
  await expect(page.getByRole('textbox').nth(1)).toBeVisible;
  });

  test("getByText locator", async ({ page }) => {
    await expect(page.getByText("Hot Deal: Buy 1 Get 1 Free")).toBeVisible();

    await expect(page.getByText("Latest news and updates")).toBeVisible();
  });

  test("getByLabel locator", async ({ page }) => {
    await page.getByLabel("Choose a country").selectOption("Japan");

    await page.getByLabel("Email for newsletter").fill("example@email.com");
  });

  test("getByPlaceholder and getByAltText locators", async ({ page }) => {
    await page
      .getByPlaceholder("Search the site") //placeholder: the message seen before inserting texts
      .fill("https://practice.expandtesting.com/locators");

    await page
      .getByPlaceholder("Filter by tag")
      .fill("locator");

    await expect(page.getByAltText("User avatar")).toBeVisible();
  });

  test ("getByTitle and getByTestId locators", async ({ page }) => {
    await page.getByTitle("Refresh content").click();
    await expect(page.getByTitle("Settings panel")).toBeVisible();

    await expect(page.getByTestId("status-message")).toHaveText("All systems operational");
    await expect(page.getByTestId("user-name")).toHaveText("Username: Alice");
  });

  test("legacy CSS and XPath locators", async ({ page }) => {
    const legacy = page.locator(".legacy-css.text-primary");
    await expect(legacy).toBeVisible();
    await expect(legacy).toHaveText("This is a legacy CSS target");

    const rows = page.locator("//table/tbody/tr");
    await expect(rows).toHaveCount(3); //checks if rows did have 3 elements
  });
});
