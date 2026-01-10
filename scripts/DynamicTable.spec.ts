import { test, expect } from '@playwright/test';
import { DynamicTablePage } from './page_object_model/matchinglocator';

test('Search and Match Chrome CPU value', async ({ page }) => {
  const tbl = new DynamicTablePage(page);
  await tbl.navigate();

  const cpu = await tbl.getCellValue('Chrome', 'CPU');
  console.log('Chrome CPU from table:', cpu);

  const label = await page.locator('p.bg-warning').textContent();
  const labelVal = label?.replace('Chrome CPU:', '').trim();
  console.log('Chrome CPU from label:', labelVal);

  expect(cpu).toBe(labelVal);
});