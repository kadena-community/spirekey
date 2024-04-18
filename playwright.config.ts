import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  forbidOnly: process.env.CI !== undefined,
  retries: process.env.CI !== undefined ? 1 : 0,
  workers: 1,
  reporter:
    process.env.CI !== undefined
      ? [['github'], ['list'], ['html', { open: 'never' }]]
      : [['list'], ['html', { open: 'never' }]],
  use: {
    headless: process.env.CI !== undefined,
    baseURL: 'http://localhost:1337/',
    channel: 'chromium',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'setup',
      testDir: './e2e/setup',
      testMatch: 'devnet.setup.ts',
    },
    {
      name: 'SpireKey',
      testDir: './e2e/tests',
      use: {
        ...devices['iPhone 14 Pro Max'],
        defaultBrowserType: 'chromium',
        hasTouch: true,
      },
    },
  ],
});
