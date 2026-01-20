import { test } from "@playwright/test";
import { DragDropCirclesPage } from "./pom/dragdropPage";

test("Circles is dropped into the bin in any order", async ({ page }) => {
  const circlesPage = new DragDropCirclesPage(page);

  await circlesPage.goto();

  await circlesPage.dragMultipleCirclesToBin(["green", "red", "blue"]);
});

test("Circle is dropped outside the bin", async ({ page }) => {
  const circlesPage = new DragDropCirclesPage(page);

  await circlesPage.goto();

  await circlesPage.dragCircleToInvalidTarget("red");
});
