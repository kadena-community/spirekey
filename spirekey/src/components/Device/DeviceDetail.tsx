import { useAccounts } from '@/context/AccountsContext';
import { useNotifications } from '@/context/shared/NotificationsContext';
import { calculateBalancePercentage } from '@/utils/balance';
import { Box, Stack } from '@kadena/kode-ui';
import DeviceCard from '../Card/DeviceCard';

interface Props {
  accountName: string;
  credentialId: string;
}

export function DeviceDetail({ accountName, credentialId }: Props) {
  const { accounts } = useAccounts();
  const { addNotification } = useNotifications();
  const account = accounts.find((a) => a.accountName === accountName);
  const device = account?.devices.find(
    (d) => d['credential-id'] === credentialId,
  );

  if (!device || !account) {
    addNotification({
      variant: 'error',
      title: 'Device not found',
    });
    return <></>;
  }

  return (
    <Stack flexDirection="column" gap="md">
      <Box width="100%" paddingInline="lg" marginBlockEnd="lg">
        <DeviceCard
          color={device.color}
          account={account}
          device={device}
          balancePercentage={calculateBalancePercentage(account, accounts)}
          showSingleIcon={true}
        />
      </Box>
    </Stack>
  );
}
