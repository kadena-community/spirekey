import type { Account } from '@kadena-spirekey/types';

// Minimum is set to ten to always show some indication of balance
const minimumPercentage = 10;

export const calculateBalancePercentage = (
  account: Account,
  accounts: Account[],
): number => {
  const balances = accounts
    .filter((a) => a.networkId === account.networkId)
    .map((a) => parseFloat(a.balance));
  const balance = parseFloat(account.balance);

  const minBalance = Math.min(...balances);
  const maxBalance = Math.max(...balances);
  const balanceRange = maxBalance - minBalance;

  // If balance range is 0, indicating all balances are equal,
  // return minimum percentage
  if (balanceRange === 0) {
    return minimumPercentage;
  }

  const balanceRatio = (balance - minBalance) / balanceRange;

  return minimumPercentage + Math.round(balanceRatio * 90);
};
