import { test, expect } from "@playwright/test";

test("Add/Remove Elements", async ({ page }) => {
  await page.goto("/add-remove-elements");

  const addButton = page.getByRole("button", { name: "Add Element" });
  await expect(addButton).toBeVisible();
  await addButton.click();

  const newElement = page.locator("button", { hasText: "Delete" });
  await expect(newElement).toBeVisible();

  await newElement.click();

  await expect(newElement).toHaveCount(0);
});
