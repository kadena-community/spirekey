import { balance } from '@/components/Card/Card.css';
import {
  AccountBalance,
  getOptimalTransfers,
  sortAccountBalances,
} from '@/utils/auto-transfers';
import { ChainId } from '@kadena/types';
import { describe, expect, it } from 'vitest';

describe('auto transfers', () => {
  describe('when determining the optimal transfers', () => {
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
            { balance: 50, chainId: '5', cost: 50 },
            { balance: 40, chainId: '4', cost: 15 },
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
