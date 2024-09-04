'use client';

import { AccountDetails } from '@/components/AccountDetails/AccountDetails';
import DeviceCard from '@/components/Card/DeviceCard';
import { SpireKeyCardContentBlock } from '@/components/SpireKeyCardContentBlock';
import { useAccounts } from '@/resolvers/accounts';
import { MonoArrowBack } from '@kadena/kode-icons/system';
import { Button, maskValue } from '@kadena/kode-ui';
import {
  CardContentBlock,
  CardFixedContainer,
  CardFooterGroup,
} from '@kadena/kode-ui/patterns';
import { atoms } from '@kadena/kode-ui/styles';
import { useParams, useRouter } from 'next/navigation';

export default function TransactionsPage() {
  const params = useParams();
  const { accounts } = useAccounts();
  const { push } = useRouter();
  const caccount = decodeURIComponent(params.caccount.toString());
  const cid = decodeURIComponent(params.cid.toString());
  const account = accounts?.find((a) => a.accountName === caccount);
  const device = account?.devices.find((d) => d['credential-id'] === cid);

  return (
    <CardFixedContainer>
      <SpireKeyCardContentBlock
        title="Overview"
        description={`Overview of your account ${maskValue(caccount)}`}
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
            onPress={() => push(`/accounts/${caccount}/devices/${cid}/send`)}
          >
            Transfer
          </Button>
        </CardFooterGroup>
      </SpireKeyCardContentBlock>
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
        onPress={() => push(`/accounts/${caccount}`)}
      >
        Back to Accounts
      </Button>
    </CardFixedContainer>
  );
}
