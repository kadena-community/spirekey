import { LocalStorageHelper } from '@e2e/helpers/localStorage.helper';
import { WebAuthNHelper } from '@e2e/helpers/webauthn.helper';
import { test as baseTest } from '@playwright/test';

export const test = baseTest.extend<{
  webAuthnHelper: WebAuthNHelper;
  localStorageHelper: LocalStorageHelper;
}>({
  webAuthnHelper: async (_, use) => {
    await use(new WebAuthNHelper());
  },
  localStorageHelper: async ({ page }, use) => {
    await use(new LocalStorageHelper(page));
  },
});
