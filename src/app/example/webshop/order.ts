import { asyncPipe } from '@/utils/asyncPipe';
import { createTransaction, Pact } from '@kadena/client';
import {
  addSigner,
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from '@kadena/client/fp';

export const createOrder = async ({
  price,
  caccount,
  signerPubKey,
}: {
  price: number;
  caccount: string;
  waccount: string;
  signerPubKey: string;
}) => {
  return asyncPipe(
    composePactCommand(
      execution(
        `(${
          process.env.NAMESPACE
        }.webauthn-wallet.transfer "${caccount}" "cookie-shop" ${price.toPrecision(
          8,
        )}`,
      ),
      setMeta({
        chainId: '14',
        gasLimit: 1000,
        gasPrice: 0.0000001,
        ttl: 60000,
        senderAccount: caccount,
      }),
      setNetworkId(process.env.NETWORK_ID || 'fast-development'),
      addSigner(
        // @ts-expect-error WebAuthn is not yet added to the @kadena/client types
        {
          pubKey: signerPubKey,
          scheme: 'WebAuthn',
        },
        (withCap: any) => [
          withCap(
            `${process.env.NAMESPACE}.webauthn-wallet.TRANSFER`,
            caccount,
            'cookie-shop',
            price,
          ),
          withCap(
            `${process.env.NAMESPACE}.webauthn-wallet.GAS_PAYER`,
            caccount,
            { int: 1 },
            1,
          ),
          withCap('coin.GAS'),
        ],
      ),
    ),
    createTransaction,
  )({});
};
