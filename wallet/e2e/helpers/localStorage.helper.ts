import type { Page } from '@playwright/test';

export class LocalStorageHelper {
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

  public async deleteAccounts(): Promise<void> {
    await this.page.evaluate(() => {
      localStorage.removeItem('localAccounts');
    });
    await this.page.reload();
  }
}
