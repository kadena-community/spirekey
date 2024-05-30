'use client';

import { useAccounts } from '@/context/AccountsContext';
import { useNotifications } from '@/context/shared/NotificationsContext';
import { Button, Stack, TextField } from '@kadena/react-ui';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function AliasForm() {
  const { addNotification } = useNotifications();
  const { caccount } = useParams();
  const accountName = decodeURIComponent(String(caccount));
  const { accounts, setAccount } = useAccounts();
  const account = accounts.find((a) => a.accountName === accountName);

  const defaultValues = { alias: account?.alias };

  type FormValues = typeof defaultValues;

  const { handleSubmit, register } = useForm<FormValues>({
    defaultValues,
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: FormValues) => {
    if (!account) {
      addNotification({
        variant: 'error',
        title: 'Failed to update account',
      });
      return;
    }

    account.alias = data.alias || '';
    setAccount(account);

    addNotification({
      variant: 'success',
      title: 'Successfully updated account alias',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack flexDirection="column" gap="md">
        <TextField
          label="Alias"
          defaultValue={defaultValues.alias}
          {...register('alias')}
        />
        <Button type="submit">Update</Button>
      </Stack>
    </form>
  );
}
