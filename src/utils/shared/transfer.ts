import { asyncPipe } from '@/utils/shared/asyncPipe';
import { ChainId, ICommand, createTransaction } from '@kadena/client';
import {
  addSigner,
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from '@kadena/client/fp';
import { getAccountFrom } from './account';

export const transfer = async ({
  amount,
  namespace,
  publicKey,
  receiver,
  sender,
  networkId,
  gasPayer,
}: {
  publicKey: string;
  sender: string;
  receiver: string;
  amount: number;
  namespace: string;
  networkId: string;
  gasPayer: string;
}): Promise<ICommand> => {
  // @TODO: make a decicion which command to get (safe/unsafe transfer)
  // @TODO: add a chainId parameter
  const receiverAcc = await getAccountFrom({
    accountName: receiver,
    networkId,
    chainIds: [process.env.CHAIN_ID],
    namespace,
  });

  if (!receiverAcc) {
    throw new Error('Receiver account not found');
  }

  return asyncPipe(
    composePactCommand(
      execution(
        `(${namespace}.webauthn-wallet.transfer "${sender}" "${receiver}" ${amount.toPrecision(
          8,
        )})`,
      ),
      setMeta({
        chainId: process.env.CHAIN_ID,
        gasLimit: 2000,
        gasPrice: 0.0000001,
        ttl: 60000,
        senderAccount: gasPayer,
      }),
      setNetworkId(networkId),
      // if payer === sender, then we need to add only one signer
      addSigner(
        {
          pubKey: publicKey,
          scheme: 'WebAuthn',
        },
        (signFor) => {
          const caps = [
            signFor(
              `${namespace}.webauthn-wallet.TRANSFER`,
              sender,
              receiver,
              Number(amount.toPrecision(8)),
            ),
          ];
          if (gasPayer === sender) {
            caps.push(
              signFor(
                `${namespace}.webauthn-wallet.GAS_PAYER`,
                sender,
                { int: 1 },
                1,
              ),
            );
          }
          return caps;
        },
      ),
      gasPayer !== sender
        ? // then this line should be skipped
          addSigner(
            {
              pubKey: receiverAcc.devices[0].guard.keys[0],
              scheme: 'WebAuthn',
            },
            (signFor) => [
              signFor(
                `${namespace}.webauthn-wallet.GAS_PAYER`,
                receiver,
                { int: 1 },
                1,
              ),
            ],
          )
        : (t) => t,
    ),
    createTransaction,
  )({});
};
