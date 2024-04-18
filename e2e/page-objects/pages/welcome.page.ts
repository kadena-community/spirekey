import { Locator, Page } from '@playwright/test';

export class WelcomePage {
  private page: Page;
  recoverBtn: Locator;
  registerBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.recoverBtn = this.page.getByRole('button', { name: 'Recover' });
    this.registerBtn = this.page.getByRole('button', { name: 'Register' });
  }

  async startRegistration(): Promise<void> {
    await this.registerBtn.click();
  }
}
