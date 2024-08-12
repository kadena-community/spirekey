import { Locator, Page } from '@playwright/test';

export class RecoverPage {
  private page: Page;
  private devnetNetworkBtn: Locator;
  private nextBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.devnetNetworkBtn = this.page.getByLabel('network-devnet');
    this.nextBtn = this.page.getByRole('button', { name: 'Next' });
  }

  async selectPassKey(): Promise<void> {
    await this.page.getByRole('heading', { name: 'Recover' }).waitFor();
    await this.devnetNetworkBtn.click();
    await this.nextBtn.click();
  }
}
