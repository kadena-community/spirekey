import { Locator, Page } from '@playwright/test';

export class RegisterPage {
  private page: Page;
  private continueButton: Locator;
  private createWalletButton: Locator;
  private termsCheckBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueButton = this.page.getByRole('button', { name: 'Create' });
    this.createWalletButton = this.page.getByRole('button', { name: 'Create' });
    this.termsCheckBox = page.getByRole('checkbox', {
      name: 'I have read & agree to the',
    });
  }

  async setNetworkTo(
    networkId: 'devnet' | 'testnet' | 'mainnet',
  ): Promise<void> {
    await this.page.getByRole('heading', { name: 'Network' }).waitFor();
    await this.page
      .locator(`[for=network-${networkId}] > span:has-text("${networkId}")`)
      .click();
  }

  async acceptTerms() {
    await this.termsCheckBox.waitFor();
    await this.termsCheckBox.click({ force: true });
  }

  async createWallet(): Promise<void> {
    await this.createWalletButton.isDisabled();
    await this.acceptTerms();
    await !this.createWalletButton.isDisabled();
    await this.createWalletButton.click();
  }

  async createPassKey(): Promise<void> {
    await this.page.getByRole('heading', { name: 'Add Account' }).waitFor();
    await this.continueButton.click();
  }

  async completeRegistration(): Promise<void> {
    await this.page
      .getByRole('heading', { name: 'SpireKey Account 1' })
      .waitFor();
    await this.page.getByText('Spirekey Account 1').isVisible();
    await this.page.getByText('Balance 0 KDA').isVisible();
  }

  async getRedirectMessage(message: string): Promise<Locator> {
    await this.page.getByText(`Redirecting you back to ${message}`).waitFor();
    return this.page.getByText(message);
  }
}
