import { useAccounts } from '@/context/AccountsContext';
import { useNavigation } from '@/context/NavigationContext';
import { useNotifications } from '@/context/shared/NotificationsContext';
import { calculateBalancePercentage } from '@/utils/balance';
import { Box, GridItem, Heading, Link, Stack } from '@kadena/react-ui';
import { useEffect } from 'react';
import { AccountDetails } from '../AccountDetails/AccountDetails';
import AliasForm from '../AliasForm/AliasForm';
import ApprovalForm from '../ApprovalForm/ApprovalForm';
import DeviceCard from '../Card/DeviceCard';
import AddDeviceCircle from '../Device/AddDeviceCircle';
import DeviceCircle from '../Device/DeviceCircle';

interface Props {
  accountName: string;
}

export function AccountSettings({ accountName }: Props) {
  const { accounts } = useAccounts();
  const { addNotification } = useNotifications();
  const { updateContextMenuItems } = useNavigation();
  const account = accounts.find((a) => a.accountName === accountName);
  const device = account?.devices[0];
  const encodedAccountName = encodeURIComponent(accountName);
  const urlPrefix = `/accounts/${encodeURIComponent(accountName)}`;

  const contextMenuItems = [
    { href: `${urlPrefix}/settings`, text: 'Settings' },
    { href: `${urlPrefix}/send`, text: 'Send' },
    { href: `${urlPrefix}/receive`, text: 'Receive' },
    { href: `${urlPrefix}/devices/add`, text: 'Add device' },
  ];

  if (account?.networkId !== 'mainnet01') {
    contextMenuItems.push({ href: `/fund`, text: 'Fund' });
  }

  useEffect(() => {
    updateContextMenuItems(contextMenuItems);
  }, [updateContextMenuItems, contextMenuItems]);

  if (!device) {
    addNotification({
      variant: 'error',
      title: 'Account has no devices',
    });
    return <></>;
  }

  return (
    <Stack flexDirection="column" gap="md" alignItems="center">
      <Heading variant="h2">Account alias</Heading>
      <Stack marginBlockEnd="lg" width="100%" justifyContent="center">
        <AliasForm />
      </Stack>
      <Heading variant="h2">Approvals</Heading>
      <Stack marginBlockEnd="lg" width="100%" justifyContent="center">
        <ApprovalForm />
      </Stack>
    </Stack>
  );
}
