import { useAccounts } from '@/resolvers/accounts';
import { useAddDevice } from '@/resolvers/add-device';
import { Button, Stack } from '@kadena/kode-ui';

export const AddDevice = ({ accountName }: { accountName?: string }) => {
  const { accounts, loading } = useAccounts();
  const { addDevice } = useAddDevice();
  const account = accounts?.find((a) => a.accountName === accountName);
  if (!account) return null;
  return (
    <Stack flexDirection="column">
      <Button
        onPress={() => addDevice(account.networkId, account.accountName)}
        isDisabled={loading || !account}
      >
        Add device
      </Button>
    </Stack>
  );
};
