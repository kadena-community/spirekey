export const calculateBalancePercentage = (
  balance: number,
  balances: number[],
): number => {
  const minBalance = Math.min(...balances);
  const maxBalance = Math.max(...balances);
  const balanceRange = maxBalance - minBalance;

  // Check if balance range is 0, indicating all balances are 0
  if (balanceRange === 0) {
    return 10; // Return 10 when all balances are 0
  }

  const balanceRatio = balance / balanceRange;

  // Minimum is set to ten to always show some indication of balance
  return 10 + Math.round(balanceRatio * 90);
};
