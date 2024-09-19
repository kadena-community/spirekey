import { Stack, Text } from '@kadena/kode-ui';
import type { Account } from '@kadena/spirekey-types';

import { useNotifications } from '@/context/shared/NotificationsContext';
import { getChainwebDataUrl } from '@/utils/getChainwebDataUrl';
import { getNetworkDisplayName } from '@/utils/getNetworkDisplayName';

import * as styles from './Card.css';

interface CardBalanceProps {
  account: Account;
}

export default function CardBalance({ account }: CardBalanceProps) {
  const { addNotification } = useNotifications();
  const domain = getChainwebDataUrl(account.networkId);

  if (!domain) {
    addNotification({
      variant: 'error',
      title: `The Chainweb Data URL is not configured for network: ${getNetworkDisplayName(account.networkId)}`,
    });
  }

  return (
    <Stack flexDirection="column">
      <Stack>
        <Text className={styles.balanceLabel} size="small">
          Balance
        </Text>
        <Text variant="code" className={styles.balance} size="small">
          {account.balance} KDA
        </Text>
      </Stack>
    </Stack>
  );
}
