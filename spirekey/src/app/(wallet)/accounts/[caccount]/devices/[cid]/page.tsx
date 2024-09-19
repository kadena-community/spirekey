'use client';

import { iconColorClass } from '@/components/AccountCollection/style.css';
import { AccountDetails } from '@/components/AccountDetails/AccountDetails';
import DeviceCard from '@/components/Card/DeviceCard';
import { useAccounts } from '@/resolvers/accounts';
import {
  MonoAccountBalanceWallet,
  MonoArrowBack,
} from '@kadena/kode-icons/system';
import { Button } from '@kadena/kode-ui';
import {
  CardContentBlock,
  CardFixedContainer,
  CardFooterGroup,
} from '@kadena/kode-ui/patterns';
import { atoms } from '@kadena/kode-ui/styles';
import { useParams, useRouter } from 'next/navigation';

export default function AccountPage() {
  const params = useParams();
  const { accounts } = useAccounts();
  const { push } = useRouter();
  const caccount = decodeURIComponent(params.caccount.toString());
  const cid = decodeURIComponent(params.cid.toString());
  const account = accounts?.find((a) => a.accountName === caccount);
  const device = account?.devices.find((d) => d['credential-id'] === cid);

  return (
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
            onPress={() => push(`/accounts/${caccount}/devices/${cid}/wallet`)}
          >
            Settings
          </Button>
          <Button
            onPress={() => push(`/accounts/${caccount}/devices/${cid}/send`)}
          >
            Transfer
          </Button>
        </CardFooterGroup>
      </CardContentBlock>
      <CardContentBlock
        title="Transactions"
        description="Your most recent transactions."
      >
        {account && <AccountDetails account={account} />}
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
  );
}
