'use client';

import { MonoCheck } from '@kadena/kode-icons/system';
import { Button, NumberField, Stack, TextField } from '@kadena/kode-ui';
import type { Account } from '@kadena/spirekey-types';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { useAccounts } from '@/context/AccountsContext';
import { useNotifications } from '@/context/shared/NotificationsContext';
import {
  objectParameterValue,
  searchParamsToString,
} from '@/utils/searchParameters';
import { updateAccount } from '@/utils/updateAccount';

import {
  CardContainer,
  CardFooter,
  SpireKeyCardContentBlock,
} from '../CardPattern/CardPattern';

interface Props {
  accountName: string;
}

export default function AccountDetail({ accountName }: Props) {
  const { accounts, setAccount } = useAccounts();
  const params = useParams();
  const { addNotification } = useNotifications();
  const router = useRouter();

  const account = accounts.find((a) => a.accountName === accountName);
  const device = account?.devices[0];

  const defaultValues = {
    alias: account?.alias,
    minApprovals: account?.minApprovals,
    minRegistrationApprovals: account?.minRegistrationApprovals,
  };

  type FormValues = typeof defaultValues;

  const { handleSubmit, register, watch } = useForm<FormValues>({
    defaultValues,
    reValidateMode: 'onChange',
  });

  const alias = watch('alias') || '';

  const handleCancel = () => {
    router.push(`/`);
  };

  const updateAlias = async (
    alias: Account['alias'],
    aliasUpdateOnly = true,
  ) => {
    setAccount({ ...account!, alias });

    if (aliasUpdateOnly) {
      addNotification({
        variant: 'success',
        title: 'Successfully updated account alias',
      });
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (!account) {
      addNotification({
        variant: 'error',
        title: 'Failed to update account',
      });
      return;
    }

    updateAlias(data.alias || '');

    const transaction = await updateAccount({
      ...account,
      minApprovals: Number(data.minApprovals),
      minRegistrationApprovals: Number(data.minRegistrationApprovals),
      publicKey: '',
      chainId: process.env.CHAIN_ID,
    });

    router.push(
      `/sign?${searchParamsToString({
        transaction: objectParameterValue(transaction),
        returnUrl: window.location.href,
      })}`,
    );
  };

  if (!account) {
    router.replace('/');
    return null;
  }

  if (!device) {
    addNotification({
      variant: 'error',
      title: 'Account has no devices',
    });
    return null;
  }

  return (
    <CardContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SpireKeyCardContentBlock title="Account" description="details">
          <TextField
            info="Only stored locally"
            label="Account alias"
            endAddon={
              <Button
                variant="transparent"
                endVisual={<MonoCheck />}
                onClick={() => updateAlias(alias, true)}
              >
                Save
              </Button>
            }
            defaultValue={defaultValues.alias}
            {...register('alias')}
          />

          <Stack flexDirection="row" gap="md" marginBlockStart="md">
            <NumberField
              label="Approvals"
              description="Minimum"
              defaultValue={defaultValues.minApprovals}
              {...register('minApprovals', {
                min: 1,
                max: account?.devices.length || 1,
              })}
            />
            <NumberField
              label="Registration approvals"
              description="Minimum"
              defaultValue={defaultValues.minRegistrationApprovals}
              {...register('minRegistrationApprovals', {
                min: 1,
                max: account?.devices.length || 1,
              })}
            />
          </Stack>
        </SpireKeyCardContentBlock>
        <CardFooter>
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </CardFooter>
      </form>
    </CardContainer>
  );
}
