'use client';

import { Account } from '@/context/AccountsContext';
import { useNetwork } from '@/context/NetworkContext';
import { useAccounts } from '@/hooks/useProfiles';
import { Box, Heading, MaskedValue, Stack, Text } from '@kadena/react-ui';
import { sprinkles } from '@kadena/react-ui/theme';
import classNames from 'classnames';
import { useState } from 'react';
import FlipMove from 'react-flip-move';

import './cards.css';

export default function Cards() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeAccount, setActiveAccount] = useState<Account>();
  const { accounts } = useAccounts();
  const { network } = useNetwork();
  const sortedAccounts = !isCollapsed
    ? accounts
    : [...accounts].sort((a, b) => {
        if (
          a.accountName === activeAccount?.accountName &&
          a.network === activeAccount.network
        )
          return -1;
        if (
          b.accountName === activeAccount?.accountName &&
          b.network === activeAccount.network
        )
          return 1;
        return 0;
      });
  const onCardClick = (account: Account) => () => {
    if (!isCollapsed) setActiveAccount(account);
    setIsCollapsed(!isCollapsed);
  };
  if (!accounts) return <div>loading...</div>;
  return (
    <Stack gap="md" flexDirection="column" alignItems="center">
      <Box textAlign="center">
        <Heading variant="h3" as="h1">
          Cards
        </Heading>
      </Box>
      <Stack
        className={classNames('cards', {
          collapsed: isCollapsed,
        })}
        flexDirection="column"
      >
        <FlipMove
          duration={500}
          delay={0}
          easing="cubic-bezier(0.39, 0, 0.45, 1.4)"
          staggerDurationBy={22}
          staggerDelayBy={0}
        >
          {sortedAccounts.map((account) => (
            <div key={account.accountName + account.network}>
              <Box
                className={classNames(
                  sprinkles({
                    position: 'relative',
                  }),
                  'card',
                  {
                    active:
                      activeAccount?.accountName === account.accountName &&
                      activeAccount.network === account.network,
                  },
                )}
                style={{
                  width: '20rem',
                }}
                onClick={onCardClick(account)}
              >
                <Box
                  borderStyle="solid"
                  borderWidth="hairline"
                  borderRadius="md"
                  borderColor="brand.primary.default"
                  padding="md"
                  className={sprinkles({
                    backgroundColor: '$primarySurface',
                    position: 'absolute',
                    width: '100%',
                  })}
                >
                  <Heading variant="h5" as="h2">
                    {account.devices.map((d) => d.identifier).join(', ')}
                  </Heading>

                  <MaskedValue value={account.accountName} />

                  <Text>{network}</Text>
                </Box>
              </Box>
            </div>
          ))}
        </FlipMove>
      </Stack>
    </Stack>
  );
}
