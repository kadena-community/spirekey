import { Locator, Page } from '@playwright/test';

export class AccountsPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getAccountCard(alias: string): Promise<Locator> {
    await this.page.getByRole('heading', { name: 'Accounts' }).waitFor();
    return this.page.getByRole('heading', { name: alias }); 
  }

  async isMinted(): Promise<void> {
    await this.page
      .getByTestId('fingerprint-icon')
      .waitFor({ state: 'hidden' });
    await this.page
      .getByTestId('accountNameRevealer')
      .waitFor({ state: 'hidden' });
  }
}
