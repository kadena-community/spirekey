import { Account } from '@kadena/spirekey-sdk';
import { renderHook } from '@testing-library/react-hooks';
import {
  AccountNameVariable,
  recoverAccount,
  useRecoverAccount,
} from '../recover-account';

describe('recover-account', () => {
  describe('useRecoverAccount', () => {
    const mocksHook = vi.hoisted(() => {
      return {
        useAccount: vi.fn(),
        useAccounts: vi.fn(),
        useLazyQuery: vi.fn(),
        getRecoveredAccount: vi.fn(),
      };
    });

    beforeEach(async () => {
      vi.mock('./../accounts', async () => {
        const actual = await vi.importActual('./../accounts');
        return {
          ...actual,
          useAccount: mocksHook.useAccount,
          useAccounts: mocksHook.useAccounts,
        };
      });

      vi.mock('@apollo/client', async () => {
        const actual = await vi.importActual('@apollo/client');
        return {
          ...actual,
          useLazyQuery: mocksHook.useLazyQuery,
        };
      });
    });

    afterEach(() => {
      vi.resetAllMocks();
    });

    it('should return the recovered account with the correct alias', async () => {
      const mockAccount = {
        accountName: 'r:he-man',
        networkId: 'testnet04',
      } as Account;
      mocksHook.useAccounts.mockReturnValue({
        getAccounts: async () => [
          {
            accountName: 'r:skeletor',
            networkId: 'testnet04',
          },
          {
            accountName: 'r:cringer',
            networkId: 'testnet04',
          },
        ],
      });
      mocksHook.useAccount.mockReturnValue({
        getAccount: vi.fn().mockResolvedValue(mockAccount),
        setAccount: vi.fn(),
      });
      mocksHook.getRecoveredAccount.mockResolvedValue({
        data: {},
      });
      mocksHook.useLazyQuery.mockReturnValue([mocksHook.getRecoveredAccount]);
      const { result } = renderHook(() => useRecoverAccount());

      const data = await result.current.recoverAccount('testnet04');
      expect(data).toEqual({ ...mockAccount, alias: 'SpireKey Account 3' });
    });

    it('should throw when something went wrong in getRecoveredAccount', async () => {
      const mockAccount = {
        accountName: 'r:he-man',
        networkId: 'testnet04',
      } as Account;
      mocksHook.useAccounts.mockReturnValue({
        getAccounts: async () => [
          {
            accountName: 'r:skeletor',
            networkId: 'testnet04',
          },
          {
            accountName: 'r:cringer',
            networkId: 'testnet04',
          },
        ],
      });
      mocksHook.useAccount.mockReturnValue({
        getAccount: vi.fn().mockResolvedValue(mockAccount),
        setAccount: vi.fn(),
      });
      mocksHook.getRecoveredAccount.mockResolvedValue({
        error: {},
      });
      mocksHook.useLazyQuery.mockReturnValue([mocksHook.getRecoveredAccount]);
      const { result } = renderHook(() => useRecoverAccount());

      await expect(async () => {
        await result.current.recoverAccount('testnet04');
      }).rejects.toThrowError();
    });
  });

  describe('recoverAccount', () => {
    const mocks = vi.hoisted(() => {
      return {
        startAuthentication: vi.fn(),
        client: {
          query: vi.fn(),
        },
      };
    });

    beforeEach(async () => {
      vi.mock('@simplewebauthn/browser', async () => {
        const actual = await vi.importActual('@simplewebauthn/browser');
        return {
          ...actual,
          startAuthentication: mocks.startAuthentication,
        };
      });
    });

    afterEach(() => {
      vi.resetAllMocks();
    });

    it('should throw, when there is no client', async () => {
      await expect(
        async () =>
          await recoverAccount(
            '',
            { networkId: 'testnet04' } as AccountNameVariable,
            { client: undefined } as any,
          ),
      ).rejects.toThrowError('No client provided');
    });

    it('should return the found accountName', async () => {
      mocks.startAuthentication.mockResolvedValue({
        id: 'testId',
      });
      mocks.client.query.mockResolvedValue({
        data: {
          events: {
            edges: [
              {
                node: {
                  parameters: '["r:he-man"]',
                },
              },
            ],
          },
        },
      });

      const accountName = await recoverAccount(
        '',
        { networkId: 'testnet04' } as AccountNameVariable,
        { client: mocks.client } as any,
      );

      expect(accountName).toEqual('r:he-man');
    });

    it('should return undefined if no account found', async () => {
      mocks.startAuthentication.mockResolvedValue({
        id: 'testId',
      });
      mocks.client.query.mockResolvedValue({
        data: {
          events: {
            edges: [
              {
                node: {
                  parameters: '["no account"]',
                },
              },
            ],
          },
        },
      });

      const accountName = await recoverAccount(
        '',
        { networkId: 'testnet04' } as AccountNameVariable,
        { client: mocks.client } as any,
      );

      expect(accountName).toEqual(undefined);
    });

    it('should throw when there is no data returned from the client.query', async () => {
      mocks.startAuthentication.mockResolvedValue({
        id: 'testId',
      });
      mocks.client.query.mockResolvedValue({});

      await expect(async () => {
        await recoverAccount(
          '',
          { networkId: 'testnet04' } as AccountNameVariable,
          { client: mocks.client } as any,
        );
      }).rejects.toThrowError('No account found');

      expect(mocks.startAuthentication).toBeCalledTimes(1);
      expect(mocks.startAuthentication).toHaveBeenCalledWith({
        challenge: 'recoverchallenge',
        rpId: 'localhost',
      });
      expect(mocks.client.query).toBeCalledTimes(1);
      expect(mocks.client.query.mock.calls[0][0].variables).toEqual({
        filter: '{"array_contains":["testId"]}',
        networkId: 'testnet04',
      });
    });
  });
});
