import { asyncPipe } from '@/utils/shared/asyncPipe';
import {
  ChainId,
  IContinuationPayloadObject,
  createTransaction,
} from '@kadena/client';
import {
  addSigner,
  composePactCommand,
  continuation,
  execution,
  setMeta,
  setNetworkId,
} from '@kadena/client/fp';
import { gasStation, genesisPrivateKey, genesisPubKey } from './constants';
import { signWithKeyPair } from './signSubmitListen';

export const copyAccount = async ({
  accountName,
  chainId,
  targetChainId,
  networkId,
  publicKey,
}: {
  accountName: string;
  chainId: ChainId;
  targetChainId: string;
  networkId: string;
  publicKey: string;
}) => {
  const namespace = process.env.NAMESPACE;
  return asyncPipe(
    composePactCommand(
      execution(
        `(${namespace}.webauthn-wallet.copy-account "${accountName}" "${targetChainId}")`,
      ),
      setMeta({
        chainId,
        gasLimit: 3000,
        gasPrice: 0.00000001,
        ttl: 60000,
        senderAccount: accountName,
      }),
      setNetworkId(networkId),
      addSigner(
        {
          pubKey: publicKey,
          scheme: 'WebAuthn',
        },
        (signFor) => [
          signFor(`${namespace}.webauthn-wallet.COPY_ACCOUNT`, accountName),
          signFor(
            `${namespace}.webauthn-wallet.GAS_PAYER`,
            accountName,
            { int: 1 },
            1,
          ),
        ],
      ),
    ),
    createTransaction,
  )({});
};

export function continueCopy(options: IContinuationPayloadObject['cont']) {
  return asyncPipe(
    composePactCommand(
      continuation(options),
      setMeta({
        chainId: '15',
        gasLimit: 2000,
        gasPrice: 0.0000001,
        ttl: 60000,
        senderAccount: gasStation,
      }),
      addSigner(genesisPubKey, (withCapabilities) => [
        withCapabilities(
          `${process.env.NAMESPACE}.spirekey.GAS_PAYER`,
          gasStation,
          { int: 1 },
          1,
        ),
      ]),
      setNetworkId('testnet04'),
    ),
    createTransaction,
    signWithKeyPair({
      publicKey: genesisPubKey,
      secretKey: genesisPrivateKey,
    }),
  )({});
}
