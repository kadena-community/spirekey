import { Locator, Page } from '@playwright/test';

export class WelcomePage {
  public page: Page;
  private recoverBtn: Locator;
  private registerBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.recoverBtn = this.page.getByRole('link', { name: 'Recover' });
    this.registerBtn = this.page.getByRole('link', { name: 'Register' });
  }

  async startRegistration(): Promise<void> {
    await this.registerBtn.click();
  }

  async startRecovery(): Promise<void> {
    await this.recoverBtn.click();
  }
}
