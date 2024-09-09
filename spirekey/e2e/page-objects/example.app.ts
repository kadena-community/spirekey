import { Page } from '@playwright/test';

export class SpireKeyExampleApp {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(): Promise<void> {
    await this.page.goto('http://localhost:1338');
  }
}
