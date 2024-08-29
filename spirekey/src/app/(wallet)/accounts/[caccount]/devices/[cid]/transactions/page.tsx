'use client';

import { AccountDetails } from '@/components/AccountDetails/AccountDetails';
import { SpireKeyCardContentBlock } from '@/components/SpireKeyCardContentBlock';
import { useAccounts } from '@/context/AccountsContext';
import { Button, maskValue } from '@kadena/kode-ui';
import { CardFixedContainer, CardFooterGroup } from '@kadena/kode-ui/patterns';
import { useParams, useRouter } from 'next/navigation';

export default function TransactionsPage() {
  const params = useParams();
  const { accounts } = useAccounts();
  const { push } = useRouter();
  const caccount = decodeURIComponent(params.caccount.toString());
  const cid = decodeURIComponent(params.cid.toString());
  const account = accounts?.find((a) => a.accountName === caccount);

  return (
    <CardFixedContainer>
      <SpireKeyCardContentBlock
        title="Latest Transactions"
        description={`Overview of the latest transactions for your account ${maskValue(caccount)}`}
      >
        {account && <AccountDetails account={account} />}
      </SpireKeyCardContentBlock>
      <CardFooterGroup separated>
        <Button
          variant="outlined"
          onPress={() => push(`/accounts/${caccount}`)}
        >
          Back
        </Button>
        <Button
          variant="primary"
          onPress={() => push(`/accounts/${caccount}/devices/${cid}/send`)}
        >
          Transfer
        </Button>
      </CardFooterGroup>
    </CardFixedContainer>
  );
}
