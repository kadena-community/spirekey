import { title } from '@/app/(wallet)/(center)/welcome/page.css';
import { useAccounts } from '@/resolvers/accounts';
import { getNetworkDisplayName } from '@/utils/getNetworkDisplayName';
import { MonoAddCard, MonoSelectAll } from '@kadena/kode-icons/system';
import { Button, Grid, GridItem, Heading, Stack, Text } from '@kadena/kode-ui';
import { CardContentBlock, CardFixedContainer } from '@kadena/kode-ui/patterns';
import { Account } from '@kadena/spirekey-types';
import { useRouter } from 'next/navigation';
import { AccountTile } from '../AccountTile/AccountTile';
import { cardContainerWrapperClass, iconColorClass } from './style.css';

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
    <Stack flexDirection="column" gap="xxxl" width="100%">
      <CardFixedContainer>
        <Stack flexDirection="column" gap="md" marginBlock="xl">
          <MonoSelectAll width={64} height={64} className={iconColorClass} />

          <Stack
            flexDirection="column"
            justifyContent="center"
            gap="xl"
            marginBlockStart="xl"
          >
            <Grid gap="xxxl">
              <GridItem>
                <Stack gap="md" flexDirection="column" height="100%">
                  <Heading className={title} variant="h5">
                    Chainweaver V3 Alpha demo wallet
                  </Heading>
                  <Stack gap="n2" flexDirection="column">
                    <Text as="p">
                      This page enables you to generate accounts directly on
                      your hardware device without installing any code. This is
                      a minimalist demo wallet to interact with any of the
                      account(s) created.
                    </Text>
                  </Stack>
                </Stack>
              </GridItem>
            </Grid>
          </Stack>
        </Stack>
      </CardFixedContainer>
      {Object.entries(sortedAccounts)
        .filter(([_, accs]) => accs.length)
        .map(([networkId, accounts]) => (
          <Stack
            key={networkId}
            flexDirection="column"
            className={cardContainerWrapperClass}
          >
            <CardFixedContainer>
              <CardContentBlock
                title=" "
                supportingContent={
                  <Stack flexDirection="column" gap="md" marginBlockStart="md">
                    <Heading as="h4">
                      {getNetworkDisplayName(networkId)}
                    </Heading>
                    <Button
                      isCompact
                      variant="outlined"
                      startVisual={<MonoAddCard />}
                      onPress={() => {
                        router.push(`/register?networkId=${networkId}`);
                      }}
                    >
                      Add Account
                    </Button>
                  </Stack>
                }
              >
                <Stack flexDirection="column" gap="sm">
                  {accounts.map((account) => {
                    return (
                      <AccountTile
                        key={account.accountName + account.networkId}
                        account={account}
                        onClick={(account) =>
                          router.push(
                            `/accounts/${account.accountName}/devices/${account.devices[0]['credential-id']}`,
                          )
                        }
                      />
                    );
                  })}
                </Stack>
              </CardContentBlock>
            </CardFixedContainer>
          </Stack>
        ))}
    </Stack>
  );
}
