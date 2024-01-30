import { MaskedValue } from '@/components/MaskedValue/MaskedValue';
import { Account } from '@/context/AccountsContext';
import { Stack, Text } from '@kadena/react-ui';
import {
  account as accountStyle,
  cardContentCenter,
  network,
} from './Card.css';

type AccountNetworkProps = {
  account: Account;
};

export default function AccountNetwork({
  account,
}: AccountNetworkProps) {
  return (
    <Stack flexDirection="column" className={cardContentCenter}>
      <MaskedValue
        value={account.accountName}
        startUnmaskedValues={16}
        className={accountStyle}
      />
      <Text className={network}>{account.network}</Text>
    </Stack>
  );
}
