import { accounts } from '@/resolvers/accounts';
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
    it('returns null when no account is found', async () => {
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
      const res = accounts(
        null,
        {
          networkId: 'development',
        },
        { client: clientMock },
      );

      expect(clientMock.query.mock.calls[0][0]).toMatchObject({
        variables: {
          networkId: 'development',
          code: '(kadena.spirekey.details "r:mock-account" coin)',
        },
      });
      expect(res).resolves.toMatchObject([mockAccount]);
    });
  });
});
