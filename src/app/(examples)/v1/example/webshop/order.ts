import { asyncPipe } from '@/utils/shared/asyncPipe';
import { createTransaction } from '@kadena/client';
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
        chainId: process.env.CHAIN_ID,
        gasLimit: 1000,
        gasPrice: 0.0000001,
        ttl: 60000,
        senderAccount: accountName,
      }),
      setNetworkId(process.env.DAPP_NETWORK_ID!),
      addSigner(
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
