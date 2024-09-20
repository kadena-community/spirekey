'use client';

import { iconColorClass } from '@/components/AccountCollection/style.css';
import { tabs } from '@/components/AccountTabs/AccountTabs';
import DeviceCard from '@/components/Card/DeviceCard';
import { useAccounts } from '@/resolvers/accounts';
import {
  isStringInArray,
  removeLastSectionOfRoute,
} from '@/utils/removeLastSectionOfRoute';
import {
  MonoAccountBalanceWallet,
  MonoArrowBack,
} from '@kadena/kode-icons/system';
import { Button, Stack } from '@kadena/kode-ui';
import {
  CardContentBlock,
  CardFixedContainer,
  CardFooterGroup,
} from '@kadena/kode-ui/patterns';
import { atoms } from '@kadena/kode-ui/styles';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

export default function AccountLayout({ children }: { children: any }) {
  const params = useParams();
  const pathName = usePathname();

  const { accounts } = useAccounts();
  const { push } = useRouter();
  const raccount = decodeURIComponent(params.raccount.toString());
  const cid = decodeURIComponent(params.cid.toString());
  const account = accounts?.find((a) => a.accountName === raccount);
  const device = account?.devices.find((d) => d['credential-id'] === cid);

  const handleBack = useCallback(() => {
    const arr = pathName.split('/');
    const lastSection = arr.pop();
    const tabsArray = Object.keys(tabs);

    if (isStringInArray(lastSection, tabsArray)) {
      push('/');
    } else {
      push(removeLastSectionOfRoute(pathName));
    }
  }, [pathName]);

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
                push(`/accounts/${raccount}/devices/${cid}/settings`)
              }
            >
              Settings
            </Button>
            <Button
              onPress={() =>
                push(`/accounts/${raccount}/devices/${cid}/transfer`)
              }
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
          onPress={handleBack}
        >
          Go back
        </Button>
      </CardFixedContainer>

      {children}
    </Stack>
  );
}
