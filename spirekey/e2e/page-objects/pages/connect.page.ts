import { WebAuthNHelper } from '@e2e/helpers/webauthn.helper';
import { Locator, Page } from '@playwright/test';

export class ConnectPage {
  private page: Page;
  private authenticator: any;
  private registerButton: Locator;
  private recoverButton: Locator;
  private createWalletButton: Locator;
  private createAccountButton: Locator;
  private completeButton: Locator;
  private webauthnHelper: WebAuthNHelper;

  constructor(page: Page) {
    this.page = page;
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.recoverButton = page.getByRole('button', { name: 'Recover' });
    this.createWalletButton = page.getByRole('button', { name: 'Create' });
    this.createAccountButton = page.getByRole('button', { name: 'Continue' });
    this.completeButton = page.getByRole('button', { name: 'Complete' });

    this.webauthnHelper = new WebAuthNHelper();
  }

  async startRegistration() {
    this.authenticator = await this.webauthnHelper.enableVirtualAuthenticator(
      this.page,
      null,
    );
    await this.registerButton.click();
  }

  async createNewWallet() {
    await this.createWalletButton.click();
  }

  async createNewAccount() {
    await this.createAccountButton.click();
    const credentials: any = await this.webauthnHelper.getCredentials(
      this.authenticator.authenticatorId,
      this.authenticator.cdpSession,
    );
    return credentials;
  }

  async completeRegistration() {
    await this.completeButton.click();
  }
}
