import type { Page } from '@playwright/test';

export class WebAuthNHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async enableWebAuthN(): Promise<void> {
    const cdpSession = await this.page.context().newCDPSession(this.page);
    await cdpSession.send('WebAuthn.enable');
    await cdpSession.send('WebAuthn.addVirtualAuthenticator', {
      options: {
        protocol: 'ctap2',
        ctap2Version: 'ctap2_1',
        transport: 'internal',
        hasUserVerification: true,
        isUserVerified: true,
        hasResidentKey: true,
      },
    });
  }
}
