import { Locator, Page } from '@playwright/test';

export class ExampleConnectPage {
  private showAdvancedButton: Locator;
  private walletSelector: Locator;
  private localOptionSelector: Locator;
  private networkSelector: Locator;
  private devnetOptionSelector: Locator;
  private connectButton: Locator;

  constructor(page: Page) {
    this.showAdvancedButton = page.getByText('Show Advanced Options');
    this.walletSelector = page.getByRole('button', { name: 'Wallet' });
    this.localOptionSelector = page
      .getByRole('option', { name: 'Local' })
      .locator('span');
    this.networkSelector = page.getByRole('button', { name: 'Network' });
    this.devnetOptionSelector = page
      .getByRole('option', { name: 'Devnet' })
      .locator('span');
    this.connectButton = page.getByRole('button', { name: 'Connect' });
  }

  async openAdvancedSettings() {
    await this.showAdvancedButton.click();
  }
  async selectLocalWallet() {
    await this.walletSelector.click();
    await this.localOptionSelector.click();
  }
  async selectDevnet() {
    await this.networkSelector.click();
    await this.devnetOptionSelector.click();
  }
  async connect() {
    await this.connectButton.click();
  }
}
