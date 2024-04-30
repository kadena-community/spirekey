import { test } from '@e2e/fixtures/test.fixture';
import { generateAlias } from '@e2e/helpers/generator.helper';
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
  const alias = await generateAlias();

  await test.step('Create account', async () => {
    await welcomePage.startRegistration();
    await registerPage.setAliasTo(alias);
    await registerPage.proceedToNextStep();
    await registerPage.createPassKey();
    await registerPage.setDeviceTypeTo('phone');
    await registerPage.proceedToNextStep();
    await registerPage.setColorTo('green');
    await registerPage.completeRegistration();
    await expect(await accountsPage.getAccountCard(alias)).toBeVisible();
  });

  await test.step('Clear local storage and reload App', async () => {
    await localStorageHelper.deleteAccounts();
    await expect(welcomePage.page).toHaveURL('/welcome');
  });

  await test.step('Recover Account', async () => {
    await welcomePage.startRecovery();
    await recoverPage.selectPassKey();
    await recoverPage.completeRegistration();
    await expect(await accountsPage.getAccountCard(alias)).toBeVisible();
  });
});
