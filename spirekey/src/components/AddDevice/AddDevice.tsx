import { useAccounts } from '@/resolvers/accounts';
import { useAddDevice } from '@/resolvers/add-device';
import { Button, Stack, TextareaField } from '@kadena/kode-ui';
import { useState } from 'react';

export const AddDevice = ({ accountName }: { accountName?: string }) => {
  const { accounts, loading } = useAccounts();
  const { getAddDeviceTxs } = useAddDevice();
  const [txs, setTxs] = useState();
  const account = accounts?.find((a) => a.accountName === accountName);
  if (!account) return null;
  return (
    <Stack flexDirection="column">
      <Button
        onPress={async () =>
          setTxs(await getAddDeviceTxs(account.networkId, account.accountName))
        }
        isDisabled={loading || !account}
      >
        Add device
      </Button>
      <TextareaField value={JSON.stringify(txs, null, 2)} />
    </Stack>
  );
};
