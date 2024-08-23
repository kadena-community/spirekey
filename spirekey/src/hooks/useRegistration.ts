import { AccountRegistration, useAccounts } from '@/context/AccountsContext';
import { useNotifications } from '@/context/shared/NotificationsContext';
import { deviceColors } from '@/styles/shared/tokens.css';
import { countWithPrefixOnDomain } from '@/utils/countAccounts';
import {
  getNetworkDisplayName,
  getRootkeyPasskeyName,
} from '@/utils/getNetworkDisplayName';
import {
  getRAccountName,
  getWebAuthnPubkeyFormat,
  registerCredentialOnChain,
  registerRAccounts,
} from '@/utils/register';
import { getNewWebauthnKey } from '@/utils/webauthnKey';
import {
  kadenaDecrypt,
  kadenaEncrypt,
  kadenaGenKeypairFromSeed,
} from '@kadena/hd-wallet';
import { Account } from '@kadena/spirekey-types';
import { ChainId } from '@kadena/types';
import {
  base64URLStringToBuffer,
  startAuthentication,
} from '@simplewebauthn/browser';
import elliptic from 'elliptic';
import { useState } from 'react';
import { gql } from 'urql';
import { useReturnUrl } from './shared/useReturnUrl';
import { query } from './useQuery';

export type KeyPair = { publicKey: string; secretKey: string };
const getCredentialsQuery = gql`
query getCredentials($filter: String) {
  events(
    qualifiedEventName: "${process.env.NAMESPACE}.spirekey.REGISTER_CREDENTIAL"
    parametersFilter: $filter
    first: 1
  ) {
    totalCount
    edges {
      cursor
      node {
        chainId
        parameters
      }
    }
  }
}
`;
export const getCredentials = async (
  networkId: string,
  credentialId: string,
  domain: string,
) => {
  const res = await query(networkId, getCredentialsQuery, {
    filter: `{\"array_contains\": [\"${credentialId}\", \"${domain}\"]}`,
  });
  const edges = res.data?.events?.edges;
  if (!edges.length) throw new Error('No credentials found');
  return edges.map((e: any) => {
    const [, c] = JSON.parse(e?.node?.parameters);
    return c;
  });
};

export const registerNewDevice =
  (onPasskeyRetrieved: (account: Account) => void) =>
  async ({
    alias,
    networkId,
    chainId,
    color,
    domain,
    keypair,
  }: Omit<
    AccountRegistration,
    'accountName' | 'credentialPubkey' | 'deviceType' | 'credentialId'
  > & { keypair?: KeyPair }): Promise<void> => {
    const { publicKey, deviceType, credentialId } =
      await getNewWebauthnKey(alias);
    const account = {
      networkId,
      credentialId,
      deviceType,
      chainId,
      alias,
      color,
      domain,
      credentialPubkey: publicKey,
    };
    if (!keypair) throw new Error('No keypair provided');
    const { name: accountName, guard } = await getRAccountName(
      publicKey,
      keypair.publicKey,
      networkId,
    );
    const pendingTxs = await registerRAccounts({
      ...account,
      accountName,
      publicKey: keypair.publicKey,
      secretKey: keypair.secretKey,
    });
    onPasskeyRetrieved({
      accountName,
      guard,
      networkId,
      balance: '0.0',
      alias,
      chainIds: Array(20)
        .fill(1)
        .map((_, i) => i.toString()) as ChainId[],
      minApprovals: 1,
      minRegistrationApprovals: 1,
      devices: [
        {
          color,
          deviceType,
          domain,
          guard: {
            keys: [getWebAuthnPubkeyFormat(publicKey)],
            pred: 'keys-any',
          },
          'credential-id': credentialId,
        },
      ],
      txQueue: pendingTxs,
    });
  };

type UseRegistration = {
  chainId?: ChainId;
  networkId: string;
};
function i2hex(i: number) {
  return ('0' + i.toString(16)).slice(-2);
}

