import { AccountsPage } from '@e2e/page-objects/pages/accounts.page';
import { RegisterPage } from '@e2e/page-objects/pages/register.page';
import { WelcomePage } from '@e2e/page-objects/pages/welcome.page';
import { SpireKeyApp } from '@e2e/page-objects/spirekey.app';
import { test as baseTest } from '@playwright/test';

export const test = baseTest.extend<{
  spireKeyApp: SpireKeyApp;
  registerPage: RegisterPage;
  welcomePage: WelcomePage;
  accountsPage: AccountsPage;
}>({
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
});
