import { Page, Locator, expect } from "@playwright/test";

export class DragDropCirclesPage {
  readonly page: Page;
  readonly can: Locator;

  constructor(page: Page) {
    this.page = page;
    // Locator options
    // <div id="target" class="span-6 dragTarg" dropzone="true"></div>
    this.can = page.locator("#target");
    // this.can = page.locator('[dropzone="true"]');
    // this.can = page.locator(".dragTarg");
    // this.can = page.locator("div.dragTarg[dropzone='true']");
  }

  async goto() {
    await this.page.goto("/drag-and-drop-circles");
  }

  circleByColor(color: "red" | "green" | "blue") {
    return this.page.locator(`.${color}[draggable="true"]`);
  }

  async getBinCount(): Promise<number> {
    return await this.can.locator('[draggable="true"]').count();
  }

  async dragCircleToBin(color: "red" | "green" | "blue") {
    const circle = this.circleByColor(color);
    const beforeCount = await this.getBinCount();

    await circle.dragTo(this.can);

    await expect(this.can.locator("div")).toHaveCount(beforeCount + 1);
  }

  async dragMultipleCirclesToBin(colors: Array<"red" | "green" | "blue">) {
    for (const color of colors) {
      await this.dragCircleToBin(color);
    }
  }

  async dragCircleToInvalidTarget(color: "red" | "green" | "blue") {
    const circle = this.circleByColor(color);
    const beforeCount = await this.getBinCount();

    await circle.dragTo(this.page.locator("body"));

    await expect(circle).toBeVisible();

    await expect(this.can.locator('[draggable="true"]')).toHaveCount(
      beforeCount
    );
  }
}
