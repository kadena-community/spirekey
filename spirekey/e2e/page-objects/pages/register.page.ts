import { Locator, Page } from '@playwright/test';

export class RegisterPage {
  private page: Page;
  private continueButton: Locator;
  private createWalletButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueButton = this.page.getByRole('button', { name: 'Create' });
    this.createWalletButton = this.page.getByRole('button', { name: 'Create' });
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
