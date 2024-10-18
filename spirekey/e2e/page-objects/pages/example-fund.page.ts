import { Locator, Page } from '@playwright/test';

export class ExampleFundPage {
  private fundButton: Locator;

  constructor(page: Page) {
    this.fundButton = page.getByRole('button', { name: 'Fund' });
  }

  async requestFunds() {
    await this.fundButton.click({ force: true });
  }
}
