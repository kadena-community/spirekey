import type { Page } from '@playwright/test';

export class DevModeHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async enableDevMode(): Promise<void> {
    await this.page.evaluate(() => {
      localStorage.setItem('devMode', 'true');
    });
    await this.page.reload();
  }
}
