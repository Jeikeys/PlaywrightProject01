import { Page, Locator } from '@playwright/test';

export class DynamicTablePage {
  readonly page: Page;
  readonly table: Locator;
  readonly headerCells: Locator;
  readonly bodyRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.table = page.locator('table.table-striped');
    this.headerCells = this.table.locator('thead tr th');
    this.bodyRows = this.table.locator('tbody tr');
  }

  async navigate(): Promise<void> {
    await this.page.goto('/dynamic-table');
  }

  async getHeaderTexts(): Promise<string[]> {
    const count = await this.headerCells.count();
    const headers: string[] = [];
    for (let i = 0; i < count; i++) {
      headers.push(
        (await this.headerCells.nth(i).textContent())?.trim() ?? ''
      );
    }
    return headers;
  }

  async getColumnIndex(headerName: string): Promise<number> {
    const headers = await this.getHeaderTexts();
    const h = headers.findIndex(h => h.toLowerCase() === headerName.toLowerCase());
    if (h === -1) {
      throw new Error(`Header "${headerName}" not found. Available header: ${headers.join(', ')}`);
    }
    return h;
  }

  async getRowByText(rowText: string): Promise<Locator> {
  const target = rowText.toLowerCase();

  const rows = this.bodyRows;
  const count = await rows.count();

  for (let i = 0; i < count; i++) {
    const row = rows.nth(i);
    const text = (await row.innerText()).toLowerCase();

    if (text.includes(target)) {
      return row;
    }
  }

  const availableRows = await rows.allTextContents();
  throw new Error(
    `Row that contain "${rowText}" is not found. Available rows:\n${availableRows.join('\n')}`
  );
  }

  async getCellValue(rowText: string, headerName: string): Promise<string> {
    const row = await this.getRowByText(rowText);
    const colIndex = await this.getColumnIndex(headerName);
    const cell = row.locator('td').nth(colIndex);
    return (await cell.textContent())?.trim() ?? '';
  }

}