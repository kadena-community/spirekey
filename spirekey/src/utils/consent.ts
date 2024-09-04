import { IPactCommand } from '@kadena/client';
import { Account } from '@kadena/spirekey-types';
import { ICommandPayload, IUnsignedCommand } from '@kadena/types';

type Signees = {
  accounts: Account[];
  candidates: Account[];
};

export const getAccountsForTx =
  (accounts: Account[]) => (tx: IUnsignedCommand) => {
    const { networkId, signers }: IPactCommand = JSON.parse(tx.cmd);
    const pubKeysInTx = signers.map((s) => s.pubKey);
    return accounts.reduce(
      (acc: Signees, curr) => {
        if (
          !curr.devices
            .flatMap((d) => d.guard.keys)
            .some((k) => pubKeysInTx.includes(k))
        )
          return acc;
        if (curr.networkId !== networkId)
          return { ...acc, candidates: [...acc.candidates, curr] };
        return { ...acc, accounts: [...acc.accounts, curr] };
      },
      {
        accounts: [],
        candidates: [],
      },
    );
  };

export const getPermissions = (
  keys: string[],
  signers: ICommandPayload['signers'],
) =>
  signers
    .filter((s) => keys.includes(s.pubKey))
    .flatMap((s) => s.clist)
    .reduce((caps, cap) => {
      const moduleName = cap?.name.replace(/\.(?:.(?!\.))+$/, '') || '';
      const moduleCaps = caps.get(moduleName) || [];
      caps.set(moduleName, [...moduleCaps, cap]);
      return caps;
    }, new Map());
