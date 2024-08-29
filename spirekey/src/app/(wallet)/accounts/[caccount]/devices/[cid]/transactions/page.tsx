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
  const account = accounts?.find((a) => a.accountName === caccount);

  return (
    <CardFixedContainer>
      <SpireKeyCardContentBlock
        title="Transactions"
        description={`Overview of transactions for your account ${maskValue(caccount)}`}
      >
        {account && <AccountDetails account={account} />}
      </SpireKeyCardContentBlock>
      <CardFooterGroup>
        <Button
          variant="outlined"
          onPress={() => push(`/accounts/${caccount}`)}
        >
          Back
        </Button>
      </CardFooterGroup>
    </CardFixedContainer>
  );
}
