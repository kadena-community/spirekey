import { test } from '@e2e/fixtures/test.fixture';
import { expect } from '@playwright/test';

test.beforeEach(async ({ spireKeyApp, webAuthnHelper }) => {
  await spireKeyApp.openSpireKeyApp();
  await webAuthnHelper.enableWebAuthN();
});

test('Connect SpireKey Account: Onboarding', async ({
  connectPage,
  welcomePage,
  registerPage,
  localStorageHelper,
}) => {
  const returnUrl = 'http://localhost:1337/welcome';
  const networkId = 'development';

  await test.step('Visit Connect page without having account', async () => {
    await localStorageHelper.deleteAccounts();
    await connectPage.visit(returnUrl, networkId);
    await connectPage.createAccount();
  });

  await test.step('Create account', async () => {
    await registerPage.createPassKey();
  });

  await test.step('Complete registration.', async () => {
    await registerPage.completeRegistration();
  });

  await test.step('Connect and redirect to dApp', async () => {
    await welcomePage.page.waitForURL('http://localhost:1337/welcome*');
    const url = new URL(welcomePage.page.url());
    expect(url.pathname).toBe('/welcome');
    expect(url.searchParams.get('user')).toBeTruthy();
  });
});
