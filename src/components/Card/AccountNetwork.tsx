import { MaskedValue } from '@/components/MaskedValue/MaskedValue';
import { Account } from '@/context/AccountsContext';
import { Box, Stack, SystemIcon, Text } from '@kadena/react-ui';
import { atoms } from '@kadena/react-ui/styles';
import { useCopyToClipboard } from 'usehooks-ts';
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
  const [copiedText, copy] = useCopyToClipboard();

  return (
    <Stack flexDirection="column" className={cardContentCenter}>
      <Stack flexDirection="row" alignItems="center">
        <MaskedValue
          value={account.accountName}
          startUnmaskedValues={16}
          className={accountStyle}
        />
        <button
          className={atoms({
            background: 'none',
            border: 'none',
            padding: 'md',
          })}
          onClick={(e) => {
            e.stopPropagation();
            copy(account.accountName);
            alert(`Copied ${copiedText} to clipboard`); // @TODO: Replace with toast
          }}
        >
          <SystemIcon.ContentCopy size="sm" color="black" />
        </button>
      </Stack>
      <Text className={network}>{getNetworkDisplayName(account.network)}</Text>
    </Stack>
  );
}
