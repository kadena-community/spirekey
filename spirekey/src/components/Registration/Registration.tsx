'use client';

import { useRegistration } from '@/hooks/useRegistration';
import { getUser } from '@/utils/connect';
import type { ChainId } from '@kadena/client';
import { Account } from '@kadena/spirekey-types';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { RegisterComponent } from './components/RegisterComponent';

interface Props {
  redirectUrl?: string;
  networkId?: string;
  chainId?: ChainId;
  onComplete?: (account: Account) => void;
  onCancel?: () => void;
}

export default function Registration({
  redirectUrl,
  networkId = process.env.WALLET_NETWORK_ID,
  chainId,
  onComplete,
  onCancel,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const decodedRedirectUrl = decodeURI(redirectUrl || '');
  const cancelRedirectUrl = decodedRedirectUrl || '/welcome';
  const completeRedirectUrl = decodedRedirectUrl || '/';
  const handleCancel = () => {
    if (onCancel) return onCancel();
    router.push(cancelRedirectUrl);
  };
  const {
    account,
    keypair,
    handleRegisterWallet,
    handleConnectWallet,
    isSubmitting,
    succesfulAuthentication,
    handleSubmit,
  } = useRegistration({
    networkId,
    chainId,
  });

  const handleComplete = () => {
    if (!account) throw new Error('No user registered');
    if (onComplete) return onComplete(account);

    const user = Buffer.from(JSON.stringify(getUser(account))).toString(
      'base64',
    );

    console.log({ pathname });
    if (!pathname.includes('embedded')) {
      router.push(
        `/accounts/${account.accountName}/devices/${account.devices[0]['credential-id']}`,
      );
      return;
    }
    router.push(`${completeRedirectUrl}?${new URLSearchParams({ user })}`);
  };

  return (
    <RegisterComponent
      account={account}
      isSubmitting={isSubmitting}
      succesfulAuthentication={succesfulAuthentication}
      keypair={keypair}
      networkId={networkId}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
      onComplete={handleComplete}
      onHandleConnectWallet={handleConnectWallet}
      onHandleRegisterWallet={handleRegisterWallet}
    />
  );
}
