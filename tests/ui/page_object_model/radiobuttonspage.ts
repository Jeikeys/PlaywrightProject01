import { Page, Locator } from '@playwright/test';

export class RadioButtonsPage {
  readonly page: Page;
  readonly colorRadios: (color: string) => Locator;
  readonly sportRadios: (sport: string) => Locator;

  constructor(page: Page) {
    this.page = page;

    this.colorRadios = (color: string) =>
      page.locator(`input[name="color"][value="${color}"]`);

    this.sportRadios = (sport: string) =>
      page.locator(`input[name="sport"][value="${sport}"]`);
  }

  async goto() {
    await this.page.goto('/radio-buttons');
  }

  async selectColor(color: string) {
    await this.colorRadios(color).check();
  }

  async selectSport(sport: string) {
    await this.sportRadios(sport).check();
  }
}