import { AccountRevealer } from '@/components/AccountRevealer/AccountRevealer';
import { MonoCheck, MonoContentCopy } from '@kadena/kode-icons/system';
import { Stack } from '@kadena/kode-ui';
import type { Account } from '@kadena/spirekey-types';
import { useEffect, useState } from 'react';
import { useCopyToClipboard } from 'usehooks-ts';
import * as styles from './AccountNetwork.css';

type AccountNetworkProps = {
  account?: Account;
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

  const [accountNamespace, accountNameFull] = (
    account?.accountName || ':'
  ).split(':');
  const [accountName, accountSuffix] = accountNameFull.split('.');

  if (!account) return;

  return (
    <Stack flexDirection="column">
      <Stack flexDirection="row" alignItems="center" className={styles.account}>
        {accountName && (
          <span className={styles.namespace}>{accountNamespace}:</span>
        )}

        <AccountRevealer accountName={accountName} reveal={!isLoading} />

        {!isLoading && (
          <span className={styles.namespace}>.{accountSuffix}</span>
        )}

        {!isLoading && (
          <button
            className={styles.copyButton}
            onClick={(e) => {
              e.stopPropagation();
              copy(account.accountName);
              setHasCopied(true);
            }}
          >
            {hasCopied ? <MonoCheck color="green" /> : <MonoContentCopy />}
          </button>
        )}
      </Stack>
    </Stack>
  );
}
