import {
  account,
  accounts,
  setAccount,
  useAccount,
  useAccounts,
} from '@/resolvers/accounts';
import { Account } from '@kadena/spirekey-sdk';
import { renderHook } from '@testing-library/react-hooks';

describe('resolvers: account', () => {
  describe('hooks', () => {
    const mockExecute = vi.hoisted(() => {
      return {
        execute: vi.fn(),
      };
    });

    const mockRefetch = vi.hoisted(() => {
      return {
        refetch: vi.fn(),
      };
    });
    const mocks = vi.hoisted(() => {
      return {
        useLazyQuery: vi.fn(),
        useQuery: vi.fn(),
      };
    });

    beforeEach(async () => {
      vi.mock('@apollo/client', async () => {
        const actual = await vi.importActual('@apollo/client');
        return {
          ...actual,
          useLazyQuery: mocks.useLazyQuery,
          useQuery: mocks.useQuery,
        };
      });
    });

    afterEach(() => {
      vi.resetAllMocks();
    });

    describe('useAccounts', () => {
      it('should have initially no accounts', () => {
        mocks.useQuery.mockReturnValue({
          refetch: mockRefetch.refetch,
        });

        const { result } = renderHook(() => useAccounts());
        expect(result.current.accounts).toEqual([]);
      });

      it('should have accounts after the get', async () => {
        const accountsArray = [{ accountName: 'r:he-man' }];
        mockRefetch.refetch.mockResolvedValue({
          data: {
            accounts: accountsArray,
          },
        });
        mocks.useQuery.mockReturnValue({
          refetch: mockRefetch.refetch,
        });
        const { result } = renderHook(() => useAccounts());
        const dataResult = await result.current.getAccounts('testnet01');

        expect(dataResult).toEqual(accountsArray);
      });
    });
    describe('useAccount', () => {
      it('should fetch account from getAccount', async () => {
        const mockAccount = {
          accountName: 'r:he-man',
          networkId: 'development',
          minApprovals: 1,
          minRegistrationApprovals: 1,
          balance: 0.0,
          devices: [],
          chainIds: [],
        };
        mockExecute.execute.mockResolvedValue({
          data: {
            account: mockAccount,
          },
        });
        mocks.useLazyQuery.mockReturnValue([mockExecute.execute]);

        const { result } = renderHook(() => useAccount());

        const resultData = await result.current.getAccount(
          'https://graph',
          'r:he-man',
        );

        expect(mocks.useLazyQuery).toBeCalledTimes(1);
        expect(mockExecute.execute).toBeCalledTimes(1);
        expect(resultData).toEqual(mockAccount);
      });
    });
  });

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
              result: JSON.stringify([
                {
                  ...mockAccount,
                  account: mockAccount.accountName,
                },
                { keys: ['pubkey'], pred: 'keys-any' },
              ]),
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
      const {
        variables: { networkId, code },
      } = clientMock.query.mock.calls[0][0];
      expect(networkId).toEqual('development');
      expect(code.replace(/\r|\n|(  )/g, '')).toEqual(
        `[(kadena.spirekey.details "r:mock-account" coin)(describe-keyset "mock-account")]`,
      );
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
              result: JSON.stringify([
                {
                  ...mockAccount,
                  account: mockAccount.accountName,
                  balance: 1.1,
                },
                { keys: ['pubkey'], pred: 'keys-any' },
              ]),
            },
            chain1: {
              result: JSON.stringify([
                {
                  ...mockAccount,
                  account: mockAccount.accountName,
                  balance: 1.1,
                },
                { keys: ['pubkey'], pred: 'keys-any' },
              ]),
            },
            chain2: {
              result: JSON.stringify([
                {
                  ...mockAccount,
                  account: mockAccount.accountName,
                  balance: 1.1,
                },
                { keys: ['pubkey'], pred: 'keys-any' },
              ]),
            },
            chain3: {
              result: JSON.stringify([
                {
                  ...mockAccount,
                  account: mockAccount.accountName,
                  balance: 1.1,
                },
                { keys: ['pubkey'], pred: 'keys-any' },
              ]),
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

  describe('setAccount', () => {
    const localStorageKey = 'localAccounts';
    const localStorageObject = [
      {
        accountName: 'r:he-man',
        networkId: 'testnet04',
      },
      {
        accountName: 'r:cringer',
        networkId: 'mainnet01',
      },
    ] as Account[];

    beforeEach(() => {
      localStorage.setItem(localStorageKey, JSON.stringify(localStorageObject));
    });

    it('should save the given account to the localstorage', () => {
      const account = {
        accountName: 'skeletor',
        networkId: 'testnet04',
      } as Account;

      setAccount(account);
      expect(JSON.parse(localStorage.getItem(localStorageKey) ?? '[]')).toEqual(
        [...localStorageObject, account],
      );
    });

    it('should NOT save the given account to the localstorage, if it is already in localstorage', () => {
      const account = {
        accountName: 'r:he-man',
        networkId: 'testnet04',
      } as Account;

      setAccount(account);
      expect(JSON.parse(localStorage.getItem(localStorageKey) ?? '[]')).toEqual(
        [...localStorageObject],
      );
    });
  });
});
