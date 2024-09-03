import { useAccounts } from '@/context/AccountsContext';
import { getNetworkDisplayName } from '@/utils/getNetworkDisplayName';
import { Stack } from '@kadena/kode-ui';
import { CardContentBlock, CardFixedContainer } from '@kadena/kode-ui/patterns';
import { token } from '@kadena/kode-ui/styles';
import { Account } from '@kadena/spirekey-types';
import { useRouter } from 'next/navigation';
import { Heading } from 'react-aria-components';
import { AccountComponent } from '../Account/Account';
import SpireKeyKdacolorLogoGreen from '../icons/KdaLogoGreen';

type SortedAccounts = {
  mainnet01: Account[];
  testnet04: Account[];
  development: Account[];
};
export default function CardCollection() {
  const { accounts } = useAccounts();
  const router = useRouter();
  const sortedAccounts = accounts.reduce(
    (sorted: SortedAccounts, account) => {
      if (account.networkId === 'mainnet01')
        return {
          ...sorted,
          mainnet01: [...sorted.mainnet01, account],
        };
      if (account.networkId === 'testnet04')
        return {
          ...sorted,
          testnet04: [...sorted.testnet04, account],
        };
      return {
        ...sorted,
        development: [...sorted.development, account],
      };
    },
    {
      mainnet01: [],
      testnet04: [],
      development: [],
    },
  );

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
        description={`available in your wallet`}
      >
        {Object.entries(sortedAccounts)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .filter(([_, accs]) => accs.length)
          .map(([networkId, accounts]) => (
            <Stack
              key={networkId}
              flexDirection="column"
              gap="md"
              marginBlock="xxl"
            >
              <Heading>{getNetworkDisplayName(networkId)}</Heading>
              {accounts.map((account) => {
                return (
                  <AccountComponent
                    key={account.accountName + account.networkId}
                    account={account}
                    onClick={(account) =>
                      router.push(
                        `/accounts/${account.accountName}/devices/${account.devices[0]['credential-id']}/transactions`,
                      )
                    }
                  />
                );
              })}
            </Stack>
          ))}
      </CardContentBlock>
    </CardFixedContainer>
  );
}
