import { Account } from '@/context/AccountsContext';
import { Stack } from '@kadena/react-ui';
import {
  balance,
  balanceLabel,
  transactions,
  transactionsLabel,
} from './Card.css';

type CardBottomProps = {
  account: Account;
  onClick?: (account: Account) => void;
  balancePercentage?: number;
  isCollapsed?: boolean;
  isActive?: boolean;
};

export default function CardBottom({ account }: CardBottomProps) {
  return (
    <>
      <Stack alignItems="center">
        <span className={transactionsLabel}># TX</span>
        <span className={transactions}>0</span>
      </Stack>
      <Stack>
        <span className={balanceLabel}>Balance</span>
        <span className={balance}>{account.balance}</span>
      </Stack>
    </>
  );
}
