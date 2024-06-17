import type { Account } from '@kadena-spirekey/types';
import { MonoCheck, MonoContentCopy } from '@kadena/react-icons';
import { Stack, Text } from '@kadena/react-ui';
import { useEffect, useState } from 'react';
import { useCopyToClipboard } from 'usehooks-ts';

import { AccountRevealer } from '@/components/AccountRevealer/AccountRevealer';
import { getNetworkDisplayName } from '@/utils/getNetworkDisplayName';

import * as styles from './AccountNetwork.css';

type AccountNetworkProps = {
  account: Account;
  isLoading?: boolean;
};

export default function AccountNetwork({
  account,
  isLoading,
}: AccountNetworkProps) {
  const [, copy] = useCopyToClipboard();
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasCopied(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [hasCopied]);

  const [accountNamespace, accountName] = (account.accountName || ':').split(
    ':',
  );

  return (
    <Stack flexDirection="column">
      <Stack flexDirection="row" alignItems="center" className={styles.account}>
        {accountName && (
          <span className={styles.namespace}>{accountNamespace}:</span>
        )}

        <AccountRevealer accountName={accountName} reveal={!isLoading} />

        {!isLoading && (
          <button
            className={styles.copyButton}
            onClick={(e) => {
              e.stopPropagation();
              copy(account.accountName);
              setHasCopied(true);
            }}
          >
            {hasCopied ? (
              <MonoCheck color="green" />
            ) : (
              <MonoContentCopy color="black" />
            )}
          </button>
        )}
      </Stack>
      <Text className={styles.network}>
        {getNetworkDisplayName(account.networkId)}
      </Text>
    </Stack>
  );
}
