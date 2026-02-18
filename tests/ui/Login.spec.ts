import { test, expect } from "@playwright/test";
import { homepage } from "./page_object_model/homepage";
import { loginpage } from "./page_object_model/loginpage";


test.beforeEach(async ({ page }) => {
  const newhomepage = new homepage(page);
  const newloginpage = new loginpage(page);

  await newhomepage.gotohomepage();
  await newloginpage.clicktestloginpage();
});

test("Succesful Login", async ({ page }) => {
  const newloginpage = new loginpage(page);
  const confirmtext = page.locator('#flash');

  await newloginpage.login("practice", "SuperSecretPassword!");
  await expect(confirmtext).toHaveText('You logged into a secure area!');
  await page.getByRole('link', { name: 'Logout' }).click();
});

test("Incorrect Password", async ({ page }) => {
  const newloginpage = new loginpage(page);
  const confirmtext = page.locator('#flash');

  await newloginpage.login("practice", "wrongpassword");
  await expect(confirmtext).toHaveText('Your password is invalid!');
});

test("Incorrect Username", async ({ page }) => {
  const newloginpage = new loginpage(page);
  const confirmtext = page.locator('#flash');

  await newloginpage.login("wrongusername", "SuperSecretPassword!");
  await expect(confirmtext).toHaveText('Your username is invalid!');
});
