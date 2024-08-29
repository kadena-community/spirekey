import { Stack } from '@kadena/kode-ui';

import { useAccounts } from '@/context/AccountsContext';

import { SpireKeyKdacolorLogoGreen } from '@kadena/kode-icons/product';
import { CardContentBlock, CardFixedContainer } from '@kadena/kode-ui/patterns';
import { token } from '@kadena/kode-ui/styles';
import { Account } from '../Account/Account';

export default function CardCollection() {
  const { accounts } = useAccounts();

  return (
    <CardFixedContainer>
      <CardContentBlock
        visual={
          <SpireKeyKdacolorLogoGreen
            aria-label="SpireKey"
            fontSize={token('typography.fontSize.9xl')}
          />
        }
        title="Accounts"
        description="Your accounts registered in this wallet"
      >
        <Stack flexDirection="column" gap="sm">
          {accounts.map((account) => {
            return (
              <Account
                key={account.accountName + account.networkId}
                account={account}
                onClick={(account) => console.log(account)}
              />
            );
          })}
        </Stack>
      </CardContentBlock>
    </CardFixedContainer>
  );
}
