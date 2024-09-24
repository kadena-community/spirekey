import { autoTransfers } from '@/resolvers/auto-transfers';
import {
  AccountBalance,
  getOptimalTransfers,
  sortAccountBalances,
} from '@/utils/auto-transfers';
import { ChainId } from '@kadena/types';

describe('auto transfers', () => {
  describe('when determining the optimal transfers', () => {
    describe('when finding the optimal transfers from chain', () => {
      const mocks = vi.hoisted(() => {
        return {
          client: {
            query: vi.fn().mockResolvedValue({
              data: {
                accountBalances: [
                  { balance: '40', chainId: '4', credentials: ['pubkey'] },
                  { balance: '50', chainId: '5', credentials: ['pubkey'] },
                  { balance: '10', chainId: '8', credentials: ['pubkey'] },
                  { balance: '5', chainId: '10', credentials: ['pubkey'] },
                ],
              },
            }),
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
        const txs = await autoTransfers(
          null,
          {
            networkId: 'development',
            accountName: 'r:account',
            fungibleRequests: [{ target: '8', amount: 75, fungible: 'coin' }],
          },
          { client: mocks.client as any },
        );
        expect(txs?.length).toEqual(2);
        expect(
          txs?.map((tx) => {
            const cmd = JSON.parse(tx.cmd);
            return { chainId: cmd.meta.chainId };
          }),
        ).toEqual([{ chainId: '5' }, { chainId: '4' }]);
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
        credentials: ['pubkey'],
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
