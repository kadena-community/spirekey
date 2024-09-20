import { useAccount, useAccounts } from '@/resolvers/accounts';
import { Button, Stack, TextField } from '@kadena/kode-ui';
import { CardContentBlock, CardFooterGroup } from '@kadena/kode-ui/patterns';
import React, { FC, useState } from 'react';

interface IProps {
  accountName?: string;
}

export const AliasEditor: FC<IProps> = ({ accountName }) => {
  const { accounts, loading } = useAccounts();
  const { setAccount } = useAccount();
  const [alias, setAlias] = useState('');
  if (loading) return <div>Loading...</div>;
  const account = accounts?.find((a) => a.accountName === accountName);
  if (!account) return <div>No account found...</div>;
  return (
    <CardContentBlock
      title="Manage Account"
      description="Manage your account details"
    >
      <Stack flexDirection="column">
        <TextField
          label="Alias"
          value={alias || account.alias}
          onValueChange={(v) => setAlias(v)}
        />
        <CardFooterGroup>
          <Button
            variant="primary"
            isDisabled={!alias || alias === account.alias}
            onPress={() => setAccount({ ...account, alias })}
          >
            Save
          </Button>
        </CardFooterGroup>
      </Stack>
    </CardContentBlock>
  );
};
