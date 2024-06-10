import type { Account } from '@/context/types';

export const countWithPrefixOnDomain = (
  accounts: Account[],
  prefix: string,
  domain: string,
  excludeAccountName?: string,
): number =>
  accounts.filter(
    (account) =>
      account.alias.startsWith(prefix) &&
      account.devices.some((device) => device.domain.includes(domain)) &&
      (!excludeAccountName || account.accountName === excludeAccountName),
  ).length;
