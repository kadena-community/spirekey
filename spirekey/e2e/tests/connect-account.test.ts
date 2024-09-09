import { test } from '@e2e/fixtures/test.fixture';
import { expect } from '@playwright/test';

test.beforeEach(async ({ exampleApp }) => {
  await exampleApp.open();
});

test('Connect SpireKey Account: Onboarding', async ({
  exampleConnectPage,
  exampleFundPage,
  exampleTransferPage,
  localStorageHelper,
  page,
}) => {
  await test.step('Visit Connect page without having account', async () => {
    await localStorageHelper.deleteAccounts();
    await exampleConnectPage.openAdvancedSettings();
    await exampleConnectPage.selectLocalWallet();
    await exampleConnectPage.selectDevnet();
    const connectPage = await exampleConnectPage.connect();
    await connectPage.startRegistration();
    await connectPage.createNewWallet();
    const credentials = await connectPage.createNewAccount();
    await connectPage.completeRegistration();
    await exampleFundPage.requestFunds();
    await exampleTransferPage.setReceiver();
    const signPage = await exampleTransferPage.sign(credentials);
    await signPage.signAll();
    expect(await page.getByLabel('Status').inputValue()).toEqual('success');
  });
});
