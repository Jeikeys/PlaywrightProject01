import { Page, Locator, expect } from "@playwright/test";

export class DynamicPaginationPage {
  readonly page: Page;
  readonly table: Locator;
  readonly rows: Locator;
  readonly nextButton: Locator;
  readonly previousButton: Locator;
  readonly lastButton: Locator;
  readonly pageSizeDropdown: Locator;
  readonly infoText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.table = page.locator("table.dataTable");
    this.rows = page.locator("table.dataTable tbody tr");
    this.nextButton = page.locator("#example_next");
    this.previousButton = page.locator("#example_previous");
    this.lastButton = page.locator("#example_last");
    this.pageSizeDropdown = page.locator("select[name='example_length']");
    this.infoText = page.locator("#example_info");
  }

  async goto() {
    await this.page.goto(
      "/dynamic-pagination-table"
    );
    await expect(this.table).toBeVisible();
  }

  async getRowCount(): Promise<number> {
    return await this.rows.count();
  }

  async getCellText(rowIndex: number, columnIndex: number): Promise<string> {
    return await this.rows
      .nth(rowIndex)
      .locator("td")
      .nth(columnIndex)
      .innerText();
  }

  async getAllColumnValues(columnIndex: number): Promise<string[]> {
    const values: string[] = [];
    const rowCount = await this.getRowCount();

    for (let i = 0; i < rowCount; i++) {
      const value = await this.getCellText(i, columnIndex);
      values.push(value);
    }
    return values;
  }

  async changePageSize(size: string) {
    const previousInfo = await this.infoText.innerText();

    await this.pageSizeDropdown.selectOption({ label: size });

    await expect(this.infoText).not.toHaveText(previousInfo);
  }

async goToNextPage() {
  await expect(this.nextButton).not.toHaveClass(/disabled/);

  const firstRowBefore = await this.getCellText(0, 0);

  await this.nextButton.click();

  await expect
    .poll(async () => await this.getCellText(0, 0))
    .not.toBe(firstRowBefore);
}

  async getTableInfoText(): Promise<string> {
    return await this.infoText.innerText();
  }

async goToPreviousPage() {
  await expect(this.previousButton).not.toHaveClass(/disabled/);

  const firstRowBefore = await this.getCellText(0, 0);

  await this.previousButton.click();

  await expect
    .poll(async () => await this.getCellText(0, 0))
    .not.toBe(firstRowBefore);
}

async goToLastPage() {
  await expect(this.lastButton).not.toHaveClass(/disabled/);

  await this.lastButton.click();

  await expect(this.infoText).toContainText("of");
}
}
