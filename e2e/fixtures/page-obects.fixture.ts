import { RegisterPage } from '@e2e/page-objects/pages/register.page';
import { WelcomePage } from '@e2e/page-objects/pages/welcome.page';
import { test as baseTest } from '@playwright/test';

export const test = baseTest.extend<{
  registerPage: RegisterPage;
  welcomePage: WelcomePage;
}>({
  welcomePage: async ({ page }, use) => {
    await use(new WelcomePage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
});
