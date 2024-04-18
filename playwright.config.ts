import {
  devnetHost,
  networkId,
  webAuthnNamespace,
} from '@e2e/constants/network.constants';
import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 5 * 60 * 1000, // Timeout for a single test
  globalTimeout: 30 * 60 * 1000, // Timeout for the whole test run
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
  webServer: {
    command: `pnpm run dev`,
    url: 'http://localhost:1337',
    reuseExistingServer: process.env.CI === undefined,
    timeout: 2 * 60000,
    stdout: 'ignore',
    stderr: 'ignore',
    env: {
      AUTO_REGISTER_MAINNET: 'false',
      INSTA_FUND: 'false',
      DEVNET_NETWORK_ID: networkId,
      DAPP_NETWORK_ID: networkId,
      WALLET_NETWORK_ID: networkId,
      CHAIN_ID: '14',
      NAMESPACE: webAuthnNamespace,
      GAS_STATION:
        'u:n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.gas-station.enforce-guard-any:7AdJhJTZk-wJEAWGaoO36HADDU58EtRw5La0LGw1ErI',
      WALLET_URL: 'http://localhost:1337',
      DEVNET_HOST: devnetHost,
      CHAINWEB_URL: devnetHost,
    },
  },
});
