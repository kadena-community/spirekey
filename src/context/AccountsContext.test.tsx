import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';

import { fundAccount } from '@/utils/fund';
import { registerAccountOnChain } from '@/utils/register';
import { l1Client } from '@/utils/shared/client';
import { ChainId } from '@kadena/client';
import { Account, AccountsProvider, useAccounts } from './AccountsContext';

vi.mock('@/utils/fund');
vi.mock('@/utils/register');
vi.mock('@/utils/shared/getDevnetNetworkId');
vi.mock('@/utils/shared/account');
vi.mock('@kadena/client');

const registerParams = {
  alias: 'My alias',
  color: 'blue',
  deviceType: 'security-key',
  domain: 'spirekey.kadena.io',
  credentialId: 'cred123',
  credentialPubkey: 'pubkey123',
  networkId: 'development',
  chainIds: ['1'] as ChainId[],
};

describe('AccountsContext', () => {
  const user = userEvent.setup();

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
    localStorage.clear();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe('AccountsContext', () => {
    it("renders it's children", () => {
      const result = render(
        <AccountsProvider>
          <div>Kadena SpireKey</div>
        </AccountsProvider>,
      );
      expect(result.getByText('Kadena SpireKey')).toBeDefined();
    });

    it('initially has zero accounts', () => {
      const Component = () => {
        const { accounts } = useAccounts();
        return <div data-testid="account-count">{accounts.length}</div>;
      };

      render(
        <AccountsProvider>
          <Component />
        </AccountsProvider>,
      );
      expect(screen.getByTestId('account-count').textContent).toBe('0');
    });

    it('loads accounts from localStorage', () => {
      const Component = () => {
        const { accounts } = useAccounts();
        return (
          <>
            <div data-testid="account-count">{accounts.length}</div>
            <div data-testid="first-account-json">
              {JSON.stringify(accounts[0])}
            </div>
          </>
        );
      };

      render(
        <AccountsProvider>
          <Component />
        </AccountsProvider>,
      );

      expect(screen.getByTestId('account-count').textContent).toBe('0');

      const account: Account = {
        accountName: 'c:UOOiphxVZngAqZ6XLq4V6mpu1_xz5JjomQ7I2sAJO5w',
        alias: 'asdf',
        networkId: 'development',
        devices: [
          {
            domain: 'http://localhost:1337',
            color: '#893DE7',
            deviceType: 'security-key',
            'credential-id': 'OXBlfUvFNb1eu8IGI6D87fNx4eI',
            guard: {
              keys: ['testPubKey'],
              pred: 'keys-any',
            },
            pendingRegistrationTxs: [],
          },
        ],
        balance: '0',
        chainIds: ['14'],
        minApprovals: 1,
        minRegistrationApprovals: 1,
      };

      localStorage.setItem('localAccounts', JSON.stringify([account]));

      cleanup();

      render(
        <AccountsProvider>
          <Component />
        </AccountsProvider>,
      );

      expect(screen.getByTestId('account-count').textContent).toBe('1');
      expect(
        JSON.parse(screen.getByTestId('first-account-json').textContent!),
      ).toEqual(account);
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

            <button onClick={() => registerAccount(registerParams)}>
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

      await user.click(screen.getByText('Add Account'));

      expect(registerAccountOnChain).toHaveBeenCalled();

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
              keys: ['testPubKey'],
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
                registerAccount({ ...registerParams, chainIds: ['1', '2'] })
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

      await user.click(screen.getByText('Add Account'));

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
            deviceType: 'security-key',
            'credential-id': 'cred123',
            domain: 'spirekey.kadena.io',
            pendingRegistrationTxs: [],
            guard: {
              keys: ['testPubKey'],
              pred: 'keys-any',
            },
          },
        ],
      });
    });

    it('automatically funds an account on the development network', async () => {
      vi.stubEnv('INSTA_FUND', 'true');

      const Component = () => {
        const { registerAccount } = useAccounts();
        return (
          <button onClick={() => registerAccount(registerParams)}>
            Add Account
          </button>
        );
      };

      render(
        <AccountsProvider>
          <Component />
        </AccountsProvider>,
      );

      await user.click(screen.getByText('Add Account'));

      expect(fundAccount).toHaveBeenCalled();

      vi.unstubAllEnvs();
    });

    it("doesn't automatically fund an account on a non-development network", async () => {
      vi.stubEnv('INSTA_FUND', 'true');

      const Component = () => {
        const { registerAccount } = useAccounts();

        return (
          <button
            onClick={() =>
              registerAccount({ ...registerParams, networkId: 'mainnet01' })
            }
          >
            Add Account
          </button>
        );
      };

      render(
        <AccountsProvider>
          <Component />
        </AccountsProvider>,
      );

      await user.click(screen.getByText('Add Account'));

      expect(fundAccount).not.toHaveBeenCalled();

      vi.unstubAllEnvs();
    });

    it('listens for the requestKeys in pendingRegistrationTxs', async () => {
      const Component = () => {
        const { registerAccount } = useAccounts();

        return (
          <>
            <button
              onClick={() =>
                registerAccount({ ...registerParams, networkId: 'mainnet01' })
              }
            >
              Add Account on mainnet01
            </button>
            <button onClick={() => registerAccount(registerParams)}>
              Add Account on development
            </button>
          </>
        );
      };

      render(
        <AccountsProvider>
          <Component />
        </AccountsProvider>,
      );

      await user.click(screen.getByText('Add Account on mainnet01'));
      // await user.click(screen.getByText('Add Account on development'));

      // Adding another account shouldn't trigger another listen call for the original account.
      // This can be checked in this test by uncommenting

      expect(l1Client.listen).toHaveBeenCalledTimes(1);
      expect(l1Client.listen).toHaveBeenCalledWith({
        chainId: '1',
        networkId: 'mainnet01',
        requestKey: 'test-request-key',
      });
      // expect(l1Client.listen).toHaveBeenCalledWith({
      //   chainId: '1',
      //   networkId: 'development',
      //   requestKey: '123',
      // });
    });

    it('removes the requestkey from pendingRegistrationTxs for a successful transaction', async () => {
      const Component = () => {
        const { accounts, registerAccount } = useAccounts();

        return (
          <>
            <div data-testid="first-account-json">
              {JSON.stringify(accounts[0])}
            </div>
            <button onClick={() => registerAccount(registerParams)}>
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

      await user.click(screen.getByText('Add Account'));

      // await waitFor(() => expect(l1Client.listen).toHaveBeenCalledTimes(1));

      expect(
        JSON.parse(screen.getByTestId('first-account-json').textContent!)
          .devices[0].pendingRegistrationTxs,
      ).toEqual([]);
    });
  });

  it("doesn't remove the requestkey from pendingRegistrationTxs for a failed transaction", async () => {
    l1Client.listen = vi.fn().mockResolvedValue({
      result: { status: 'failure', data: {} },
    });

    const Component = () => {
      const { accounts, registerAccount } = useAccounts();

      return (
        <>
          <div data-testid="first-account-json">
            {JSON.stringify(accounts[0])}
          </div>
          <button onClick={() => registerAccount(registerParams)}>
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

    await user.click(screen.getByText('Add Account'));

    expect(
      JSON.parse(screen.getByTestId('first-account-json').textContent!)
        .devices[0].pendingRegistrationTxs,
    ).toEqual([
      {
        chainId: '1',
        networkId: 'development',
        requestKey: 'test-request-key',
      },
    ]);
  });

  it('stores the local account in localStorage when it cannot be found on chain', async () => {
    const Component = () => {
      const { accounts, registerAccount } = useAccounts();

      return (
        <>
          <div data-testid="first-account-json">
            {JSON.stringify(accounts[0])}
          </div>
          <button onClick={() => registerAccount(registerParams)}>
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

    await user.click(screen.getByText('Add Account'));
  });
});
