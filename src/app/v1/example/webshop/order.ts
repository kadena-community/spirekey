import { asyncPipe } from '@/utils/asyncPipe';
import { getDevnetNetworkId } from '@/utils/getDevnetNetworkId';
import { ChainId, createTransaction, Pact } from '@kadena/client';
import {
  addSigner,
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from '@kadena/client/fp';

export const createOrder = async ({
  price,
  accountName,
  signerPubKey,
}: {
  price: number;
  accountName: string;
  signerPubKey: string;
}) => {
  return asyncPipe(
    composePactCommand(
      execution(
        `(${
          process.env.NAMESPACE
        }.webauthn-wallet.transfer "${accountName}" "cookie-shop" ${price.toPrecision(
          8,
        )})`,
      ),
      setMeta({
        chainId: process.env.CHAIN_ID as ChainId,
        gasLimit: 1000,
        gasPrice: 0.0000001,
        ttl: 60000,
        senderAccount: accountName,
      }),
      setNetworkId(process.env.NETWORK_ID || getDevnetNetworkId()),
      addSigner(
        // @ts-expect-error WebAuthn is not yet added to the @kadena/client types
        {
          pubKey: signerPubKey,
          scheme: 'WebAuthn',
        },
        (withCap: any) => [
          withCap(
            `${process.env.NAMESPACE}.webauthn-wallet.TRANSFER`,
            accountName,
            'cookie-shop',
            price,
          ),
          withCap(
            `${process.env.NAMESPACE}.webauthn-wallet.GAS_PAYER`,
            accountName,
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
