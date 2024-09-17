'use client';

import { KeyPair } from '@/hooks/useRegistration';
import { Account } from '@kadena/spirekey-types';
import React, { useState } from 'react';
import { AccountStep } from './AccountStep';
import { ConnectWalletStep } from './ConnectWalletStep';
import { KeypairStep } from './KeypairStep';

export const RegisterComponent = ({
  account,
  keypair,
  isSubmitting,
  succesfulAuthentication,
  networkId,
  onCancel,
  onHandleRegisterWallet,
  onHandleConnectWallet,
  onSubmit,
  onComplete,
}: {
  account?: Account;
  keypair?: KeyPair;
  isSubmitting: boolean;
  succesfulAuthentication: boolean;
  networkId: string;
  onCancel: () => void;
  onHandleConnectWallet: () => void;
  onHandleRegisterWallet: () => void;
  onSubmit: () => void;
  onComplete: () => void;
}) => {
  const [isAnimationFinished, setAnimationFinished] = useState(false);

  if (account && isAnimationFinished)
    return (
      <AccountStep
        account={account}
        onCancel={onCancel}
        onComplete={onComplete}
      />
    );

  if (keypair)
    return (
      <KeypairStep
        setAnimationFinished={setAnimationFinished}
        succesfulAuthentication={succesfulAuthentication}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    );
  return (
    <ConnectWalletStep
      onHandleRegisterWallet={onHandleRegisterWallet}
      onHandleConnectWallet={onHandleConnectWallet}
      networkId={networkId}
    />
  );
};
