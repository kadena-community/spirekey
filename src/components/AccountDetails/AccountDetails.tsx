import { MaskedValue } from '@/components/MaskedValue/MaskedValue';
import { Account } from '@/context/AccountsContext';
import { getChainwebDataUrl } from '@/context/NetworkContext';
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
  const domain = getChainwebDataUrl(account.network || '');
  const { data } = useSWR(
    `${domain}/txs/account/${encodeURIComponent(account.accountName)}`,
    async (url: string) => {
      return await fetch(url).then((res) => res.json());
    },
  );

  return (
    <Grid
      className={details}
      gap={'xs'}
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
              className={transactionAddress}
              startUnmaskedValues={16}
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
                  tx.fromAccount === account.accountName ? 'debet' : 'credit',
              }),
            ])}
          >
            {parseFloat(tx.amount).toFixed(2)}
          </GridItem>
        </Fragment>
      ))}
    </Grid>
  );
}
