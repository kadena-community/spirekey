import { Locator, Page } from '@playwright/test';

export class RegisterPage {
  private page: Page;
  private passKeyBtn: Locator;
  private alias: Locator;

  constructor(page: Page) {
    this.page = page;
    this.passKeyBtn = this.page.getByAltText('fingerprint icon');
    this.alias = this.page.getByRole('heading', { level: 3 });
  }

  async getAlias(): Promise<string> {
    return await this.alias.innerText();
  }

  async setNetworkTo(
    networkId: 'devnet' | 'testnet' | 'mainnet',
  ): Promise<void> {
    await this.page.getByRole('heading', { name: 'Network' }).waitFor();
    await this.page
      .locator(`[for=network-${networkId}] > span:has-text("${networkId}")`)
      .click();
  }

  async createPassKey(): Promise<void> {
    await this.page.getByRole('heading', { name: 'Passkey' }).waitFor();
    await this.passKeyBtn.click();
    await this.page.getByTestId('accountNameRevealer').waitFor();
  }
}
