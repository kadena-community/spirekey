import { Locator, Page } from '@playwright/test';

export class ConnectPage {
  private page: Page;
  private createBtn: Locator;
  private connectBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createBtn = this.page.getByRole('link', { name: 'Create' });
    this.connectBtn = this.page.getByRole('button', { name: 'Connect' });
  }

  async createAccount(): Promise<void> {
    await this.createBtn.click();
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
