import { test } from '@e2e/fixtures/test.fixture';
import { expect } from '@playwright/test';

test('Connect SpireKey Account', async ({
  spireKeyApp,
  exampleApp,
  exampleConnectPage,
  exampleFundPage,
  exampleTransferPage,
  localStorageHelper,
  page,
}) => {
  await test.step('Visit Connect page without having account', async () => {
    let credentials: any = null;
    await test.step('Clear state', async () => {
      await spireKeyApp.openSpireKeyApp();
      await localStorageHelper.deleteAccounts();
    });
    await test.step('Select devnet and local wallet', async () => {
      await exampleApp.open();
      await exampleConnectPage.openAdvancedSettings();
      await exampleConnectPage.selectLocalWallet();
      await exampleConnectPage.selectDevnet();
    });
    await test.step('Create new account', async () => {
      const connectPage = await exampleConnectPage.connect();
      await connectPage.startRegistration();
      await connectPage.createNewWallet();
      credentials = await connectPage.createNewAccount();
      await connectPage.completeRegistration();
    });
    await test.step('Request funds for new account', async () => {
      await exampleFundPage.requestFunds();
    });
    await test.step('Sign for a transfer', async () => {
      await exampleTransferPage.setReceiver();
      await exampleTransferPage.setAmount('48');
      const signPage = await exampleTransferPage.sign(credentials);
      await signPage.signAll();
      expect(await page.getByLabel('Status').inputValue()).toEqual('success');
    });
    await test.step('Go back to connect page', async () => {
      await exampleApp.open();
      await exampleConnectPage.openAdvancedSettings();
      await exampleConnectPage.selectLocalWallet();
      await exampleConnectPage.selectDevnet();
    });
    await test.step('Connect to existing account', async () => {
      const connectPage = await exampleConnectPage.connect();
      await connectPage.connectAccount(0);
    });
    await test.step('Sign for a transfer', async () => {
      await exampleTransferPage.setReceiver();
      await exampleTransferPage.setAmount('48');
      const signPage = await exampleTransferPage.sign(credentials);
      await signPage.signAll();
      expect(await page.getByLabel('Status').inputValue()).toEqual('success');
    });
  });
});
