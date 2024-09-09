import { WebAuthNHelper } from '@e2e/helpers/webauthn.helper';
import { Locator, Page } from '@playwright/test';

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

class ConnectPage {
  private registerButton: Locator;
  private recoverButton: Locator;
  private createWalletButton: Locator;
  private createAccountButton: Locator;
  private completeButton: Locator;

  constructor(page: Page) {
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.recoverButton = page.getByRole('button', { name: 'Recover' });
    this.createWalletButton = page.getByRole('button', { name: 'Create' });
    this.createAccountButton = page.getByRole('button', { name: 'Continue' });
    this.completeButton = page.getByRole('button', { name: 'Complete' });

    const webauthn = new WebAuthNHelper(page);
    webauthn.enableWebAuthN();
  }

  async startRegistration() {
    await this.registerButton.click();
  }

  async createNewWallet() {
    await this.createWalletButton.click();
  }

  async createNewAccount() {
    await this.createAccountButton.click();
  }

  async completeRegistration() {
    await this.completeButton.click();
  }
}
