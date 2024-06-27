import type { Account } from "@kadena-spirekey/types";
import { createClient, ICommand, IUnsignedCommand } from "@kadena/client";

export const isAccountReady = (account: Account) => async () => {
  const pendingRegistrations = account.devices
    .flatMap((d) => d.pendingRegistrationTxs)
    .filter((x) => !!x)
    .map((tx) => createClient().pollOne(tx));
  await Promise.allSettled(pendingRegistrations);
  return account;
};

export const areAccountsReady =
  (transactions: (IUnsignedCommand | ICommand)[], accounts: Account[]) =>
  async () => {
    await Promise.all(accounts.map(isAccountReady));
    return transactions;
  };


