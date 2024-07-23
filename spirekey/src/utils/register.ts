import {
  addSignatures,
  createTransaction,
  createTransactionBuilder,
  ICommand,
  type ChainId,
  type ITransactionDescriptor,
} from '@kadena/client';
import {
  addData,
  addSigner,
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from '@kadena/client/fp';

import type { AccountRegistration } from '@/context/AccountsContext';
import {
  gasStation,
  genesisPrivateKey,
  genesisPubKey,
} from '@/utils/constants';
import { asyncPipe } from '@/utils/shared/asyncPipe';
import { l1Client } from '@/utils/shared/client';
import { signWithKeyPair } from '@/utils/signSubmitListen';
import { sign } from '@kadena/cryptography-utils';

export const getAccountName = async (
  publicKey: string,
  networkId: string,
): Promise<string> => {
  return getAccountNameLegacy(publicKey, networkId);
};

export const getRAccountName = async (
  publicKey: string,
  tempPublicKey: string,
  networkId: string,
): Promise<string> => {
  const tx = createTransactionBuilder()
    .execution(
      `
    (let* (
      (ns-name (ns.create-principal-namespace (read-keyset 'ns-keyset)))
      (ks-ref-name (format "{}.{}" [ns-name 'spirekey-keyset]))
    )
      (define-namespace
        ns-name
        (read-keyset 'ns-keyset )
        (read-keyset 'ns-keyset )
      )
      (namespace ns-name)
      (define-keyset ks-ref-name
        (read-keyset 'ns-keyset)
      )
      (create-principal (keyset-ref-guard ks-ref-name))
    )`,
    )
    .setMeta({
      chainId: process.env.CHAIN_ID,
    })
    .addData('ns-keyset', {
      keys: [getWebAuthnPubkeyFormat(publicKey), tempPublicKey],
      pred: 'keys-any',
    })
    .addSigner(tempPublicKey)
    .setNetworkId(networkId)
    .createTransaction();
  const res = await l1Client.local(tx, {
    preflight: false,
    signatureVerification: false,
  });
  if (res.result.status !== 'success')
    throw new Error('Cannot retrieve account name');
  return res.result.data as string;
};

const getAccountNameLegacy = async (
  publicKey: string,
  networkId: string,
): Promise<string> =>
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
        chainId: process.env.CHAIN_ID,
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

export const registerAccountsOnChain = async ({
  accountName,
  color,
  deviceType,
  domain,
  credentialId,
  credentialPubkey,
  networkId,
  chainId = process.env.CHAIN_ID,
}: Omit<AccountRegistration, 'alias'>): Promise<ITransactionDescriptor[]> => {
  return [
    await registerAccountOnChainLegacy({
      accountName,
      color,
      deviceType,
      domain,
      credentialId,
      credentialPubkey,
      networkId,
      chainId,
    }),
  ];
};
export const registerRAccounts = async ({
  accountName,
  color,
  deviceType,
  domain,
  credentialId,
  credentialPubkey,
  networkId,
  publicKey,
  secretKey,
}: Omit<AccountRegistration, 'alias'> & {
  publicKey: string;
  secretKey: string;
}) => {
  const txDescriptions = await Promise.all(
    Array(20)
      .fill(1)
      .map((_, i) =>
        registerRAccountOnChain({
          accountName,
          color,
          deviceType,
          domain,
          credentialId,
          credentialPubkey,
          networkId,
          chainId: i.toString() as ChainId,
          publicKey,
          secretKey,
        }),
      ),
  );
  return txDescriptions; // now can be registered on the account txQueue
};

export const registerRAccountOnChain = async ({
  color,
  deviceType,
  domain,
  credentialId,
  credentialPubkey,
  networkId,
  publicKey,
  secretKey,
  chainId = process.env.CHAIN_ID,
}: Omit<AccountRegistration, 'alias'> & {
  publicKey: string;
  secretKey: string;
}): Promise<ITransactionDescriptor> => {
  const tx = createTransactionBuilder()
    .execution(
      `
    (let* (
      (ns-name (ns.create-principal-namespace (read-keyset 'ns-keyset)))
      (ks-ref-name (format "{}.{}" [ns-name 'spirekey-keyset]))
    )
      (define-namespace
        ns-name
        (read-keyset 'ns-keyset )
        (read-keyset 'ns-keyset )
      )
      (namespace ns-name)
      (define-keyset ks-ref-name
        (read-keyset 'ns-keyset)
      )
      (let (
        (account (create-principal (keyset-ref-guard ks-ref-name)))
      )
        (coin.create-account
          account
          (keyset-ref-guard ks-ref-name)
        )
        (${process.env.NAMESPACE}.spirekey.add-device-pair
          account
          coin
          { 'guard : (read-keyset 'ns-keyset)
          , 'credential-id : "${credentialId}"
          , 'hostname : "${domain}"
          , 'device-type : "${deviceType}"
          , 'color : "${color}"
          }
        )
      )
    ) 
  `,
    )
    .addData('ns-keyset', {
      keys: [getWebAuthnPubkeyFormat(credentialPubkey), publicKey],
      pred: 'keys-any',
    })
    // Sign unrestricted with the temp pubkey
    .addSigner({ pubKey: publicKey, scheme: 'ED25519' })
    .addSigner({ pubKey: genesisPubKey, scheme: 'ED25519' }, (withCap) => [
      withCap('coin.GAS'),
      withCap(
        `${process.env.NAMESPACE}.gas-station.GAS_PAYER`,
        gasStation,
        { int: 1 },
        1,
      ),
    ])
    .setMeta({
      chainId,
      gasLimit: 2000,
      gasPrice: 0.0000001,
      senderAccount: gasStation,
    })
    .setNetworkId(networkId)
    .createTransaction();
  const signedTx = [
    { publicKey, secretKey },
    { publicKey: genesisPubKey, secretKey: genesisPrivateKey },
  ].reduce((unsignedTx, keyPair) => {
    return addSignatures(
      unsignedTx,
      sign(unsignedTx.cmd, keyPair) as { sig: string },
    );
  }, tx) as ICommand;
  return await l1Client.submit(signedTx);
};
export const registerAccountOnChainLegacy = async ({
  accountName,
  color,
  deviceType,
  domain,
  credentialId,
  credentialPubkey,
  networkId,
  chainId = process.env.CHAIN_ID,
}: Omit<AccountRegistration, 'alias'>): Promise<ITransactionDescriptor> => {
  return l1Client.submit(
    await getRegisterCommand({
      accountName,
      color,
      deviceType,
      domain,
      credentialId,
      credentialPubkey,
      networkId,
      chainId,
    }),
  );
};
export const getRegisterCommand = async ({
  accountName,
  color,
  deviceType,
  domain,
  credentialId,
  credentialPubkey,
  networkId,
  chainId = process.env.CHAIN_ID,
}: Omit<AccountRegistration, 'alias'>): Promise<ICommand> => {
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
  chainId = process.env.CHAIN_ID,
}: {
  accountName: string;
  color: string;
  deviceType: string;
  credentialId: string;
  credentialPubkey: string;
  domain: string;
  networkId: string;
  chainId?: ChainId;
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