const getPubkeyFromPasskey = async (networkId: string) => {
  const { response, id } = await startAuthentication({
    rpId: window.location.hostname,
    challenge: 'reconnectwallet',
  });
  const usignature = new Uint8Array(
    base64URLStringToBuffer(response.signature),
  );
  const rStart = usignature[4] === 0 ? 5 : 4;
  const rEnd = rStart + 32;
  const sStart = usignature[rEnd + 2] === 0 ? rEnd + 3 : rEnd + 2;
  const r = usignature.slice(rStart, rEnd);
  const s = usignature.slice(sStart);

  const ec = new elliptic.ec('p256');

  const rBigInt = BigInt('0x' + hex(r));
  const sBigInt = BigInt('0x' + hex(s));

  const sig = { r: rBigInt.toString(16), s: sBigInt.toString(16) };

  const concatenatedData = concatenateData(
    base64URLStringToBuffer(response.authenticatorData),
    await sha256(base64URLStringToBuffer(response.clientDataJSON)),
  );
  const messageHash = new Uint8Array(await sha256(concatenatedData));

  const foundKeys = await getCredentials(
    networkId,
    id,
    window.location.hostname,
  );
  const recoveredKeys = await Promise.all(
    [
      ec.recoverPubKey(messageHash, sig, 0),
      ec.recoverPubKey(messageHash, sig, 1),
    ].map(async (p) => {
      const tempPassword = crypto.getRandomValues(new Uint16Array(32));
      const [pubKey, privateKey] = await kadenaGenKeypairFromSeed(
        tempPassword,
        await kadenaEncrypt(
          tempPassword,
          await crypto.subtle.digest(
            'sha-512',
            Buffer.from(p.encode('hex', false)),
          ),
        ),
        0,
      );
      const secretBin = await kadenaDecrypt(tempPassword, privateKey);
      return {
        publicKey: pubKey,
        secretKey: Buffer.from(secretBin).toString('hex'),
      };
    }),
  );
  const recoveredKey = recoveredKeys.find(({ publicKey }) =>
    foundKeys.includes(publicKey),
  );
  if (!recoveredKey) throw new Error('No public key could be recovered');
  return recoveredKey;
};

export const hex = (bytes: Uint8Array) => Array.from(bytes).map(i2hex).join('');
async function sha256(clientDataJSON: ArrayBuffer) {
  return await window.crypto.subtle.digest('SHA-256', clientDataJSON);
}
function concatenateData(
  authenticatorData: ArrayBuffer,
  clientDataHash: ArrayBuffer,
) {
  const concatenated = new Uint8Array(
    authenticatorData.byteLength + clientDataHash.byteLength,
  );
  concatenated.set(new Uint8Array(authenticatorData), 0);
  concatenated.set(
    new Uint8Array(clientDataHash),
    authenticatorData.byteLength,
  );
  return concatenated;
}
export const useRegistration = ({ chainId, networkId }: UseRegistration) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [allowRedirect, setAllowRedirect] = useState<boolean>(false);
  const [currentAccountName, setCurrentAccountName] = useState<string>('');
  const [succesfulAuthentication, setSuccesfulAuthentication] =
    useState<boolean>(false);
  const [account, setCurrentAccount] = useState<Account>();
  const [keypair, setKeypair] = useState<KeyPair>();

  const { accounts, setAccount } = useAccounts();
  const { host } = useReturnUrl();
  const { addNotification } = useNotifications();

  const accountPrefix = 'SpireKey Account';

  const numberOfSpireKeyAccounts = countWithPrefixOnDomain(
    accounts,
    accountPrefix,
    host,
    currentAccountName,
  );

  const alias = `${accountPrefix} ${numberOfSpireKeyAccounts + 1}`;
  const color = deviceColors.purple;

  const handleConnectWallet = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const recoveredKey = await getPubkeyFromPasskey(networkId);
      setKeypair(recoveredKey);
    } catch (e) {
      addNotification({
        title: 'Error unlocking wallet',
        message: 'Could not unlock Wallet using the provided Passkey',
        variant: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleRegisterWallet = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const { credentialId, hex } = await getNewWebauthnKey(
        getRootkeyPasskeyName(networkId!),
      );
      const tempPassword = crypto.getRandomValues(new Uint16Array(32));
      const [pubKey, privateKey] = await kadenaGenKeypairFromSeed(
        tempPassword,
        await kadenaEncrypt(
          tempPassword,
          await crypto.subtle.digest('sha-512', Buffer.from(hex)),
        ),
        0,
      );

      await registerCredentialOnChain({
        networkId: networkId!,
        chainId: chainId!,
        credentialId,
        pubkey: pubKey,
        domain: window.location.hostname,
      });
      const decrypted = await kadenaDecrypt(tempPassword, privateKey);
      setKeypair({
        publicKey: pubKey,
        secretKey: Buffer.from(decrypted).toString('hex'),
      });
    } catch (e) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await registerNewDevice((account) => {
        setSuccesfulAuthentication(true);
        setAccount(account);
        setCurrentAccount(account);
        setCurrentAccountName(account.accountName);
        setAllowRedirect(true);
      })({
        alias: `${alias} (${getNetworkDisplayName(networkId)})`,
        domain: host,
        color,
        chainId,
        networkId,
        keypair,
      });
    } catch (error: any) {
      addNotification({
        variant: 'error',
        title: 'Could not create an account',
        message: error?.message || 'Please try again later...',
        timeout: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    allowRedirect,
    isSubmitting,
    succesfulAuthentication,
    handleSubmit,
    handleRegisterWallet,
    handleConnectWallet,
    keypair,
    account,
  };
};
