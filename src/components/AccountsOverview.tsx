'use client';

import { Account } from '@/context/AccountContext';
import { useAccounts } from '@/hooks/useAccounts';
import {
  Box,
  Card,
  Heading,
  ProductIcon,
  Stack,
  Table,
  Text,
} from '@kadena/react-ui';

type AccountOverviewProps = {
  account: Account;
};

const AccountOverview = ({ account }: AccountOverviewProps) => {
  return (
    <Card fullWidth>
      <Stack flexDirection="row" gap="md" margin="md">
        <Box flexShrink={0}>
          <ProductIcon.ManageKda />
        </Box>
        <Heading
          variant="h3"
          style={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {account.account}
        </Heading>
      </Stack>

      <Stack flexDirection="row" gap="md" margin="md">
        <Text bold>Balance</Text>
        <Text>{account.balance}</Text>
      </Stack>
      <Stack flexDirection="column" gap="md" margin="md">
        <Text bold>Devices</Text>
        <Table.Root striped>
          <Table.Head>
            <Table.Tr>
              <Table.Th>Device Displayname</Table.Th>
              <Table.Th>Domain</Table.Th>
              <Table.Th>Id</Table.Th>
            </Table.Tr>
          </Table.Head>
          <Table.Body>
            {account.devices.map((d) => {
              return (
                <Table.Tr>
                  <Table.Td>{d.name}</Table.Td>
                  <Table.Td>{d.domain}</Table.Td>
                  <Table.Td>{d['credential-id']}</Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Body>
        </Table.Root>
      </Stack>
    </Card>
  );
};

export const AccountsOverview = () => {
  const { accounts } = useAccounts();
  return (
    <>
      {accounts.map((a) => (
        <AccountOverview key={a.account} account={a} />
      ))}
    </>
  );
};
