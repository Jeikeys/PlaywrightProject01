import { test, expect } from "@playwright/test";
import { DynamicPaginationPage } from "./page_object_model/dynamicpagitable";

test.describe("Dynamic Pagination Table", () => {
  let tablePage: DynamicPaginationPage;

  test.beforeEach(async ({ page }) => {
    tablePage = new DynamicPaginationPage(page);
    await tablePage.goto();
  });

  test("Default page display", async () => {
    const rowCount = await tablePage.getRowCount();
    expect(rowCount).toBeGreaterThan(0);
  });

  test("Display entry size to 5", async () => {
    await tablePage.changePageSize("5");
    const rowCount = await tablePage.getRowCount();
    expect(rowCount).toBeLessThanOrEqual(5);

    const infoText = await tablePage.getTableInfoText();
    expect(infoText).toContain("5");
  });

  test("Display the next page", async () => {
    await tablePage.changePageSize("5");

    const firstPageFirstName = await tablePage.getCellText(0, 0);

    await tablePage.goToNextPage();

    const secondPageFirstName = await tablePage.getCellText(0, 0);

    expect(secondPageFirstName).not.toEqual(firstPageFirstName);
  });

  test("should verify all ages are numeric", async () => {
    // column index 3 = Age
    const ages = await tablePage.getAllColumnValues(3);

    for (const age of ages) {
      expect(Number(age)).not.toBeNaN();
    }
  });

  test("should find a known country in the table", async () => {
    // column index 2 = Country
    const countries = await tablePage.getAllColumnValues(2);

    expect(countries).toContain("United States");
  });
});
