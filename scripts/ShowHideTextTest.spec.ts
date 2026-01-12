import { test, expect } from "@playwright/test";

test("Show and Hide Details", async ({ page }) => {
  await page.goto("/my-browser");

  const showButton = page.locator("text=Show Browser Information");
  const hideButton = page.locator("text=Hide Browser Information");
  const details = page.locator("#browser-info");

  await expect(details).toBeHidden();

  await expect(showButton).toBeVisible();
  await expect(showButton).toHaveText("Show Browser Information");

  await showButton.click();

  await expect(details).toBeVisible();

  const text = await details.textContent();
  await expect(text?.trim().length ?? 0).toBeGreaterThan(0);
  await expect(details).toContainText(/win32/i);

  await expect(hideButton).toBeVisible();
  await expect(hideButton).toHaveText("Hide Browser Information");

  await hideButton.click();

  await expect(details).toBeHidden();

  await expect(showButton).toBeVisible();
  await expect(showButton).toHaveText("Show Browser Information");
});
