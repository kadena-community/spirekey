import { AccountRegistration } from '@/context/AccountsContext';
import {
  gasStation,
  genesisPrivateKey,
  genesisPubKey,
} from '@/utils/constants';
import { asyncPipe } from '@/utils/shared/asyncPipe';
import { l1Client } from '@/utils/shared/client';
import { signWithKeyPair } from '@/utils/signSubmitListen';
import {
  ChainId,
  ITransactionDescriptor,
  createTransaction,
} from '@kadena/client';
import {
  addData,
  addSigner,
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from '@kadena/client/fp';

/*
  All functions in this file are designed to operate on a SINGLE chain only.
  Abstraction for handling multiple chains should be implemented in other parts
  of the application, such as in the AccountsContext.
*/

export const getAccountName = async (
  publicKey: string,
  networkId: string,
  chainId: ChainId,
): Promise<string> => {
  return asyncPipe(
    composePactCommand(
      execution(`
      (let* ((guard (read-keyset 'ks))
       (account (create-principal guard))
      )
  (${process.env.NAMESPACE}.webauthn-wallet.get-account-name account)
)
`),
      setMeta({
        chainId,
        gasLimit: 1000,
        gasPrice: 0.0000001,
        ttl: 60000,
      }),
      addData('ks', {
        keys: [getWebAuthnPubkeyFormat(publicKey)],
        pred: 'keys-any',
      }),
      setNetworkId(networkId),
    ),
    createTransaction,
    (tx) =>
      // TODO: use preflight
      l1Client.local(tx, { preflight: false, signatureVerification: false }),
    (tx) => tx.result.data,
  )({});
};

export const registerAccountOnChain = async ({
  accountName,
  color,
  deviceType,
  domain,
  credentialId,
  credentialPubkey,
  networkId,
  chainId,
}: Omit<AccountRegistration, 'alias' | 'chainIds'> & {
  chainId: ChainId;
  accountName: string;
}): Promise<ITransactionDescriptor> => {
  return asyncPipe(
    registerAccountCommand({
      accountName,
      color,
      deviceType,
      domain,
      credentialId,
      credentialPubkey,
      networkId,
      chainId,
    }),
    createTransaction,
    signWithKeyPair({ publicKey: genesisPubKey, secretKey: genesisPrivateKey }),
    l1Client.submit,
  )({});
};

export const getWebAuthnPubkeyFormat = (pubkey: string) => {
  if (/^WEBAUTHN-/.test(pubkey)) return pubkey;
  return `WEBAUTHN-${pubkey}`;
};

const registerAccountCommand = ({
  accountName,
  color,
  deviceType,
  credentialId,
  credentialPubkey,
  domain,
  networkId,
  chainId,
}: {
  accountName: string;
  color: string;
  deviceType: string;
  credentialId: string;
  credentialPubkey: string;
  domain: string;
  networkId: string;
  chainId: ChainId;
}) => {
  const displayName = `${deviceType}_${color}`;
  return composePactCommand(
    execution(
      `
        (${process.env.NAMESPACE}.webauthn-wallet.create-wallet 
          "${accountName}"
          { 'name          : "${displayName}"
          , 'credential-id : "${credentialId}"
          , 'domain        : "${domain}"
          , 'guard         : (read-keyset 'ks)
          }
        )
      `.trim(),
    ),
    addSigner(genesisPubKey, (withCap) => [
      withCap('coin.GAS'),
      withCap(
        `${process.env.NAMESPACE}.gas-station.GAS_PAYER`,
        accountName,
        { int: 1 },
        1,
      ),
    ]),
    addData('ks', {
      keys: [getWebAuthnPubkeyFormat(credentialPubkey)],
      pred: 'keys-any',
    }),
    setMeta({
      chainId,
      gasLimit: 2000,
      gasPrice: 0.0000001,
      ttl: 60000,
      senderAccount: gasStation,
    }),
    setNetworkId(networkId),
  );
};
