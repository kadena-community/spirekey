import type { Account } from '@kadena-spirekey/types';
import { Grid, GridItem } from '@kadena/react-ui';
import classNames from 'classnames';
import { Fragment } from 'react';
import useSWR from 'swr';

import { MaskedValue } from '@/components/MaskedValue/MaskedValue';
import { useNotifications } from '@/context/shared/NotificationsContext';
import { getChainwebDataUrl } from '@/utils/getChainwebDataUrl';
import { getNetworkDisplayName } from '@/utils/getNetworkDisplayName';

import * as styles from './AccountDetails.css';

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
    <Grid
      className={styles.details}
      gap="xs"
      columns={{
        lg: 5,
        md: 5,
        sm: 5,
        xl: 5,
        xs: 5,
        xxl: 5,
      }}
    >
      {data?.map((tx: any, index: number) => (
        <Fragment key={index}>
          <GridItem columnSpan={2}>
            <MaskedValue
              className={styles.transactionAddress}
              value={
                tx.fromAccount === account.accountName
                  ? tx.toAccount
                  : tx.fromAccount
              }
            />
          </GridItem>
          <GridItem columnSpan={2} className={styles.transactionDate}>
            {new Date(tx.blockTime).toLocaleString()}
          </GridItem>
          <GridItem
            className={classNames([
              styles.transactionAmount,
              styles.transactionAmountVariants({
                variant:
                  tx.fromAccount === account.accountName ? 'debet' : 'credit',
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
