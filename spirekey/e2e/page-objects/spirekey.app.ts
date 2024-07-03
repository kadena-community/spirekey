import { Page } from '@playwright/test';

export class SpireKeyApp {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openSpireKeyApp(): Promise<void> {
    await this.page.goto('./');
  }
}
