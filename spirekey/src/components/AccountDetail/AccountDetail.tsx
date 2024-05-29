import { useAccounts } from '@/context/AccountsContext';
import { useNotifications } from '@/context/shared/NotificationsContext';
import { calculateBalancePercentage } from '@/utils/balance';
import { Box, GridItem, Heading, Link, Stack } from '@kadena/react-ui';
import AliasForm from '../AliasForm/AliasForm';
import ApprovalForm from '../ApprovalForm/ApprovalForm';
import DeviceCard from '../Card/DeviceCard';
import DeviceCircle from '../Device/DeviceCircle';
import { Plus } from '../icons/Plus';

interface Props {
  accountName: string;
}

export function AccountDetail({ accountName }: Props) {
  const { accounts } = useAccounts();
  const { addNotification } = useNotifications();
  const account = accounts.find((a) => a.accountName === accountName);
  const device = account?.devices[0];
  const encodedAccountName = encodeURIComponent(accountName);

  if (!device) {
    addNotification({
      variant: 'error',
      title: 'Account has no devices',
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
        />
      </Box>
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
    </Stack>
  );
}
