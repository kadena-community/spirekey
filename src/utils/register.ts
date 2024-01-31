import { asyncPipe } from '@/utils/asyncPipe';
import { l1Client } from '@/utils/client';
import {
  gasStation,
  genesisPrivateKey,
  genesisPubKey,
} from '@/utils/constants';
import { signWithKeyPair } from '@/utils/signSubmitListen';
import { createTransaction } from '@kadena/client';
import {
  addData,
  addSigner,
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from '@kadena/client/fp';

export const getAccountName = async (publicKey: string) =>
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
        chainId: '14',
        gasLimit: 1000,
        gasPrice: 0.0000001,
        ttl: 60000,
      }),
      addData('ks', {
        keys: [getWebAuthnPubkeyFormat(publicKey)],
        pred: 'keys-any',
      }),
      setNetworkId(process.env.NETWORK_ID || 'fast-development'),
    ),
    createTransaction,
    (tx) =>
      // TODO: use preflight
      l1Client.local(tx, { preflight: false, signatureVerification: false }),
    (tx) => tx.result.data,
  )({});

export const registerAccount = async ({
  displayName,
  domain,
  credentialId,
  credentialPubkey,
  network,
}: {
  displayName: string;
  domain: string;
  credentialId: string;
  credentialPubkey: string;
  network: string;
}): Promise<string> => {
  const caccount = await getAccountName(credentialPubkey);

  return asyncPipe(
    registerAccountCommand({
      caccount,
      displayName,
      domain,
      credentialId,
      credentialPubkey,
      network,
    }),
    createTransaction,
    signWithKeyPair({ publicKey: genesisPubKey, secretKey: genesisPrivateKey }),
    l1Client.submit,
    l1Client.listen,
    () => caccount,
  )({});
};

export const getWebAuthnPubkeyFormat = (pubkey: string) => {
  if (/^WEBAUTHN-/.test(pubkey)) return pubkey;
  return `WEBAUTHN-${pubkey}`;
};

const registerAccountCommand = ({
  caccount,
  displayName,
  credentialId,
  credentialPubkey,
  domain,
  network,
}: {
  caccount: string;
  displayName: string;
  credentialId: string;
  credentialPubkey: string;
  domain: string;
  network: string;
}) =>
  composePactCommand(
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
      chainId: '14',
      gasLimit: 2000,
      gasPrice: 0.0000001,
      ttl: 60000,
      senderAccount: gasStation,
    }),
    setNetworkId(network),
  );
