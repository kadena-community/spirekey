import { describe, expect, it } from 'vitest';

import type { Account } from '@/context/AccountsContext';
import { calculateBalancePercentage } from '@/utils/balance';

const defaultAccount: Account = {
  alias: 'testAlias',
  accountName: 'c:AccountName',
  balance: '50.0',
  devices: [],
  networkId: 'development',
  minApprovals: 1,
  minRegistrationApprovals: 1,
  chainIds: ['8'],
};

describe('balance', () => {
  describe('calculateBalancePercentage', () => {
    it('returns the minimum percentage if all balances are zero', async () => {
      const accounts: Account[] = [defaultAccount];
      const account = accounts[0];
      const balancePercentage = calculateBalancePercentage(account, accounts);
      expect(balancePercentage).toBe(10);
    });

    it('ignores accounts on other networks', async () => {
      const accounts: Account[] = [
        { ...defaultAccount, balance: '50.0' },
        { ...defaultAccount, balance: '25.0' },
        { ...defaultAccount, balance: '100.0', networkId: 'testnet04' },
      ];
      const account = accounts[0];
      const balancePercentage = calculateBalancePercentage(account, accounts);
      expect(balancePercentage).toBe(100);
    });

    it('takes the minimum percentage into account', async () => {
      const accounts: Account[] = [
        { ...defaultAccount, balance: '50.0' },
        { ...defaultAccount, balance: '0.0' },
        { ...defaultAccount, balance: '100.0' },
      ];
      const account = accounts[0];
      const balancePercentage = calculateBalancePercentage(account, accounts);
      expect(balancePercentage).toBe(55);
    });
  });
});
