import {
  addSignatures,
  createTransactionBuilder,
  ICommand,
  type ChainId,
  type ITransactionDescriptor,
} from '@kadena/client';

import type { AccountRegistration } from '@/context/AccountsContext';
import {
  gasStation,
  genesisPrivateKey,
  genesisPubKey,
} from '@/utils/constants';
import { l1Client } from '@/utils/shared/client';
import { sign } from '@kadena/cryptography-utils';
import { Guard } from '@kadena/spirekey-types';

export const getAccountName = async (
  publicKey: string,
  networkId: string,
): Promise<string> => {
  return '';
};
type RAccountInfo = { name: string; guard: Guard };
export const getRAccountName = async (
  publicKey: string,
  tempPublicKey: string,
  networkId: string,
): Promise<RAccountInfo> => {
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
      { 'name  : (create-principal (keyset-ref-guard ks-ref-name))
      , 'guard : (keyset-ref-guard ks-ref-name)
      }
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
  return res.result.data as RAccountInfo;
};

export const registerCredentialOnChain = async ({
  domain,
  pubkey,
  credentialId,
  chainId,
  networkId,
}: {
  domain: string;
  pubkey: string;
  credentialId: string;
  chainId: ChainId;
  networkId: string;
}) => {
  const tx = createTransactionBuilder()
    .execution(
      `(${process.env.NAMESPACE}.spirekey.register-credential "${credentialId}" "${pubkey}" "${domain}")`,
    )
    .setMeta({ chainId, senderAccount: gasStation, gasLimit: 1800 })
    .setNetworkId(networkId)
    .addSigner(genesisPubKey, (withCap) => [
      withCap(
        `${process.env.NAMESPACE}.spirekey.GAS_PAYER`,
        gasStation,
        { int: 1 },
        1,
      ),
    ])
    .createTransaction();
  const signedTx = addSignatures(
    tx,
    sign(tx.cmd, {
      publicKey: genesisPubKey,
      secretKey: genesisPrivateKey,
    }) as { sig: string },
  );
  return await l1Client.submit(signedTx as ICommand);
};

export const registerAccountsOnChain = async ({}: Omit<
  AccountRegistration,
  'alias'
>): Promise<ITransactionDescriptor[]> => {
  return [];
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
          { 'guard          :  (read-keyset 'spirekey-keyset)
          , 'credential-id  :  "${credentialId}"
          , 'domain         :  "${domain}"
          , 'device-type    :  "${deviceType}"
          , 'color          :  "${color}"
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
    .addData('spirekey-keyset', {
      keys: [getWebAuthnPubkeyFormat(credentialPubkey)],
      pred: 'keys-any',
    })
    // Sign unrestricted with the temp pubkey
    .addSigner({ pubKey: publicKey, scheme: 'ED25519' })
    .addSigner({ pubKey: genesisPubKey, scheme: 'ED25519' }, (withCap) => [
      withCap('coin.GAS'),
      withCap(
        `${process.env.NAMESPACE}.spirekey.GAS_PAYER`,
        gasStation,
        { int: 1 },
        1,
      ),
    ])
    .setMeta({
      chainId,
      gasLimit: 1800,
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
export const getWebAuthnPubkeyFormat = (pubkey: string) => {
  if (/^WEBAUTHN-/.test(pubkey)) return pubkey;
  return `WEBAUTHN-${pubkey}`;
};
