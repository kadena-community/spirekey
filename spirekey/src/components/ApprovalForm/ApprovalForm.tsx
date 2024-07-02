'use client';

import { useAccounts } from '@/context/AccountsContext';
import { useNotifications } from '@/context/shared/NotificationsContext';
import { getDeviceIcon } from '@/utils/getDeviceIcon';
import {
  objectParameterValue,
  searchParamsToString,
} from '@/utils/searchParameters';
import { l1Client } from '@/utils/shared/client';
import { submitTransaction } from '@/utils/submitTransaction';
import { updateAccount } from '@/utils/updateAccount';
import { ChainId, ICommand } from '@kadena/client';
import {
  Box,
  Button,
  Heading,
  ProgressCircle,
  Stack,
  TextField,
} from '@kadena/react-ui';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SurfaceCard } from '../SurfaceCard/SurfaceCard';
import * as styles from './ApprovalForm.css';

export default function ApprovalForm() {
  const router = useRouter();
  const { addNotification } = useNotifications();
  const { caccount } = useParams();
  const searchParams = useSearchParams();
  const transaction = searchParams.get('transaction');
  const accountName = decodeURIComponent(String(caccount));
  const { accounts } = useAccounts();
  const account = accounts.find((a) => a.accountName === accountName);

  const defaultValues = {
    minApprovals: account?.minApprovals || '1',
    minRegistrationApprovals: account?.minRegistrationApprovals || '1',
    publicKey: account?.devices[0].guard.keys[0] || '',
  };

  type FormValues = typeof defaultValues;

  const { handleSubmit, register, setValue, getValues, watch } =
    useForm<FormValues>({
      defaultValues,
      reValidateMode: 'onChange',
    });

  const selectedPublicKey = watch('publicKey');

  const onSubmit = async (data: FormValues) => {
    if (!account) {
      addNotification({
        variant: 'error',
        title: 'Failed to update account',
      });
      return;
    }

    const transaction = await updateAccount({
      ...account,
      minApprovals: Number(data.minApprovals),
      minRegistrationApprovals: Number(data.minRegistrationApprovals),
      publicKey: selectedPublicKey,
      chainId: process.env.CHAIN_ID,
    });

    router.push(
      `/sign?${searchParamsToString({
        transaction: objectParameterValue(transaction),
        returnUrl: window.location.href,
      })}`,
    );
  };

  useEffect(() => {
    if (!transaction) {
      return;
    }

    const doTransaction = async (signedTransaction: ICommand) => {
      try {
        const transactionDescriptor =
          await submitTransaction(signedTransaction);
        const { result } = await l1Client.pollOne(transactionDescriptor);
        if (result.status === 'success') {
          addNotification({
            variant: 'success',
            title: 'Successfully updated account',
          });
        } else {
          addNotification({
            variant: 'error',
            title: 'Failed to update account',
            message: JSON.stringify(result.error),
          });
        }
      } catch (error: unknown) {
        addNotification({
          variant: 'error',
          title: 'Failed to update account',
          message: error instanceof Error ? error.message : 'Unknown error',
        });
      } finally {
        router.push(window.location.href.split('?')[0]);
      }
    };

    const signedTransaction = JSON.parse(
      Buffer.from(transaction, 'base64').toString(),
    );

    doTransaction(signedTransaction);
  }, [transaction]);

  return (
    <>
      {!!transaction && (
        <Stack flexDirection="column" gap="md" padding="md">
          <SurfaceCard
            title="Updating your account"
            description="Submitting the transaction to the blockchain."
          >
            <Stack
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              gap="xs"
            >
              <ProgressCircle
                color="inherit"
                isIndeterminate
                label="Progress"
                maxValue={100}
                minValue={0}
                size="md"
                value={25}
              />
            </Stack>
          </SurfaceCard>
        </Stack>
      )}
      {!transaction && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack flexDirection="column" gap="md">
            <TextField
              label="Minimum approvals"
              isRequired={true}
              defaultValue={defaultValues.minApprovals.toString()}
              {...register('minApprovals', {
                min: 1,
                max: account?.devices.length || 1,
              })}
            />
            <TextField
              label="Minimum registration approvals"
              isRequired={true}
              defaultValue={defaultValues.minRegistrationApprovals.toString()}
              {...register('minRegistrationApprovals', {
                min: 1,
                max: account?.devices.length || 1,
              })}
            />
            <Heading variant="h6" as="h3">
              Select a device to sign with
            </Heading>
            <Stack gap="md" flexDirection="row">
              {account?.devices.map((device) => {
                const publicKey = device.guard.keys[0];
                return (
                  <Fragment key={publicKey}>
                    <input
                      className={styles.input}
                      {...register('publicKey', {
                        onChange: (event): void => {
                          setValue('publicKey', event.target.value);
                        },
                        required: 'Please select a device',
                      })}
                      type="radio"
                      value={publicKey}
                      id={`public-key-${publicKey}`}
                    />
                    <label
                      htmlFor={`public-key-${publicKey}`}
                      aria-label={publicKey}
                    >
                      <Box
                        className={classNames(
                          styles.device,
                          {
                            selected: selectedPublicKey === publicKey,
                          },
                          styles.backgroundColors[device.color],
                        )}
                      >
                        {getDeviceIcon(device.deviceType)}
                        {selectedPublicKey === publicKey && (
                          <AnimatePresence>
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.1 }}
                              className={styles.selected}
                            />
                          </AnimatePresence>
                        )}
                      </Box>
                    </label>
                  </Fragment>
                );
              })}
            </Stack>
            <Button type="submit">Update</Button>
          </Stack>
        </form>
      )}
    </>
  );
}
