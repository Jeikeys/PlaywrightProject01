import { test, expect } from "@playwright/test";
import path from "path";
import { UploadPage } from "./pom/uploadPage";

test.describe("File Upload Page", () => {
  let upload: UploadPage;

  test.beforeEach(async ({ page }) => {
    upload = new UploadPage(page);
    await upload.goto();
  });

  test("Upload a valid file", async () => {
    const fileToUpload = path.resolve(
      __dirname,
      "./UploadFolder/uploadsample.txt"
    );

    await upload.uploadFile(fileToUpload);

    await expect(upload.successMsg).toBeVisible();
  });

  test("Upload an invalid file", async () => {
    const largeFile = path.resolve(__dirname, "./UploadFolder/white-bg.jpg");
    await upload.uploadFile(largeFile);

    await expect(upload.failedMsg).toBeVisible();
    await expect(upload.alertClose).toBeVisible();
    await upload.checkFail;
  });
});
