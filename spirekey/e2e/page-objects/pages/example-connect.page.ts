import { Locator, Page } from '@playwright/test';
import { ConnectPage } from './connect.page';

export class ExampleConnectPage {
  private page: Page;
  private showAdvancedButton: Locator;
  private walletSelector: Locator;
  private localOptionSelector: Locator;
  private networkSelector: Locator;
  private devnetOptionSelector: Locator;
  private connectButton: Locator;

  constructor(page: Page) {
    this.page = page;
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
    const popupPromise = this.page
      .context()
      .waitForEvent('page', (p) => p.url().startsWith('http://localhost:1337'));
    await this.connectButton.click();
    const popup = await popupPromise;
    return new ConnectPage(popup);
  }
}
