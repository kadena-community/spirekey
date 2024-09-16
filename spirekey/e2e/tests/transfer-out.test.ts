import { test } from '@e2e/fixtures/test.fixture';
import { expect } from '@playwright/test';

test('Transfer out', async ({
  spireKeyApp,
  accountsPage,
  transferPage,
  exampleApp,
  exampleConnectPage,
  exampleFundPage,
  page,
  localStorageHelper,
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
      await page.getByText('Sender: ').waitFor();
    });
    await test.step('Go to account transfer page', async () => {
      await spireKeyApp.openSpireKeyApp();
      await accountsPage.goToDetails('SpireKey Account 1');
      await accountsPage.goToTransferPage();
    });
    await test.step('Sign for a transfer', async () => {
      await transferPage.setReceiver();
      await transferPage.setAmount('99');
      const signPage = await transferPage.sign(credentials);
      await signPage.signAll();
      expect(await page.getByLabel('Status').inputValue()).toEqual('success');
    });
  });
});
