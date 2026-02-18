import { test, expect } from "@playwright/test";

test("Drag and Drop A to B and back", async ({ page }) => {
  await page.goto("/drag-and-drop");

  const columnA = page.locator("#column-a");
  const columnB = page.locator("#column-b");

  await expect(columnA).toHaveText("A");
  await expect(columnB).toHaveText("B");

  await columnA.dragTo(columnB);

  await expect(columnA).toHaveText("B");
  await expect(columnB).toHaveText("A");

  await columnA.dragTo(columnB);

  await expect(columnA).toHaveText("A");
  await expect(columnB).toHaveText("B");
});
