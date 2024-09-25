import { test } from '@e2e/fixtures/test.fixture';
import { expect } from '@playwright/test';

test('Recover SpireKey Account', async ({
  spireKeyApp,
  exampleApp,
  exampleConnectPage,
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
      await connectPage.page.waitForEvent('close');
    });
    await test.step('Remove account from wallet', async () => {
      await spireKeyApp.openSpireKeyApp();
      await localStorageHelper.deleteAccounts();
    });
    await test.step('Recover account', async () => {
      await exampleApp.open();
      await exampleConnectPage.openAdvancedSettings();
      await exampleConnectPage.selectLocalWallet();
      await exampleConnectPage.selectDevnet();
      const connectPage = await exampleConnectPage.connect();
      await connectPage.startRecovery(credentials);
      await connectPage.recover();
      await page
        .getByRole('heading', { name: 'Step 2: Fund your account' })
        .waitFor();
      await expect(
        page.getByRole('heading', { name: 'Step 2: Fund your account' }),
      ).toBeVisible();
    });
  });
});
