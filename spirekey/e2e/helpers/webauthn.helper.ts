import type { CDPSession, Page } from '@playwright/test';

export class WebAuthNHelper {
  public async enableVirtualAuthenticator(
    actor: Page,
    credentials: any,
  ): Promise<{ authenticatorId: string; cdpSession: CDPSession }> {
    const cdpSession = await actor.context().newCDPSession(actor);
    await cdpSession.send('WebAuthn.enable');
    const result = await cdpSession.send('WebAuthn.addVirtualAuthenticator', {
      options: {
        protocol: 'ctap2',
        ctap2Version: 'ctap2_1',
        transport: 'internal',
        hasUserVerification: true,
        isUserVerified: true,
        hasResidentKey: true,
      },
    });

    if (credentials) {
      await this.addCredential(result.authenticatorId, credentials, cdpSession);
    }
    return {
      authenticatorId: result.authenticatorId,
      cdpSession: cdpSession,
    };
  }

  public async getCredentials(authenticatorId: string, cdpSession: CDPSession) {
    const { credentials } = await cdpSession.send('WebAuthn.getCredentials', {
      authenticatorId,
    });
    return credentials;
  }

  public async addCredential(
    authenticatorId: any,
    credentials: any,
    cdpSession: CDPSession,
  ) {
    return await Promise.all(
      credentials.map((credential: any) =>
        cdpSession.send('WebAuthn.addCredential', {
          authenticatorId,
          credential,
        }),
      ),
    );
  }
}
