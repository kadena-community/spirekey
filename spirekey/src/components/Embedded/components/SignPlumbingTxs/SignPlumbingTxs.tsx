'use client';

import { useErrors } from '@/context/shared/ErrorContext/ErrorContext';
import { useCredentials } from '@/resolvers/connect-wallet';
import { signWithKeyPair } from '@/utils/signSubmitListen';
import { Button, Stack, Text } from '@kadena/kode-ui';

import { useNotifications } from '@/context/shared/NotificationsContext';
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
  plumbingSteps: PlumbingTxStep[];
  credentialId?: string;
  onCompleted: (txs: ICommand[]) => void;
};

export const SignPlumbingTxs: FC<SignPlumbingTxsProps> = ({
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
    const foundNetworkId = plumbingSteps.reduce((foundNetworkId, { tx }) => {
      const { networkId } = JSON.parse(tx.cmd);
      if (!foundNetworkId) return networkId;
      if (foundNetworkId !== networkId) {
        throw new Error('Multiple network IDs found');
      }
      return networkId;
    }, null);
    if (foundNetworkId) {
      setNetworkId(foundNetworkId);
    } else {
      addNotification({
        variant: 'error',
        title: 'No network found',
      });
    }
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
              const { publicKey, secretKey } = await getCredentials(networkId);
              const newSteps = await Promise.all(
                steps.map(async ({ tx, ...step }) => {
                  const signedTx = signWithKeyPair({ publicKey, secretKey })(
                    tx,
                  );
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
