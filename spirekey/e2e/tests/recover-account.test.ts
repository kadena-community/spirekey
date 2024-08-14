import { test } from '@e2e/fixtures/test.fixture';
import { expect } from '@playwright/test';

test.beforeEach(async ({ spireKeyApp, webAuthnHelper }) => {
  await spireKeyApp.openSpireKeyApp();
  await webAuthnHelper.enableWebAuthN();
});

test('Recover SpireKey Account', async ({
  welcomePage,
  registerPage,
  accountsPage,
  recoverPage,
  localStorageHelper,
}) => {
  let alias = 'SpireKey Account 1';

  await test.step('Create account', async () => {
    await welcomePage.startRegistration();
    await registerPage.createWallet();
    await registerPage.createPassKey();
    await registerPage.completeRegistration();
    await accountsPage.isMinted();
    await expect(await accountsPage.getAccountCard(alias)).toBeVisible();
  });

  await test.step('Clear local storage and reload App', async () => {
    await localStorageHelper.deleteAccounts();
    await expect(welcomePage.page).toHaveURL('/welcome');
  });

  await test.step('Recover Account', async () => {
    await welcomePage.startRecovery();
    await recoverPage.selectPassKey();
    expect(alias).toBeTruthy();
    await expect(await accountsPage.getAccountCard(alias)).toBeVisible();
  });
});
