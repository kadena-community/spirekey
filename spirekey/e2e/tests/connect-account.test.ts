import { test } from '@e2e/fixtures/test.fixture';
import { expect } from '@playwright/test';

test.beforeEach(async ({ exampleApp, webAuthnHelper }) => {
  await exampleApp.open();
  await webAuthnHelper.enableWebAuthN();
});

test('Connect SpireKey Account: Onboarding', async ({
  exampleConnectPage,
  exampleFundPage,
  exampleTransferPage,
  localStorageHelper,
}) => {
  await test.step('Visit Connect page without having account', async () => {
    await localStorageHelper.deleteAccounts();
    await exampleConnectPage.openAdvancedSettings();
    await exampleConnectPage.selectLocalWallet();
    await exampleConnectPage.selectDevnet();
    const connectPage = await exampleConnectPage.connect();
    await connectPage.startRegistration();
    await connectPage.createNewWallet();
    await connectPage.createNewAccount();
    await connectPage.completeRegistration();
    await exampleFundPage.requestFunds();
    await exampleTransferPage.setReceiver();
    await exampleTransferPage.sign();
  });
});
