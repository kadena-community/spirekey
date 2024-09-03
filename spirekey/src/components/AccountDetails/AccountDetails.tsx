import {
  Box,
  Card,
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
  maskValue,
} from '@kadena/kode-ui';
import type { Account } from '@kadena/spirekey-types';
import useSWR from 'swr';

import { useNotifications } from '@/context/shared/NotificationsContext';
import { getChainwebDataUrl } from '@/utils/getChainwebDataUrl';
import { getNetworkDisplayName } from '@/utils/getNetworkDisplayName';

import { atoms } from '@kadena/kode-ui/styles';
import { amountCell } from './AccountDetails.css';

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
    return <Card fullWidth>No Transactions</Card>;
  }

  return (
    <Table className={atoms({ width: '100%' })}>
      <TableHeader>
        <Column>Account</Column>
        <Column>Date</Column>
        <Column>Amount</Column>
      </TableHeader>
      <TableBody>
        {data?.map((tx: any, idx: number) => (
          <Row key={idx}>
            <Cell>
              {maskValue(
                tx.fromAccount === account.accountName
                  ? tx.toAccount
                  : tx.fromAccount,
              )}
            </Cell>
            <Cell>{new Date(tx.blockTime).toLocaleString()}</Cell>
            <Cell>
              <Box
                className={amountCell}
                data-type={
                  tx.fromAccount === account.accountName ? 'debit' : 'credit'
                }
              >
                {tx.fromAccount === account.accountName ? '-' : '+'}
                {parseFloat(tx.amount)}
              </Box>
            </Cell>
          </Row>
        ))}
      </TableBody>
    </Table>
  );
}
