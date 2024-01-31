import { MaskedValue } from '@/components/MaskedValue/MaskedValue';
import { Account } from '@/context/AccountsContext';
import { Stack, SystemIcon, Text } from '@kadena/react-ui';
import { useEffect, useState } from 'react';
import { useCopyToClipboard } from 'usehooks-ts';
import { copyButton } from './AccountNetwork.css';
import {
  account as accountStyle,
  cardContentCenter,
  network,
} from './Card.css';

type AccountNetworkProps = {
  account: Account;
};

const getNetworkDisplayName = (network: string) => {
  if (network === 'mainnet01') return 'Mainnet';
  if (network === 'testnet04') return 'Testnet';
  if (network === 'fast-development') return 'Devnet';
  return network;
};

export default function AccountNetwork({ account }: AccountNetworkProps) {
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

  if (!account.accountName) return null;

  return (
    <Stack flexDirection="column" className={cardContentCenter}>
      <Stack flexDirection="row" alignItems="center">
        <MaskedValue
          value={account.accountName}
          startUnmaskedValues={16}
          className={accountStyle}
        />
        <button
          className={copyButton}
          onClick={(e) => {
            e.stopPropagation();
            copy(account.accountName);
            setHasCopied(true);
          }}
        >
          {hasCopied ? (
            <SystemIcon.Check size="md" color="green" />
          ) : (
            <SystemIcon.ContentCopy size="md" color="black" />
          )}
        </button>
      </Stack>
      <Text className={network}>{getNetworkDisplayName(account.network)}</Text>
    </Stack>
  );
}
