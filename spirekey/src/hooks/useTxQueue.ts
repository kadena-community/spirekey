import { genesisPrivateKey, genesisPubKey } from '@/utils/constants';
import { l1Client } from '@/utils/shared/client';
import { addSignatures, createTransactionBuilder } from '@kadena/client';
import { sign } from '@kadena/cryptography-utils';
import { Account } from '@kadena/spirekey-types';
import { ChainId, ICommand } from '@kadena/types';
import useSWR from 'swr';

export const useTxQueue = (
  accounts: Account[],
  onAccountsReady: (updatedAccounts: Account[]) => void,
) => {
  useSWR(
    accounts
      ?.flatMap(
        (account) =>
          account.accountName + account.txQueue.map((tx) => JSON.stringify(tx)),
      )
      .join(','),
    async () => {
      const updatedAccounts = await Promise.all(
        accounts.map(async (account) => {
          await Promise.all(
            account.txQueue.map(async (tx) => {
              const res = await l1Client.listen(tx);
              if (!res.continuation) return null;
              const target: ChainId = (
                res.continuation.continuation.args as ChainId[]
              )[3];
              const { step, pactId } = res.continuation;
              const proof = await l1Client.pollCreateSpv(tx, target);
              const continuationTx = createTransactionBuilder()
                .continuation({
                  step: step + 1,
                  proof,
                  pactId,
                  rollback: false,
                })
                .setMeta({
                  chainId: target,
                  senderAccount: process.env.GAS_STATION,
                  gasLimit: 849,
                  gasPrice: 0.00000001,
                })
                .setNetworkId(tx.networkId)
                .addSigner(genesisPubKey, (withCap) => [
                  withCap(
                    process.env.NAMESPACE + `.spirekey.GAS_PAYER`,
                    account.accountName,
                    { int: '0' },
                    0,
                  ),
                ])
                .createTransaction();
              const { sig, pubKey } = sign(continuationTx.cmd, {
                publicKey: genesisPubKey,
                secretKey: genesisPrivateKey,
              });
              const preflight = await l1Client.local(continuationTx, {
                preflight: true,
                signatureVerification: false,
              });
              if (
                (preflight.result as any).error?.message.includes(
                  'resumePact: pact completed',
                )
              )
                return null;
              if (preflight.result.status !== 'success') throw preflight;
              const continuationDescription = await l1Client.submit(
                addSignatures(continuationTx, {
                  sig: sig!,
                  pubKey,
                }) as ICommand,
              );
              await l1Client.listen(continuationDescription);
              return null;
            }),
          );

          return {
            ...account,
            txQueue: [],
          };
        }),
      );

      onAccountsReady(updatedAccounts);
    },
  );
};
