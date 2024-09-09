import { Locator, Page } from '@playwright/test';
import { SignPage } from './sign.page';

export class ExampleTransferPage {
  private page: Page;
  private receiverInput: Locator;
  private amountInput: Locator;
  private signButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.receiverInput = page.getByLabel('Receiver');
    this.amountInput = page.getByLabel('Amount');
    this.signButton = page.getByRole('button', { name: 'Sign' });
  }

  async setReceiver() {
    await this.receiverInput.fill('senderx');
  }
  async setAmount() {
    await this.amountInput.fill('95');
  }
  async sign(credentials: any) {
    const popupPromise = this.page
      .context()
      .waitForEvent('page', (p) => p.url().startsWith('http://localhost:1337'));

    await this.signButton.click();
    const popup = await popupPromise;
    return new SignPage(popup, credentials);
  }
}
