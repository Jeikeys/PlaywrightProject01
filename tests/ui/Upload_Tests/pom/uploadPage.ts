import { Page, Locator } from "@playwright/test";

export class UploadPage {
  readonly page: Page;
  readonly fileInput: Locator;
  readonly uploadBtn: Locator;
  readonly successMsg: Locator;
  readonly failedMsg: Locator;
  readonly alertClose: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fileInput = page.locator('input[type="file"]');
    this.uploadBtn = page.locator(
      'button[type="submit"], button:has-text("Upload")'
    );
    this.successMsg = page.locator(".alert-info");
    // this.failedMsg = page.locator(".alert-danger");
    this.failedMsg = page.getByRole("alert").filter({ hasText: /too large/i });
    // this.alertClose = page.locator('button[class="btn-close"], button[dismiss="alert"]');
    this.alertClose = page
      .getByRole("alert")
      .getByRole("button", { name: /close/i });
  }

  async goto() {
    await this.page.goto("/upload");
  }

  async uploadFile(filePath: string) {
    await this.fileInput.setInputFiles(filePath);
    await this.uploadBtn.click();
  }

  async closeAlert(filePath: string) {
    await this.fileInput.setInputFiles(filePath);
    await this.uploadBtn.click();
  }

  async checkFail() {
    await this.alertClose.click();
  }
}
