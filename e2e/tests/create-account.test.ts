import { test } from '@e2e/fixtures/test.fixture';
import { generateAlias } from '@e2e/helpers/generator.helper';
import { expect } from '@playwright/test';

test.beforeEach(async ({ spireKeyApp, webAuthnHelper }) => {
  await spireKeyApp.openSpireKeyApp();
  await webAuthnHelper.enableWebAuthN();
});

test('Create new account using SpireKey', async ({
  welcomePage,
  registerPage,
  accountsPage,
}) => {
  const alias = await generateAlias();

  await test.step('Start Registration', async () => {
    await welcomePage.startRegistration();
  });

  await test.step('Set Alias.', async () => {
    await registerPage.setAliasTo(alias);
    await registerPage.proceedToNextStep();
  });

  await test.step('Set Passkey.', async () => {
    await registerPage.createPassKey();
  });

  await test.step('Set Device Type.', async () => {
    await registerPage.setDeviceTypeTo('phone');
    await registerPage.proceedToNextStep();
  });

  await test.step('Set Color.', async () => {
    await registerPage.setColorTo('green');
  });

  await test.step('Complete Registration.', async () => {
    await registerPage.completeRegistration();
  });

  await test.step('An account with the provided alias has been generated.', async () => {
    await expect(await accountsPage.getAccountCard(alias)).toBeVisible();
  });
});
test('Create new account using SpireKey with dev mode enabled', async ({
  welcomePage,
  registerPage,
  accountsPage,
  localStorageHelper,
}) => {
  const alias = await generateAlias();

  await test.step('Enable devMode.', async () => {
    await localStorageHelper.enableDevMode();
  });

  await test.step('Start Registration', async () => {
    await welcomePage.startRegistration();
  });

  await test.step('Set Alias.', async () => {
    await registerPage.setAliasTo(alias);
    await registerPage.proceedToNextStep();
  });

  await test.step('Set Network.', async () => {
    await registerPage.setNetworkTo('devnet');
    await registerPage.proceedToNextStep();
  });

  await test.step('Set Passkey.', async () => {
    await registerPage.createPassKey();
  });

  await test.step('Set Device Type.', async () => {
    await registerPage.setDeviceTypeTo('phone');
    await registerPage.proceedToNextStep();
  });

  await test.step('Set Color.', async () => {
    await registerPage.setColorTo('green');
  });

  await test.step('Complete Registration.', async () => {
    await registerPage.completeRegistration();
  });

  await test.step('An account with the provided alias has been genrated.', async () => {
    await expect(await accountsPage.getAccountCard(alias)).toBeVisible();
  });
});
