import { test, expect } from "@playwright/test";
import { homepage } from "./page_object_model/homepage";
import { registerpage } from "./page_object_model/registerpage";

test.beforeEach("go to registerpage", async ({ page }) => {
  console.log("before input text");
  const newhomepage = new homepage(page);
  const newregister = new registerpage(page);

  await newhomepage.gotohomepage();
  await newregister.clicktestregisterpage();
});

test("Succesful Register", async ({ page }) => {
  const newregister = new registerpage(page);
  const confirmtext = page.locator("#flash");

  await newregister.register("newaccount", "newpassword", "newpassword");
});

test.describe("Empty Fields", () => {
  test("Empty All Fields", async ({ page }) => {
    const newregister = new registerpage(page);
    const confirmtext = page.locator("#flash");

    await newregister.register("", "", "");
    await expect(confirmtext).toHaveText("All fields are required.");
  });

  test("Empty Username", async ({ page }) => {
    const newregister = new registerpage(page);
    const confirmtext = page.locator("#flash");

    await newregister.register("", "newpassword", "newpassword");
    await expect(confirmtext).toHaveText("All fields are required.");
  });

  test("Empty Password", async ({ page }) => {
    const newregister = new registerpage(page);
    const confirmtext = page.locator("#flash");

    await newregister.register("newusername", "", "newpassword");
    await expect(confirmtext).toHaveText("All fields are required.");
  });

  test("Empty Confirm Password", async ({ page }) => {
    const newregister = new registerpage(page);
    const confirmtext = page.locator("#flash");

    await newregister.register("newusername", "newpassword", "");
    await expect(confirmtext).toHaveText("All fields are required.");
  });

  test.afterEach("Empty All Fields", async ({ page }) => {
    const confirmtext = page.locator("#flash");
    const newregister = new registerpage(page);

    await expect(confirmtext).toHaveText("All fields are required.");
    await newregister.isemptyfields();
  });
});

test("Unmatched Password", async ({ page }) => {
  const newregister = new registerpage(page);
  const confirmtext = page.locator("#flash");

  await newregister.register("newaccount", "newpasspassword", "newpassword");
  await expect(confirmtext).toHaveText("Passwords do not match.");
});

//generate random text
function makeid(length: number) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

test("Username Character Limit", async ({ page }) => {
  const newregister = new registerpage(page);
  const confirmtext = page.locator("#flash");

  await newregister.register(makeid(39), "newpassword", "newpassword");
  await expect.soft(confirmtext).toHaveText("Username must be at least 3 characters long.");
  await expect.soft(confirmtext).toHaveText("Invalid username. Usernames can only contain lowercase letters, numbers, and single hyphens, must be between 3 and 39 characters, and cannot start or end with a hyphen.");
  });
