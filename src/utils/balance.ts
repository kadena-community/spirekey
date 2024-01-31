export const calculateBalancePercentage = (
  balance: number,
  balances: number[]
): number => {
  const minBalance = Math.min(...balances);
  const maxBalance = Math.max(...balances);
  const balanceRange = maxBalance - minBalance;
  const balanceRatio = balance / balanceRange;

  // Minimum is set to ten to always show some indication of balance
  return 10 + Math.round(balanceRatio * 90);
};
