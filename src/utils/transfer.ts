import { asyncPipe } from '@/utils/asyncPipe';
import { createTransaction } from '@kadena/client';
import {
  addSigner,
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from '@kadena/client/fp';
import { getAccount, getAccountFrom } from './account';

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
}): Promise<string> => {
  // TODO: make a decicion which command to get (safe/unsafe transfer)
  const receiverAcc = await getAccountFrom({
    caccount: receiver,
    namespace,
    networkId,
  });

  return asyncPipe(
    composePactCommand(
      execution(
        `(${namespace}.webauthn-wallet.transfer "${sender}" "${receiver}" ${amount.toPrecision(
          8,
        )})`,
      ),
      setMeta({
        chainId: '14',
        gasLimit: 2000,
        gasPrice: 0.0000001,
        ttl: 60000,
        senderAccount: gasPayer,
      }),
      setNetworkId(networkId),
      // if payer === sender, then we need to add only one signer
      addSigner(
        // @ts-expect-error WebAuthn scheme is not yet added to kadena-client
        {
          pubKey: publicKey,
          scheme: 'WebAuthn',
        },
        (signFor) => [
          signFor(
            `${namespace}.webauthn-wallet.TRANSFER`,
            sender,
            receiver,
            amount,
          ),
          signFor(
            `${namespace}.webauthn-wallet.GAS_PAYER`,
            sender,
            { int: 1 },
            1,
          ),
        ],
      ),
      // then this line should be skipped
      // addSigner(
      //   // @ts-expect-error WebAuthn scheme is not yet added to kadena-client
      //   {
      //     pubKey: receiverAcc.devices[0].guard.keys[0],
      //     scheme: 'WebAuthn',
      //   },
      //   (signFor) => [
      //     signFor(
      //       `${namespace}.webauthn-wallet.GAS_PAYER`,
      //       receiver,
      //       { int: 1 },
      //       1,
      //     ),
      //   ],
      // ),
    ),
    createTransaction,
  )({});
};
