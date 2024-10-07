import { WebAuthNHelper } from '@e2e/helpers/webauthn.helper';
import { Locator, Page } from '@playwright/test';

export class ConnectPage {
  public page: Page;
  private authenticator: any;
  private registerButton: Locator;
  private registerAnotherButton: Locator;
  private recoverButton: Locator;
  private recoverStartButton: Locator;
  private createWalletButton: Locator;
  private connectWalletButton: Locator;
  private createAccountButton: Locator;
  private completeButton: Locator;
  private webauthnHelper: WebAuthNHelper;

  constructor(page: Page) {
    this.page = page;
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.registerAnotherButton = page.getByRole('button', {
      name: 'Register another account',
    });
    this.recoverStartButton = page.getByRole('button', { name: 'Recover' });
    this.recoverButton = page.getByRole('button', { name: 'Next' });
    this.createWalletButton = page.getByRole('button', { name: 'Create' });
    this.connectWalletButton = page.getByRole('button', { name: 'Connect' });
    this.createAccountButton = page.getByRole('button', { name: 'Create' });
    this.completeButton = page.getByRole('button', { name: 'Complete' });

    this.webauthnHelper = new WebAuthNHelper();
  }

  async connectAccount(index: number = 0) {
    const accountNumber = index + 1;
    await this.page
      .getByText(`SpireKey Account ${accountNumber.toString()}`)
      .click();
  }

  async startRegistration() {
    this.authenticator = await this.webauthnHelper.enableVirtualAuthenticator(
      this.page,
      null,
    );
    await this.registerButton.click();
  }

  async startAnotherRegistration(credentials: any) {
    this.authenticator = await this.webauthnHelper.enableVirtualAuthenticator(
      this.page,
      credentials,
    );
    await this.registerAnotherButton.click();
  }

  async connectWallet() {
    await this.connectWalletButton.click();
  }

  async startRecovery(credentials: any) {
    const accountCredentials = credentials.filter(({ userHandle }: any) =>
      Buffer.from(userHandle, 'base64').toString().includes('Account'),
    );

    this.authenticator = await this.webauthnHelper.enableVirtualAuthenticator(
      this.page,
      accountCredentials,
    );
    await this.recoverStartButton.click();
  }
  async recover() {
    await this.recoverButton.click();
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
    await this.page.waitForEvent('close');
    return credentials;
  }
}
