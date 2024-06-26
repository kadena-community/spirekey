import { Account } from '@kadena-spirekey/types';
import { IPactCommand } from '@kadena/client';
import { IUnsignedCommand } from '@kadena/types';

type Signees = {
  accounts: Account[];
  candidates: Account[];
};

export const getAccountsForTx =
  (accounts: Account[]) => (tx: IUnsignedCommand) => {
    const { meta, networkId, signers }: IPactCommand = JSON.parse(tx.cmd);
    const { chainId } = meta;
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
        if (!curr.chainIds.includes(chainId))
          return { ...acc, candidates: [...acc.candidates, curr] };
        return { ...acc, accounts: [...acc.accounts, curr] };
      },
      {
        accounts: [],
        candidates: [],
      },
    );
  };
