import { deviceColors } from '@/styles/shared/tokens.css';
import { act, cleanup, render, screen } from '@testing-library/react';
import { before, beforeEach } from 'node:test';
import React from 'react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { AccountsProvider, useAccounts } from './AccountsContext';

vi.mock('@/utils/shared/getDevnetNetworkId', () => ({
  getDevnetNetworkId: () => 'development',
}));

vi.mock('@/utils/register', () => ({
  registerAccountOnChain: vi.fn().mockResolvedValue({ requestKey: '123' }),
  getAccountName: vi.fn().mockResolvedValue('testAccount'),
  getWebAuthnPubkeyFormat: vi.fn().mockResolvedValue('testPubkey'),
}));

vi.mock('@/utils/shared/account', () => ({
  getAccountFrom: vi.fn().mockResolvedValue(null),
}));

vi.mock('@/utils/shared/client', () => ({
  l1Client: {
    listen: vi.fn().mockResolvedValue({ result: { status: 'success' } }),
  },
}));

const HelperComponent = () => {
  const { accounts } = useAccounts();

  return (
    <div>
      <div data-testid="account-count">{accounts.length}</div>
    </div>
  );
};

describe('AccountsContext', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => cleanup());
  describe('AccountsProvider', () => {
    it("renders it's children", () => {
      const result = render(
        <AccountsProvider>
          <div>Kadena SpireKey</div>
        </AccountsProvider>,
      );
      expect(result.getByText('Kadena SpireKey')).toBeDefined();
    });

    it('initially has zero accounts', () => {
      render(
        <AccountsProvider>
          <HelperComponent />
        </AccountsProvider>,
      );
      expect(screen.getByTestId('account-count').textContent).toBe('0');
    });

    it('can add an account on a single chain', async () => {
      const Component = () => {
        const { accounts, registerAccount } = useAccounts();
        return (
          <>
            <div data-testid="account-count">{accounts.length}</div>
            <div data-testid="first-account-json">
              {JSON.stringify(accounts[0])}
            </div>

            <button
              onClick={() =>
                registerAccount({
                  alias: 'My alias',
                  color: 'blue',
                  deviceType: 'security-key',
                  domain: 'spirekey.kadena.io',
                  credentialId: 'cred123',
                  credentialPubkey: 'pubkey123',
                  networkId: 'development',
                  chainIds: ['1'],
                })
              }
            >
              Add Account
            </button>
          </>
        );
      };

      render(
        <AccountsProvider>
          <Component />
        </AccountsProvider>,
      );

      await act(async () => {
        screen.getByText('Add Account').click();
      });

      expect(screen.getByTestId('account-count').textContent).toBe('1');

      expect(
        JSON.parse(screen.getByTestId('first-account-json').textContent!),
      ).toEqual({
        accountName: 'testAccount',
        alias: 'My alias',
        balance: '0',
        networkId: 'development',
        chainIds: ['1'],
        minApprovals: 1,
        minRegistrationApprovals: 1,
        devices: [
          {
            color: 'blue',
            deviceType: 'security-key',
            'credential-id': 'cred123',
            domain: 'spirekey.kadena.io',
            pendingRegistrationTxs: [],
            guard: {
              keys: [{}],
              pred: 'keys-any',
            },
          },
        ],
      });
    });

    it('can add an account on a multiple chains', async () => {
      const Component = () => {
        const { accounts, registerAccount } = useAccounts();
        return (
          <>
            <div data-testid="account-count">{accounts.length}</div>
            <div data-testid="first-account-json">
              {JSON.stringify(accounts[0])}
            </div>
            <button
              onClick={() =>
                registerAccount({
                  alias: 'My alias',
                  color: 'blue',
                  deviceType: 'laptop',
                  domain: 'spirekey.kadena.io',
                  credentialId: 'cred123',
                  credentialPubkey: 'pubkey123',
                  networkId: 'development',
                  chainIds: ['1', '2'],
                })
              }
            >
              Add Account
            </button>
          </>
        );
      };

      render(
        <AccountsProvider>
          <Component />
        </AccountsProvider>,
      );

      await act(async () => {
        screen.getByText('Add Account').click();
      });

      expect(screen.getByTestId('account-count').textContent).toBe('1');
      expect(
        JSON.parse(screen.getByTestId('first-account-json').textContent!),
      ).toEqual({
        accountName: 'testAccount',
        alias: 'My alias',
        balance: '0',
        networkId: 'development',
        chainIds: ['1', '2'],
        minApprovals: 1,
        minRegistrationApprovals: 1,
        devices: [
          {
            color: 'blue',
            deviceType: 'laptop',
            'credential-id': 'cred123',
            domain: 'spirekey.kadena.io',
            pendingRegistrationTxs: [],
            guard: {
              keys: [{}],
              pred: 'keys-any',
            },
          },
        ],
      });
    });
  });
});
