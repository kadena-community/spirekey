import { Account } from '@/context/AccountsContext';
import { getChainwebDataUrl } from '@/context/NetworkContext';
import { Box, Button, MaskedValue, Stack, Table, Text } from '@kadena/react-ui';
import useSWR from 'swr';
import { details, transactionAddress, transactionAmount, transactions } from './AccountDetails.css';

interface AccountDetailsProps {
  account: Account;
}

export function AccountDetails({ account }: AccountDetailsProps) {
  const domain = getChainwebDataUrl(account.network || '');
  const { data, error, isLoading } = useSWR(
    `${domain}/txs/account/${encodeURIComponent(account.accountName)}`,
    async (url: string) => {
      if (!account) return [];
      return await fetch(url, {mode: 'no-cors'}).then((res) => res.json());
    },
  );

  return (
    <div className={details}>
      <Stack flexDirection="column">
        <Stack
          flexDirection="column"
          marginBlockStart="md"
          paddingInline="md"
          className={transactions}
        >
          {data?.map((tx: any, index: number) => (
            <Stack width='100%' justifyContent="space-between">
              <MaskedValue
                startUnmaskedValues={16}
                value={
                  tx.fromAccount === account.accountName
                    ? tx.toAccount
                    : tx.fromAccount
                }
              />
              <Text className={transactionAmount} data-transaction-type={tx.fromAccount === account.accountName ? 'debet' : 'credit'}>
                {tx.amount}
              </Text>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </div>
  );
}
