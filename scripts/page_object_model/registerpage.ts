import { Page, Locator, expect } from "@playwright/test";

export class registerpage {
  readonly page: Page;
  readonly username_textbox: Locator;
  readonly password_textbox: Locator;
  readonly confirmpassword_textbox: Locator;
  readonly register_button: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username_textbox = page.getByRole("textbox", { name: "Username" });
    this.password_textbox = page.getByRole("textbox", { name: "Password", exact: true});
    this.confirmpassword_textbox = page.getByRole("textbox", {
      name: "Confirm Password" 
    });
    this.register_button = page.getByRole("button", { name: "Register" });
  }

  async clicktestregisterpage() {
    await this.page.getByRole("link", { name: "Test Register Page" }).click();
  }

  async isemptyfields() {
    await expect(this.username_textbox).toBeEmpty();
    await expect(this.password_textbox).toBeEmpty();
    await expect(this.confirmpassword_textbox).toBeEmpty();
  }

  async register(username: any, password: any, confirmpassword: any) {
    await this.username_textbox.fill(username);
    await this.password_textbox.fill(password);
    await this.confirmpassword_textbox.fill(confirmpassword);
    await this.register_button.click();
  }
}
