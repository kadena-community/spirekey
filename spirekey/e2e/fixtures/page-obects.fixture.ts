import { SpireKeyExampleApp } from '@e2e/page-objects/example.app';
import { AccountsPage } from '@e2e/page-objects/pages/accounts.page';
import { ConnectPage } from '@e2e/page-objects/pages/connect.page';
import { ExampleConnectPage } from '@e2e/page-objects/pages/example-connect.page';
import { RecoverPage } from '@e2e/page-objects/pages/recover.page';
import { RegisterPage } from '@e2e/page-objects/pages/register.page';
import { WelcomePage } from '@e2e/page-objects/pages/welcome.page';
import { SpireKeyApp } from '@e2e/page-objects/spirekey.app';
import { test as baseTest } from '@playwright/test';

export const test = baseTest.extend<{
  exampleApp: SpireKeyExampleApp;
  exampleConnectPage: ExampleConnectPage;
  spireKeyApp: SpireKeyApp;
  registerPage: RegisterPage;
  welcomePage: WelcomePage;
  accountsPage: AccountsPage;
  recoverPage: RecoverPage;
  connectPage: ConnectPage;
}>({
  exampleApp: async ({ page }, use) => {
    await use(new SpireKeyExampleApp(page));
  },
  exampleConnectPage: async ({ page }, use) => {
    await use(new ExampleConnectPage(page));
  },
  spireKeyApp: async ({ page }, use) => {
    await use(new SpireKeyApp(page));
  },
  welcomePage: async ({ page }, use) => {
    await use(new WelcomePage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  accountsPage: async ({ page }, use) => {
    await use(new AccountsPage(page));
  },
  recoverPage: async ({ page }, use) => {
    await use(new RecoverPage(page));
  },
  connectPage: async ({ page }, use) => {
    await use(new ConnectPage(page));
  },
});
