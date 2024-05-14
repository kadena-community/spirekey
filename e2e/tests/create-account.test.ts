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
  await test.step('Start Registration', async () => {
    await welcomePage.startRegistration();
  });

  const alias = await registerPage.getAlias();

  await test.step('Set Passkey.', async () => {
    await registerPage.createPassKey();
  });

  await test.step('An account with the default alias has been generated.', async () => {
    await expect(await accountsPage.getAccountCard(alias)).toBeVisible();
  });
});

test('Create new account using SpireKey with dev mode enabled', async ({
  welcomePage,
  registerPage,
  accountsPage,
  localStorageHelper,
}) => {
  await test.step('Enable devMode.', async () => {
    await localStorageHelper.enableDevMode();
  });

  await test.step('Start Registration', async () => {
    await welcomePage.startRegistration();
  });

  const alias = await registerPage.getAlias();

  await test.step('Set Network.', async () => {
    await registerPage.setNetworkTo('devnet');
  });

  await test.step('Set Passkey.', async () => {
    await registerPage.createPassKey();
  });

  await test.step('An account with the default alias has been generated.', async () => {
    await expect(await accountsPage.getAccountCard(alias)).toBeVisible();
  });
});
