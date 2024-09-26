'use client';

import { useErrors } from '@/context/shared/ErrorContext/ErrorContext';
import { useNotifications } from '@/context/shared/NotificationsContext';
import { useCredentials } from '@/resolvers/connect-wallet';
import { signWithKeyPair } from '@/utils/signSubmitListen';
import { Button, Stack, Text } from '@kadena/kode-ui';
import { Account } from '@kadena/spirekey-types';
import { ICap, ICommand, IUnsignedCommand } from '@kadena/types';
import React, { FC, useEffect, useState } from 'react';
import { Step } from './Step';

type PlumbingTxStep = {
  title: string;
  caps: Map<string, ICap[]>;
  tx: IUnsignedCommand;
  signed?: boolean;
};
type SignPlumbingTxsProps = {
  account: Account;
  plumbingSteps: PlumbingTxStep[];
  credentialId?: string;
  onCompleted: (txs: ICommand[]) => void;
};

export const SignPlumbingTxs: FC<SignPlumbingTxsProps> = ({
  account,
  plumbingSteps,
  credentialId,
  onCompleted,
}) => {
  const [steps, setSteps] = useState(plumbingSteps);
  const { errorMessage, setErrorMessage } = useErrors();
  const { getCredentials } = useCredentials();
  const [networkId, setNetworkId] = useState<string>();
  const { addNotification } = useNotifications();

  useEffect(() => {
    const foundNetworkId = plumbingSteps.reduce((acc, { tx }) => {
      const { networkId } = JSON.parse(tx.cmd);
      if (!acc) return networkId;
      if (acc !== networkId) {
        throw new Error('Multiple network IDs found');
      }
      return networkId;
    }, null);
    if (foundNetworkId) setNetworkId(foundNetworkId);
    setSteps(plumbingSteps);
  }, [plumbingSteps.map((s) => s.tx.hash + s.caps.size).join(',') || '']);

  useEffect(() => {
    if (!credentialId) {
      addNotification({
        variant: 'error',
        title: 'No valid credentials found',
      });
      return;
    }
  }, [credentialId]);

  if (!credentialId)
    return (
      <Stack width="100%" justifyContent="center">
        <Text>No valid credentials found in this wallet to sign with</Text>
      </Stack>
    );

  if (!networkId) {
    return null;
  }

  return (
    <>
      {steps.map(({ title, caps, tx }) => (
        <Step key={tx.hash} title={title} caps={caps} tx={tx} />
      ))}
      <Stack gap="md" justifyContent="flex-end">
        <Button
          variant="primary"
          onPress={async () => {
            try {
              const newSteps = await Promise.all(
                steps.map(async ({ tx, ...step }) => {
                  const { publicKey, secretKey } =
                    await getCredentials(networkId);

                  if (!account.keyset?.keys.includes(publicKey)) {
                    addNotification({
                      variant: 'error',
                      title: 'Please migrate your account',
                      message:
                        'Your account was created before the support of mnemonic phrases. Please create a new account and transfer your funds.',
                    });

                    throw new Error(
                      'Your account was created before the support of mnemonic phrases',
                    );
                  }
                  const signedTx = signWithKeyPair({
                    publicKey,
                    secretKey,
                  })(tx);

                  return { ...step, tx: signedTx, signed: true };
                }),
              );
              setSteps(newSteps);
              onCompleted(newSteps.map(({ tx }) => tx) as ICommand[]);
            } catch (error: any) {
              setErrorMessage(error.message);
              console.error({ errorMessage: errorMessage, error });
            }
          }}
          isDisabled={steps.every((s) => s.signed)}
        >
          Sign
        </Button>
      </Stack>
    </>
  );
};
