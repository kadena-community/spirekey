import { DevModeHelper } from '@e2e/helpers/devMode.helper';
import { WebAuthNHelper } from '@e2e/helpers/webauthn.helper';
import { test as baseTest } from '@playwright/test';

export const test = baseTest.extend<{
  webAuthnHelper: WebAuthNHelper;
  devModeHelper: DevModeHelper;
}>({
  webAuthnHelper: async ({ page }, use) => {
    await use(new WebAuthNHelper(page));
  },
  devModeHelper: async ({ page }, use) => {
    await use(new DevModeHelper(page));
  },
});
