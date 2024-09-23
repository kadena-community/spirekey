import { useNotifications } from '@/context/shared/NotificationsContext';
import { getChainwebDataUrl } from '@/utils/getChainwebDataUrl';
import { getNetworkDisplayName } from '@/utils/getNetworkDisplayName';
import {
  Box,
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
  Text,
  maskValue,
} from '@kadena/kode-ui';
import { atoms } from '@kadena/kode-ui/styles';
import type { Account } from '@kadena/spirekey-types';
import { Heading } from 'react-aria-components';
import useSWR from 'swr';
import { amountCell } from './AccountDetails.css';
import { createExplorerLink } from './utils';

interface AccountDetailsProps {
  account: Account;
}

export function AccountDetails({ account }: AccountDetailsProps) {
  const { addNotification } = useNotifications();
  const domain = getChainwebDataUrl(account.networkId);

  if (!domain) {
    addNotification({
      variant: 'error',
      title: `The Chainweb Data URL is not configured for network: ${getNetworkDisplayName(account.networkId)}`,
    });
  }

  const { data } = useSWR(
    `${domain}/txs/account/${encodeURIComponent(account.accountName)}`,
    async (url: string) => {
      return await fetch(url).then((res) => res.json());
    },
  );

  if (!data?.length) {
    return <Heading>No Transactions</Heading>;
  }

  return (
    <Table isStriped className={atoms({ width: '100%' })}>
      <TableHeader>
        <Column>Account</Column>
        <Column>Date</Column>
        <Column>Amount</Column>
      </TableHeader>
      <TableBody>
        {data?.map((tx: any) => (
          <Row
            key={tx.requestKey + tx.idx}
            href={createExplorerLink(tx, account.networkId)}
          >
            <Cell>
              <Text variant="code">
                {maskValue(
                  tx.fromAccount === account.accountName
                    ? tx.toAccount
                    : tx.fromAccount,
                )}
              </Text>
            </Cell>
            <Cell>{new Date(tx.blockTime).toLocaleString()}</Cell>
            <Cell>
              <Text variant="code">
                <Box
                  className={amountCell}
                  data-type={
                    tx.fromAccount === account.accountName ? 'debit' : 'credit'
                  }
                >
                  {tx.fromAccount === account.accountName ? '-' : '+'}
                  {parseFloat(tx.amount)}
                </Box>
              </Text>
            </Cell>
          </Row>
        ))}
      </TableBody>
    </Table>
  );
}
