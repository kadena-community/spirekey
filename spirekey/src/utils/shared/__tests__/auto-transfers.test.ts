import { deviceColors } from '@/styles/shared/tokens.css';
import {
  AccountBalance,
  getOptimalTransactions,
  getOptimalTransfers,
  sortAccountBalances,
} from '@/utils/auto-transfers';
import type { Account } from '@kadena/spirekey-types';
import { ChainId } from '@kadena/types';

describe('auto transfers', () => {
  describe('when determining the optimal transfers', () => {
    describe('when finding the optimal transfers from chain', () => {
      const mocks = vi.hoisted(() => {
        return {
          getRAccountFromChain: vi.fn(),
          getAccountFromChain: ({
            accountName,
            chainId,
          }: {
            accountName: string;
            networkId: string;
            chainId: ChainId;
          }) => {
            const mockedBalance: any = {
              '4': '40',
              '5': '50',
              '8': '10',
              '10': '5',
            };
            const accounts: Account = {
              balance: mockedBalance[chainId] as string,
              chainIds: [chainId],
              accountName,
              devices: [
                {
                  color: deviceColors.red,
                  domain: 'https://spirekey.kadena.io',
                  deviceType: 'phone',
                  guard: { keys: ['WEBAUTHN-pubkey'], pred: 'keys-any' },
                  'credential-id': 'XesUer',
                },
              ],
              networkId: 'development',
              alias: 'SpireKey Account 1',
              txQueue: [],
              minApprovals: 1,
              minRegistrationApprovals: 1,
            };
            return Promise.resolve(accounts);
          },
        };
      });

      beforeEach(() => {
        vi.mock('@/utils/shared/account', () => {
          return mocks;
        });
      });

      afterEach(() => {
        vi.resetAllMocks();
      });

      it('should prepare the txs with R:account', async () => {
        const chainIds: ChainId[] = ['4', '5', '8', '10'];
        const account: Pick<Account, 'chainIds' | 'accountName' | 'networkId'> =
          {
            networkId: 'development',
            accountName: 'r:account',
            chainIds,
          };
        await getOptimalTransactions(account, '8', 75);

        expect(mocks.getRAccountFromChain).toBeCalledTimes(chainIds.length);
      });

      it('should prepare the txs', async () => {
        const account: Pick<Account, 'chainIds' | 'accountName' | 'networkId'> =
          {
            networkId: 'development',
            accountName: 'c:account',
            chainIds: ['4', '5', '8', '10'],
          };
        const res = await getOptimalTransactions(account, '8', 75);
        const cmds = res?.map(({ cmd }) => JSON.parse(cmd));
        expect(cmds).toMatchObject([
          {
            meta: { chainId: '5' },
          },
          {
            meta: { chainId: '4' },
          },
        ]);
      });
    });

    describe('when finding the optimal transfers', () => {
      const accounts: AccountBalance[] = [
        { balance: 40, chainId: '4' },
        { balance: 50, chainId: '5' },
        { balance: 10, chainId: '8' },
        { balance: 5, chainId: '10' },
      ].map((x) => ({
        balance: x.balance,
        chainId: x.chainId as ChainId,
        accountName: 'c:account',
        target: '8',
        credentials: [{ pubKey: 'WEBAUTHN-pubkey', credentialId: 'XesUer' }],
        networkId: 'development',
        cost: 0,
      }));
      describe('and there is enough on the target chain', () => {
        it('should prepare no tx', () => {
          const result = getOptimalTransfers(accounts, '8', 9.5);
          expect(result).toMatchObject([]);
        });
      });
      describe('and there is enough on a different chain', () => {
        it('should prepare one tx', () => {
          const result = getOptimalTransfers(accounts, '8', 15);
          expect(result).toMatchObject([
            { balance: 50, chainId: '5', cost: 5 },
          ]);
        });
      });
      describe('and there is enough on a combination of different chains', () => {
        it('should prepare multiple tx', () => {
          const result = getOptimalTransfers(accounts, '8', 75);
          expect(result).toMatchObject([
            { balance: 50, chainId: '5', cost: 49.9999 },
            { balance: 40, chainId: '4', cost: 15.0001 },
          ]);
        });
      });
      describe('and there is not enough funds from the combination of chains', () => {
        it('should prepare multiple tx', () => {
          const result = getOptimalTransfers(accounts, '8', 1000);
          expect(result).toEqual(null);
        });
      });
    });
    describe('when sorting the accountBalances', () => {
      it('should sort the accountBalance of the target chain first', () => {
        const accounts: Pick<AccountBalance, 'balance' | 'chainId'>[] = [
          { balance: 99, chainId: '5' },
          { balance: 88, chainId: '8' },
          { balance: 9, chainId: '10' },
          { balance: 100, chainId: '4' },
        ];
        const expectedOrder = [
          { balance: 9, chainId: '10' },
          { balance: 100, chainId: '4' },
          { balance: 99, chainId: '5' },
          { balance: 88, chainId: '8' },
        ];
        const sorted = accounts.sort(sortAccountBalances('10'));
        expect(sorted).toEqual(expectedOrder);
      });
    });
  });
});
