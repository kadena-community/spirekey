'use client';

import DeviceCard from '@/components/Card/DeviceCard';
import { SpireKeyCardContentBlock } from '@/components/SpireKeyCardContentBlock';
import { useNotifications } from '@/context/shared/NotificationsContext';
import { useAccounts } from '@/resolvers/accounts';
import { useCredentials } from '@/resolvers/connect-wallet';
import { MonoArrowBack, MonoCopyAll } from '@kadena/kode-icons/system';
import { Button, maskValue, Stack, TextField } from '@kadena/kode-ui';
import {
  CardContentBlock,
  CardFixedContainer,
  CardFooterGroup,
} from '@kadena/kode-ui/patterns';
import { atoms } from '@kadena/kode-ui/styles';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function WalletPage() {
  const params = useParams();
  const { accounts } = useAccounts();
  const { push } = useRouter();
  const caccount = decodeURIComponent(params.caccount.toString());
  const cid = decodeURIComponent(params.cid.toString());
  const account = accounts?.find((a) => a.accountName === caccount);
  const device = account?.devices.find((d) => d['credential-id'] === cid);
  const { getCredentials } = useCredentials();
  const [mnemonic, setMnemonic] = useState('');

  const { addNotification } = useNotifications();

  return (
    <CardFixedContainer>
      <SpireKeyCardContentBlock
        title="Wallet"
        description={`Reveal the mnemonic phrase of your account ${maskValue(caccount)}`}
        extendedContent={
          account && device ? (
            <DeviceCard
              account={account}
              device={device}
              color={device?.color}
            />
          ) : null
        }
      >
        <CardFooterGroup>
          <Button
            variant="primary"
            isDisabled={!!mnemonic}
            onPress={async () => {
              if (!account) return;
              const { mnemonic } = await getCredentials(account.networkId);
              if (!mnemonic)
                addNotification({
                  variant: 'warning',
                  title: 'Please migrate your account',
                  message:
                    'Your account was created before the support of mnemonic phrases. Please create a new account and transfer your funds.',
                  timeout: 30_000,
                });
              setMnemonic(mnemonic);
            }}
          >
            Reveal
          </Button>
        </CardFooterGroup>
      </SpireKeyCardContentBlock>
      <CardContentBlock
        title="Mnemonic"
        description="Make sure to keep your mnemonic phrase safe! If a bad actor get's hold of your mnemonic phrase, they will have full access to your account."
      >
        <MnemonicRevealer mnemonic={mnemonic} />
      </CardContentBlock>
      <Button
        className={atoms({ position: 'absolute', left: 0 })}
        startVisual={<MonoArrowBack />}
        style={{ top: -50 }}
        variant="outlined"
        onPress={() => push(`/`)}
      >
        Back to Accounts
      </Button>
    </CardFixedContainer>
  );
}

const MnemonicRevealer = ({ mnemonic }: { mnemonic: string }) => {
  if (!mnemonic) return null;
  const groupSize = 4;
  const wordGroups = mnemonic
    .split(' ')
    .reduce(
      (acc, word) => {
        const [lastGroup, ...rest] = acc;
        if (lastGroup.length === groupSize) return [[word], lastGroup, ...rest];
        return [[...lastGroup, word], ...rest];
      },
      [[]] as string[][],
    )
    .reverse()
    .map((words) => words.join(' '));
  return (
    <Stack gap="md" flexDirection="column">
      {wordGroups.map((wordsStr, groupIndex) => (
        <Stack gap="sm">
          {wordsStr.split(' ').map((word, wordIndex) => (
            <TextField
              key={word}
              type="password"
              value="****"
              label={`${groupIndex * groupSize + wordIndex + 1}`}
            />
          ))}

          <Button
            variant="transparent"
            onPress={() => navigator.clipboard.writeText(wordsStr)}
          >
            <MonoCopyAll />
          </Button>
        </Stack>
      ))}
    </Stack>
  );
};
