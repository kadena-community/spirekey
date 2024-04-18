import { Locator, Page } from '@playwright/test';

export class RegisterPage {
  private page: Page;
  private aliasInput: Locator;
  private cancelBtn: Locator;
  private nextBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.aliasInput = this.page.getByRole('textbox', { name: 'Your alias' });
    this.cancelBtn = this.page.getByRole('button', { name: 'Cancel' });
    this.nextBtn = this.page.getByRole('button', { name: 'Next' });
  }

  async setAliasTo(alias: string): Promise<void> {
    await this.page.getByRole('heading', { name: 'Alias' }).waitFor();
    await this.aliasInput.fill(alias);
  }

  async proceedToNextStep(): Promise<void> {
    await this.nextBtn.click();
  }
}
