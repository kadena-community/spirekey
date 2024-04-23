import { Locator, Page } from '@playwright/test';

export class RecoverPage {
  private page: Page;
  private passKeyBtn: Locator;
  private completeBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.passKeyBtn = this.page.getByAltText('fingerprint icon');
    this.completeBtn = this.page.getByRole('button', { name: 'Complete' });
  }

  async selectPassKey(): Promise<void> {
    await this.page.getByRole('heading', { name: 'Passkey' }).waitFor();
    await this.passKeyBtn.click();
  }

  async completeRegistration(): Promise<void> {
    await this.completeBtn.click();
  }
}
