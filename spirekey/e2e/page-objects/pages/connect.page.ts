import { Locator, Page } from '@playwright/test';

export class ConnectPage {
  private page: Page;
  private registerBtn: Locator;
  private createBtn: Locator;
  private createWalletBtn: Locator;
  private connectBtn: Locator;
  private completeBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registerBtn = this.page.getByRole('button', { name: 'Register' });
    this.createBtn = this.page.getByRole('button', { name: 'Continue' });
    this.createWalletBtn = this.page.getByRole('button', { name: 'Create' });
    this.connectBtn = this.page.getByRole('button', { name: 'Connect' });
    this.completeBtn = this.page.getByRole('button', { name: 'Complete' });
  }

  async createAccount(): Promise<void> {
    await this.registerBtn.click();
    await this.createWalletBtn.click();
    await this.createBtn.click();
    await this.completeBtn.waitFor();
    await this.completeBtn.click();
  }

  async connect(): Promise<void> {
    await this.connectBtn.waitFor();
    await this.connectBtn.click();
  }

  async visit(returnUrl: string, networkId: string): Promise<void> {
    this.page.goto(`/connect?returnUrl=${returnUrl}&networkId=${networkId}`);
  }

  getConnectMessage(returnUrl: string): Locator {
    return this.page.getByText(
      `Which account do you want to use to identify on ${returnUrl}?`,
    );
  }
}
