import { AccountRegistration } from '@/context/AccountsContext';
import { asyncPipe } from '@/utils/asyncPipe';
import { l1Client } from '@/utils/client';
import {
  gasStation,
  genesisPrivateKey,
  genesisPubKey,
} from '@/utils/constants';
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

export const getAccountName = async (publicKey: string, networkId: string) =>
  asyncPipe(
    composePactCommand(
      execution(`
      (let* ((guard (read-keyset 'ks))
       (account (create-principal guard))
      )
  (${process.env.NAMESPACE}.webauthn-wallet.get-account-name account)
)
`),
      setMeta({
        chainId: process.env.CHAIN_ID as ChainId,
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

export const registerAccountOnChain = async ({
  caccount,
  color,
  deviceType,
  domain,
  credentialId,
  credentialPubkey,
  network,
}: Omit<AccountRegistration, 'alias'>): Promise<ITransactionDescriptor> => {
  return asyncPipe(
    registerAccountCommand({
      caccount,
      color,
      deviceType,
      domain,
      credentialId,
      credentialPubkey,
      network,
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
  caccount,
  color,
  deviceType,
  credentialId,
  credentialPubkey,
  domain,
  network,
}: {
  caccount: string;
  color: string;
  deviceType: string;
  credentialId: string;
  credentialPubkey: string;
  domain: string;
  network: string;
}) => {
  const displayName = `${deviceType}_${color} `;
  return composePactCommand(
    execution(
      `
        (${process.env.NAMESPACE}.webauthn-wallet.create-wallet 
          1 1
          [{ 
              'name          : "${displayName}"
            , 'credential-id : "${credentialId}"
            , 'domain        : "${domain}"
            , 'guard         : (read-keyset 'ks)
          }]
        )
      `.trim(),
    ),
    addSigner(genesisPubKey, (withCap) => [
      withCap('coin.GAS'),
      withCap(
        `${process.env.NAMESPACE}.gas-station.GAS_PAYER`,
        caccount,
        { int: 1 },
        1,
      ),
    ]),
    addData('ks', {
      keys: [getWebAuthnPubkeyFormat(credentialPubkey)],
      pred: 'keys-any',
    }),
    setMeta({
      chainId: process.env.CHAIN_ID as ChainId,
      gasLimit: 2000,
      gasPrice: 0.0000001,
      ttl: 60000,
      senderAccount: gasStation,
    }),
    setNetworkId(network),
  );
};
