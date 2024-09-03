import { account, accounts } from '@/resolvers/accounts';
import { describe, expect, it, vi } from 'vitest';

describe('resolvers: account', () => {
  describe('query accounts', () => {
    const mockAccount = {
      accountName: 'r:mock-account',
      networkId: 'development',
      minApprovals: 1,
      minRegistrationApprovals: 1,
      balance: 0.0,
      devices: [
        {
          guard: {
            pred: 'keys-any',
            keys: [
              'WEBAUTHN-a5010203262001215820c4518d145cd1ca74d6371dfd24fec692d770ef13335e299533e0cf2bd11286a2225820b956dd1d7d48d3bb4e3a47c0a1cd70c7e3751f0e3fabf50c58ab22fc07033950',
            ],
          },
          domain: 'http://localhost:1337',
          'credential-id': 'samSsQo2kizFNrLp_-hX_Q',
          name: 'phone_#893DE7',
        },
      ],
      chainIds: Array(20)
        .fill(1)
        .map((_, i) => i.toString()),
    };
    it('returns accounts merged with chain data', async () => {
      localStorage.setItem(
        'localAccounts',
        JSON.stringify([
          {
            networkId: 'development',
            alias: 'MockAccount',
            accountName: 'r:mock-account',
          },
        ]),
      );
      const clientMock = {
        query: vi.fn().mockReturnValue({
          data: {
            chain0: {
              result: JSON.stringify({
                ...mockAccount,
                account: mockAccount.accountName,
              }),
            },
          },
        }),
      } as any;
      const res = account(
        null,
        {
          networkId: 'development',
          accountName: 'r:mock-account',
          fungible: 'coin',
        },
        { client: clientMock },
      );
      expect(clientMock.query.mock.calls[0][0]).toMatchObject({
        variables: {
          networkId: 'development',
          code: '(kadena.spirekey.details "r:mock-account" coin)',
        },
      });
      expect(res).resolves.toMatchObject(mockAccount);
    });
    it('should sum the balances', async () => {
      localStorage.setItem(
        'localAccounts',
        JSON.stringify([
          {
            networkId: 'development',
            alias: 'MockAccount',
            accountName: 'r:mock-account',
          },
        ]),
      );
      const clientMock = {
        query: vi.fn().mockReturnValue({
          data: {
            chain0: {
              result: JSON.stringify({
                ...mockAccount,
                account: mockAccount.accountName,
                balance: 1.1,
              }),
            },
            chain1: {
              result: JSON.stringify({
                ...mockAccount,
                account: mockAccount.accountName,
                balance: 1.1,
              }),
            },
            chain2: {
              result: JSON.stringify({
                ...mockAccount,
                account: mockAccount.accountName,
                balance: 1.1,
              }),
            },
            chain3: {
              result: JSON.stringify({
                ...mockAccount,
                account: mockAccount.accountName,
                balance: 1.1,
              }),
            },
          },
        }),
      } as any;
      const res = await account(
        null,
        {
          networkId: 'development',
          accountName: 'r:mock-account',
        },
        { client: clientMock },
      );
      expect(res.balance).toEqual(4.4);
    });
    it('should retrieve account info from multiple networks', () => {
      localStorage.setItem(
        'localAccounts',
        JSON.stringify([
          {
            networkId: 'development',
            alias: 'MockAccount',
            accountName: 'r:mock-account',
          },
          {
            networkId: 'testnet04',
            alias: 'MockAccount',
            accountName: 'r:mock-account',
          },
        ]),
      );
      const clientMock = {
        query: vi.fn().mockReturnValue({
          data: {},
        }),
      } as any;
      accounts(null, {}, { client: clientMock });
      expect(clientMock.query.mock.calls[0][0]).toMatchObject({
        variables: {
          networkId: 'development',
          accountName: 'r:mock-account',
        },
      });
      expect(clientMock.query.mock.calls[1][0]).toMatchObject({
        variables: {
          networkId: 'testnet04',
          accountName: 'r:mock-account',
        },
      });
    });
    it('should retrieve account info from a single network', () => {
      localStorage.setItem(
        'localAccounts',
        JSON.stringify([
          {
            networkId: 'development',
            alias: 'MockAccount',
            accountName: 'r:mock-account',
          },
          {
            networkId: 'testnet04',
            alias: 'MockAccount',
            accountName: 'r:mock-account',
          },
        ]),
      );
      const clientMock = {
        query: vi.fn().mockReturnValue({
          data: {},
        }),
      } as any;
      accounts(
        null,
        {
          networkId: 'testnet04',
        },
        { client: clientMock },
      );
      expect(clientMock.query.mock.calls[0][0]).toMatchObject({
        variables: {
          networkId: 'testnet04',
          accountName: 'r:mock-account',
        },
      });
    });
  });
});
