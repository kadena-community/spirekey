'use client';

import {
  Button,
  Grid,
  Heading,
  NumberField,
  Stack,
  Text,
  TextField,
} from '@kadena/react-ui';
import { useParams, useRouter } from 'next/navigation';

import { useAccounts } from '@/context/AccountsContext';
import { useNotifications } from '@/context/shared/NotificationsContext';

import {
  objectParameterValue,
  searchParamsToString,
} from '@/utils/searchParameters';
import { updateAccount } from '@/utils/updateAccount';
import { Account } from '@kadena-spirekey/types';
import { SpireKeyKdacolorLogoGreen } from '@kadena/react-icons/product';
import { MonoAdd, MonoCheck, MonoRemove } from '@kadena/react-icons/system';
import { useForm } from 'react-hook-form';
import AliasForm from '../AliasForm/AliasForm';
import ApprovalForm from '../ApprovalForm/ApprovalForm';
import DeviceCircle from '../Device/DeviceCircle';
import { LayoutSurface } from '../LayoutSurface/LayoutSurface';
import * as styles from './AccountDetail.css';

export default function AccountDetail() {
  const { accounts, setAccount } = useAccounts();
  const params = useParams();
  const { addNotification } = useNotifications();
  const router = useRouter();

  const accountName = decodeURIComponent(params.caccount.toString());
  const account = accounts.find((a) => a.accountName === accountName);
  const device = account?.devices[0];
  const encodedAccountName = encodeURIComponent(accountName);

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
    <LayoutSurface title="Account" subtitle="details">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack flexDirection="column" gap="md">
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

          <Stack flexDirection="row" gap="md">
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

          <Stack flexDirection="row" className={styles.buttons}>
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Stack>
        </Stack>
      </form>
    </LayoutSurface>
  );
}

/* <Stack flexDirection="column" gap="md">
      <Stack
        flexDirection="row"
        paddingInline="lg"
        justifyContent="space-between"
      >
        <Heading variant="h6" as="h2">
          Devices
        </Heading>
        <Link href={`/accounts/${encodedAccountName}/devices/add`}>
          <Plus />
        </Link>
      </Stack>
      <Stack flexDirection="row" paddingInline="lg" marginBlockEnd="lg">
        {account.devices.map((device) => {
          const credentialId = device['credential-id'];
          return (
            <GridItem key={credentialId}>
              <Link
                href={`/accounts/${encodedAccountName}/devices/${credentialId}`}
              >
                <DeviceCircle device={device} />
              </Link>
            </GridItem>
          );
        })}
      </Stack>
      <Stack
        flexDirection="row"
        paddingInline="lg"
        marginBlockEnd="lg"
        width="100%"
      >
        <AliasForm />
      </Stack>
      <Stack
        flexDirection="row"
        paddingInline="lg"
        marginBlockEnd="lg"
        width="100%"
      >
        <ApprovalForm />
      </Stack>
    </Stack> */
