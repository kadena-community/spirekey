import { Account } from '@/context/AccountsContext';
import { getChainwebDataUrl } from '@/utils/getChainwebDataUrl';
import { Stack } from '@kadena/react-ui';
import useSWR from 'swr';
import * as styles from './Card.css';

interface CardBottomProps {
  account: Account;
}

export default function CardBottom({ account }: CardBottomProps) {
  const domain = getChainwebDataUrl(account.networkId);
  const { data } = useSWR(
    () =>
      account.accountName
        ? `${domain}/txs/account/${encodeURIComponent(account.accountName)}`
        : null,
    async (url: string) => {
      return await fetch(url).then((res) => res.json());
    },
  );

  return (
    <>
      <Stack alignItems="center">
        <span className={styles.transactionsLabel}># TX</span>
        <span className={styles.transactions}>{data?.length ?? 0}</span>
      </Stack>
      <Stack>
        <span className={styles.balanceLabel}>Balance</span>
        <span className={styles.balance}>{account.balance} KDA</span>
      </Stack>
    </>
  );
}
