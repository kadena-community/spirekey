import { Locator, Page } from '@playwright/test';

export class RegisterPage {
  private page: Page;
  private aliasInput: Locator;
  private cancelBtn: Locator;
  private nextBtn: Locator;
  private passKeyBtn: Locator;
  private completeBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.aliasInput = this.page.getByRole('textbox', { name: 'Your alias' });
    this.cancelBtn = this.page.getByRole('button', { name: 'Cancel' });
    this.nextBtn = this.page.getByRole('button', { name: 'Next' });
    this.passKeyBtn = this.page.getByAltText('fingerprint icon');
    this.completeBtn = this.page.getByRole('button', { name: 'Complete' });
  }

  async setAliasTo(alias: string): Promise<void> {
    await this.page.getByRole('heading', { name: 'Alias' }).waitFor();
    await this.aliasInput.fill(alias);
  }

  async proceedToNextStep(): Promise<void> {
    await this.nextBtn.click();
  }

  async createPassKey(): Promise<void> {
    await this.page.getByRole('heading', { name: 'Passkey' }).waitFor();
    await this.passKeyBtn.click();
  }

  async setDeviceTypeTo(
    deviceType: 'phone' | 'desktop' | 'security-key',
  ): Promise<void> {
    await this.page.getByRole('heading', { name: 'Device Type' }).waitFor();
    //TODO: Once the UI has had it's testability improved, we can use the following line to select the device type.
    //await this.page.locator(`#deviceType-${deviceType}`).click();
  }

  async setColorTo(color: 'green' | 'red'): Promise<void> {
    await this.page.getByRole('heading', { name: 'Color' }).waitFor();
    await this.page.getByLabel(`Color ${color}`).click();
  }

  async completeRegistration(): Promise<void> {
    await this.completeBtn.click();
  }
}
