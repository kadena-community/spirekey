import { MaskedValue } from '@/components/MaskedValue/MaskedValue';
import { Account } from '@/context/AccountsContext';
import { useNotifications } from '@/context/NotificationsContext';
import { getChainwebDataUrl } from '@/utils/getChainwebDataUrl';
import { getNetworkDisplayName } from '@/utils/getNetworkDisplayName';
import { Grid, GridItem } from '@kadena/react-ui';
import classNames from 'classnames';
import { Fragment } from 'react';
import useSWR from 'swr';
import {
  details,
  transactionAddress,
  transactionAmount,
  transactionAmountVariants,
  transactionDate,
} from './AccountDetails.css';

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

  return (
    <Grid className={details} gap="xs" columns={5}>
      {data?.map((tx: any, index: number) => (
        <Fragment key={index}>
          <GridItem columnSpan={2}>
            <MaskedValue
              className={transactionAddress}
              value={
                tx.fromAccount === account.accountName
                  ? tx.toAccount
                  : tx.fromAccount
              }
            />
          </GridItem>
          <GridItem columnSpan={2} className={transactionDate}>
            {new Date(tx.blockTime).toLocaleString()}
          </GridItem>
          <GridItem
            className={classNames([
              transactionAmount,
              transactionAmountVariants({
                variant:
                  tx.fromAccount === account.accountName ? 'debit' : 'credit',
              }),
            ])}
          >
            {parseFloat(tx.amount)}
          </GridItem>
        </Fragment>
      ))}
    </Grid>
  );
}
