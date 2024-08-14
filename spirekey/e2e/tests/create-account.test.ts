import { test } from '@e2e/fixtures/test.fixture';

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

  await test.step('Create Wallet', async () => {
    await registerPage.createWallet();
  });

  await test.step('Set Passkey.', async () => {
    await registerPage.createPassKey();
  });

  await test.step('Complete registration.', async () => {
    await registerPage.completeRegistration();
  });

  await test.step('An account with the default alias has been generated.', async () => {
    await accountsPage.isMinted();
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

  await test.step('Create Wallet', async () => {
    await registerPage.createWallet();
  });

  await test.step('Set Passkey.', async () => {
    await registerPage.createPassKey();
  });

  await test.step('Complete registration.', async () => {
    await registerPage.completeRegistration();
  });

  await test.step('An account with the default alias has been generated.', async () => {
    await accountsPage.isMinted();
  });
});
