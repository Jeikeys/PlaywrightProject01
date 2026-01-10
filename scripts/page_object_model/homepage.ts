import { Page } from "@playwright/test";

export class homepage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotohomepage() {
    await this.page.goto("https://practice.expandtesting.com/");
  }

}
