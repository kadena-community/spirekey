'use client';

import { iconColorClass } from '@/components/AccountCollection/style.css';
import { AccountDetails } from '@/components/AccountDetails/AccountDetails';
import DeviceCard from '@/components/Card/DeviceCard';
import SendForm from '@/components/SendForm/SendForm';
import WalletBackup from '@/components/WalletBackup/WalletBackup';
import { useAccounts } from '@/resolvers/accounts';
import {
  MonoAccountBalanceWallet,
  MonoArrowBack,
} from '@kadena/kode-icons/system';
import { Button, Stack, TabItem, Tabs } from '@kadena/kode-ui';
import {
  CardContentBlock,
  CardFixedContainer,
  CardFooterGroup,
} from '@kadena/kode-ui/patterns';
import { atoms } from '@kadena/kode-ui/styles';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

export default function AccountLayout({ children }: { children: any }) {
  const params = useParams();
  const { accounts } = useAccounts();
  const { push } = useRouter();
  const caccount = decodeURIComponent(params.caccount.toString());
  const cid = decodeURIComponent(params.cid.toString());
  const account = accounts?.find((a) => a.accountName === caccount);
  const device = account?.devices.find((d) => d['credential-id'] === cid);

  return (
    <Stack flexDirection="column" gap="xxxl" width="100%">
      <CardFixedContainer>
        <CardContentBlock
          title="Account"
          description={`Overview of your selected account`}
          visual={
            <MonoAccountBalanceWallet
              width={64}
              height={64}
              className={iconColorClass}
            />
          }
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
              variant="outlined"
              onPress={() =>
                push(`/accounts/${caccount}/devices/${cid}/wallet`)
              }
            >
              Settings
            </Button>
            <Button
              onPress={() => push(`/accounts/${caccount}/devices/${cid}/send`)}
            >
              New Transfer
            </Button>
          </CardFooterGroup>
        </CardContentBlock>

        <Button
          className={atoms({ position: 'absolute', left: 0 })}
          startVisual={<MonoArrowBack />}
          style={{ top: -50 }}
          variant="outlined"
          onPress={() => push(`/`)}
        >
          Go back
        </Button>
      </CardFixedContainer>

      {children}
    </Stack>
  );
}
