import { Card, Heading, Stack } from '@kadena/kode-ui';

import { useAccounts } from '@/resolvers/accounts';
import { getNetworkDisplayName } from '@/utils/getNetworkDisplayName';
import { CardContentBlock, CardFixedContainer } from '@kadena/kode-ui/patterns';
import { Account } from '@kadena/spirekey-types';
import { useRouter } from 'next/navigation';
import { AccountComponent } from '../Account/Account';

type SortedAccounts = {
  mainnet01: Account[];
  testnet04: Account[];
  development: Account[];
};
export default function AccountCollection() {
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
    <>
      <CardFixedContainer>
        <CardContentBlock
          title="Wallet Accounts"
          description={`All available accounts with your wallet`}
        ></CardContentBlock>
      </CardFixedContainer>
      {Object.entries(sortedAccounts)
        .filter(([_, accs]) => accs.length)
        .map(([networkId, accounts]) => (
          <Stack
            key={networkId}
            flexDirection="column"
            gap="md"
            marginBlock="xxl"
          >
            <CardFixedContainer>
              <CardContentBlock title={getNetworkDisplayName(networkId)}>
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
              </CardContentBlock>
            </CardFixedContainer>
          </Stack>
        ))}
    </>
  );
}
