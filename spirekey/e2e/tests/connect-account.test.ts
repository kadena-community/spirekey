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

  await test.step('Redirect back to Connect page', async () => {
    await expect(
      await registerPage.getRedirectMessage(
        `http://localhost:1337/connect?returnUrl=${returnUrl}&networkId=${networkId}`,
      ),
    ).toBeVisible();
  });

  await test.step('Connect and redirect to dApp', async () => {
    await expect(
      connectPage.getConnectMessage('http://localhost:1337/welcome'),
    ).toBeVisible();
    await connectPage.connect();
    await welcomePage.page.waitForURL('http://localhost:1337/welcome*');
    const url = new URL(welcomePage.page.url());
    expect(url.pathname).toBe('/welcome');
    expect(url.searchParams.get('user')).toBeTruthy();
  });
});
