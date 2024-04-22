import { asyncPipe } from '@/utils/shared/asyncPipe';
import { ChainId, createTransaction } from '@kadena/client';
import {
  addSigner,
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from '@kadena/client/fp';

export const updateAccount = async ({
  accountName,
  minApprovals,
  minRegistrationApprovals,
  chainId,
  networkId,
  publicKey,
}: {
  accountName: string;
  minApprovals: number;
  minRegistrationApprovals: number;
  chainId: ChainId;
  networkId: string;
  publicKey: string;
}) => {
  const namespace = process.env.NAMESPACE;
  return asyncPipe(
    composePactCommand(
      execution(
        `(${namespace}.webauthn-wallet.update-account "${accountName}" ${minApprovals} ${minRegistrationApprovals})`,
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
        // @ts-expect-error WebAuthn scheme is not yet added to kadena-client
        {
          pubKey: publicKey,
          scheme: 'WebAuthn',
        },
        (signFor) => [
          signFor(
            `${namespace}.webauthn-wallet.UPDATE_ACCOUNT`,
            accountName,
            minApprovals,
            minRegistrationApprovals,
          ),
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
