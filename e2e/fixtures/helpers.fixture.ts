import { LocalStorageHelper } from '@e2e/helpers/localStorage.helper';
import { WebAuthNHelper } from '@e2e/helpers/webauthn.helper';
import { test as baseTest } from '@playwright/test';

export const test = baseTest.extend<{
  webAuthnHelper: WebAuthNHelper;
  localStorageHelper: LocalStorageHelper;
}>({
  webAuthnHelper: async ({ page }, use) => {
    await use(new WebAuthNHelper(page));
  },
  localStorageHelper: async ({ page }, use) => {
    await use(new LocalStorageHelper(page));
  },
});
