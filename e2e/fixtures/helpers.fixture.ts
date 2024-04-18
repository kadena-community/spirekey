import { WebAuthNHelper } from '@e2e/helpers/webauthn.helper';
import { test as baseTest } from '@playwright/test';

export const test = baseTest.extend<{
  webAuthnHelper: WebAuthNHelper;
}>({
  webAuthnHelper: async ({ page }, use) => {
    await use(new WebAuthNHelper(page));
  },
});
