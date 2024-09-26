'use client';

import { defaultSteps } from '@/components/OnBoarding/components/OnBoardingStepper/OnBoardingStepper';
import { FLOWTYPE } from '@/components/OnBoarding/components/OnBoardingStepper/utils';
import { KeyPair } from '@/hooks/useRegistration';
import { Account } from '@kadena/spirekey-types';
import React, { useEffect, useState } from 'react';
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
  handleRecoverAccount,
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
  handleRecoverAccount: () => void;
  onComplete: () => void;
}) => {
  const [isAnimationFinished, setAnimationFinished] = useState(false);

  const [flowType, setFlowType] = useState<keyof typeof FLOWTYPE | undefined>(
    undefined,
  );

  const steps = defaultSteps;
  if (flowType === FLOWTYPE.CREATE) {
    steps[0] = 'Create';
    steps[1] = 'Add Account';
  }
  if (flowType === FLOWTYPE.IMPORT) {
    steps[0] = 'Wallet';
    steps[1] = 'Account';
  }

  useEffect(() => {
    if (account && isAnimationFinished) {
      onComplete();
    }
  }, [account, isAnimationFinished]);
  if (account && isAnimationFinished) return null;

  if (keypair)
    return (
      <KeypairStep
        steps={steps}
        setAnimationFinished={setAnimationFinished}
        succesfulAuthentication={succesfulAuthentication}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        onImport={handleRecoverAccount}
        onCancel={onCancel}
      />
    );
  return (
    <ConnectWalletStep
      steps={steps}
      setFlowType={setFlowType}
      onHandleRegisterWallet={onHandleRegisterWallet}
      onHandleConnectWallet={onHandleConnectWallet}
      networkId={networkId}
    />
  );
};
