import { AccountBalance, sortAccountBalances } from '@/utils/auto-transfers';
import { describe, expect, it } from 'vitest';

describe('auto transfers', () => {
  describe('when determining the optimal transfers', () => {
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
