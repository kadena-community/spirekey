import { Locator, Page } from '@playwright/test';

export class ExampleTransferPage {
  private receiverInput: Locator;
  private signButton: Locator;

  constructor(page: Page) {
    this.receiverInput = page.getByLabel('Receiver');
    this.signButton = page.getByRole('button', { name: 'Sign' });
  }

  async setReceiver() {
    await this.receiverInput.fill('sender00');
  }
  async sign() {
    await this.signButton.click();
  }
}
