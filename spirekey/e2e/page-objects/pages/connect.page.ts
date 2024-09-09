import { WebAuthNHelper } from '@e2e/helpers/webauthn.helper';
import { Locator, Page } from '@playwright/test';

export class ConnectPage {
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
