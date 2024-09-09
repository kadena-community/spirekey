import { WebAuthNHelper } from '@e2e/helpers/webauthn.helper';
import { Locator, Page } from '@playwright/test';

export class SignPage {
  private signButtons: Locator;
  private page: Page;

  private authenticator: any;
  private webauthnHelper: WebAuthNHelper;
  constructor(page: Page, credentials: any) {
    this.page = page;

    this.signButtons = this.page.getByRole('button', { name: 'Sign' });
    this.webauthnHelper = new WebAuthNHelper();
    this.authenticator = this.webauthnHelper.enableVirtualAuthenticator(
      page,
      credentials,
    );
  }

  async signAll() {
    await this.page.getByText('Permissions').waitFor();
    for (const signButton of await this.signButtons.all()) {
      await signButton.click();
    }
  }
}
