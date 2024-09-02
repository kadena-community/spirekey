import { AccountRegistration, useAccounts } from '@/context/AccountsContext';
import { useNotifications } from '@/context/shared/NotificationsContext';
import { useCredentials } from '@/resolvers/wallets';
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
import { useState } from 'react';
import { useReturnUrl } from './shared/useReturnUrl';

export type KeyPair = { publicKey: string; secretKey: string };
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

  const { getCredentials } = useCredentials();

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
      const recoveredKey = await getCredentials(networkId);
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
