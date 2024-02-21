import { Account } from '@/context/AccountsContext';
import { getChainwebDataUrl } from '@/utils/getChainwebDataUrl';
import { Stack } from '@kadena/react-ui';
import useSWR from 'swr';
import {
  balance,
  balanceLabel,
  transactions,
  transactionsLabel,
} from './Card.css';

interface CardBottomProps {
  account: Account;
}

export default function CardBottom({ account }: CardBottomProps) {
  const domain = getChainwebDataUrl(account.network || '');
  const { data } = useSWR(() => account.accountName
    ? `${domain}/txs/account/${encodeURIComponent(account.accountName)}`
    : null,
    async (url: string) => {
      return await fetch(url).then((res) => res.json());
    },
  );

  return (
    <>
      <Stack alignItems="center">
        <span className={transactionsLabel}># TX</span>
        <span className={transactions}>{data?.length}</span>
      </Stack>
      <Stack>
        <span className={balanceLabel}>Balance</span>
        <span className={balance}>
          {account.balance !== '0' && `${account.balance} KDA`}
        </span>
      </Stack>
    </>
  );
}
