import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 60 * 1000, // Timeout for a single test
  globalTimeout: 5 * 60 * 1000, // Timeout for the whole test run
  forbidOnly: process.env.CI !== undefined,
  retries: process.env.CI !== undefined ? 1 : 0,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    headless: process.env.CI !== undefined,
    baseURL: 'http://localhost:1337/',
    channel: 'chromium',
    video: 'off',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'setup',
      testDir: './e2e/setup',
      testMatch: 'devnet.setup.ts',
    },
    {
      name: 'SpireKey',
      dependencies: ['setup'],
      testDir: './e2e/tests',
      use: {
        ...devices['iPhone 14 Pro Max'],
        defaultBrowserType: 'chromium',
        hasTouch: true,
      },
    },
  ],
  webServer: [
    {
      command: `pnpm run start`,
      url: 'http://localhost:1337',
      reuseExistingServer: process.env.CI === undefined,
      timeout: 60000,
      stdout: 'ignore',
      stderr: 'pipe',
    },
    {
      command: `cd ../examples/embedded-nextjs/ && pnpm run start`,
      url: 'http://localhost:1338',
      reuseExistingServer: process.env.CI === undefined,
      timeout: 60000,
      stdout: 'ignore',
      stderr: 'pipe',
    },
  ],
});
