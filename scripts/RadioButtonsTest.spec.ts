import { test, expect } from '@playwright/test';
import { RadioButtonsPage } from './page_object_model/radiobuttonspage';

test('Selecting Radio Buttons', async ({ page }) => {
  const radioPage = new RadioButtonsPage(page);

  await radioPage.goto();

  await radioPage.selectColor('red');
  await expect(radioPage.colorRadios('red')).toBeChecked();

  await radioPage.selectSport('tennis');
  await expect(radioPage.sportRadios('tennis')).toBeChecked();
});