import { Locator, Page } from '@playwright/test';

export class RegisterPage {
  private page: Page;
  private continueButton: Locator;
  private createWalletButton: Locator;
  private completeButton: Locator;
  private alias: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueButton = this.page.getByRole('button', { name: 'Continue' });
    this.createWalletButton = this.page.getByRole('button', { name: 'Create' });
    this.completeButton = this.page.getByRole('button', { name: 'Complete' });
    this.alias = this.page.getByRole('heading', { level: 3 });
  }

  async setNetworkTo(
    networkId: 'devnet' | 'testnet' | 'mainnet',
  ): Promise<void> {
    await this.page.getByRole('heading', { name: 'Network' }).waitFor();
    await this.page
      .locator(`[for=network-${networkId}] > span:has-text("${networkId}")`)
      .click();
  }
  
  async createWallet(): Promise<void> {
    await this.createWalletButton.click();
  }

  async createPassKey(): Promise<void> {
    await this.page.getByRole('heading', { name: 'Register' }).waitFor();
    await this.continueButton.click();
  }

  async completeRegistration(): Promise<void> {
    await this.page
      .getByRole('heading', { name: 'SpireKey Account 1' })
      .waitFor();
    await this.completeButton.click();
  }

  async getRedirectMessage(message: string): Promise<Locator> {
    await this.page.getByText(`Redirecting you back to ${message}`).waitFor();
    return this.page.getByText(message);
  }
}
