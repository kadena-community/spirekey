import { Locator, Page } from '@playwright/test';
import { SignPage } from './sign.page';

export class TransferPage {
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
    await this.receiverInput.fill('sender00');
  }
  async setAmount(amount: string) {
    await this.amountInput.fill(amount);
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
