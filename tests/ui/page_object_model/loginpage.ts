import { Page, Locator } from "@playwright/test";

export class loginpage {
  readonly page: Page;
  readonly username_textbox: Locator;
  readonly password_textbox: Locator;
  readonly login_button: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username_textbox = page.getByRole("textbox", { name: "Username" });
    this.password_textbox = page.getByRole("textbox", { name: "Password" });
    this.login_button = page.getByRole("button", { name: "Login" });
  }

  async clicktestloginpage() {
    await this.page.getByRole("link", { name: "Test Login Page" }).click();
  }

  async login(username:any, password:any) {
    await this.username_textbox.fill(username);
    await this.password_textbox.fill(password);
    await this.login_button.click();
  }
}
