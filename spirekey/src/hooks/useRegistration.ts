import { useNotifications } from '@/context/shared/NotificationsContext';
import { useAccount, useAccounts } from '@/resolvers/accounts';
import { useCredentials } from '@/resolvers/connect-wallet';
import { useCreateAccount } from '@/resolvers/create-account';
import { useWallet } from '@/resolvers/create-wallet';
import { deviceColors } from '@/styles/shared/tokens.css';
import { countWithPrefixOnDomain } from '@/utils/countAccounts';
import { Account } from '@kadena/spirekey-types';
import { ChainId } from '@kadena/types';
import { useState } from 'react';
import { useReturnUrl } from './shared/useReturnUrl';

export type KeyPair = { publicKey: string; secretKey: string };

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

  const { accounts } = useAccounts();
  const { setAccount } = useAccount();
  const { host } = useReturnUrl();
  const { addNotification } = useNotifications();

  const { getCredentials } = useCredentials();
  const { createWallet } = useWallet();
  const { createAccount } = useCreateAccount();

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
    } catch (_) {
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
      const keypair = await createWallet(networkId, chainId!);
      setKeypair(keypair);
    } catch (_) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (!keypair) throw new Error('No wallet available');
    try {
      const account = await createAccount({
        domain: host,
        color,
        alias,
        networkId,
        publicKey: keypair.publicKey,
        secretKey: keypair.secretKey,
      });
      setSuccesfulAuthentication(true);
      setAccount(account);
      setCurrentAccount(account);
      setCurrentAccountName(account.accountName);
      setAllowRedirect(true);
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
