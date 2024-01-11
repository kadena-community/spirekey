'use client';

import { Account } from '@/context/AccountsContext';
import { getChainwebDataUrl } from '@/context/NetworkContext';
import { useAccounts } from '@/hooks/useProfiles';
import {
  Box,
  Heading,
  MaskedValue,
  Stack,
  Table,
  Text,
} from '@kadena/react-ui';
import { atoms, sprinkles } from '@kadena/react-ui/theme';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import FlipMove from 'react-flip-move';
import useSWR from 'swr';

import './cards.css';

export default function Cards() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeAccount, setActiveAccount] = useState<Account>();
  const { accounts } = useAccounts();
  const [first, ...preSortedAccounts] = !isCollapsed
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
  const sortedAccounts: Array<Account | { placeholder: boolean }> = (
    !isCollapsed
      ? [first, ...preSortedAccounts]
      : [first, { placeholder: true }, ...preSortedAccounts]
  ).filter(Boolean);
  const onCardClick = (account: Account) => () => {
    if (!isCollapsed) setActiveAccount(account);
    setIsCollapsed(!isCollapsed);
  };
  const domain = getChainwebDataUrl(activeAccount?.network || '');
  const { data, error, isLoading } = useSWR(
    `${domain}/txs/account/${activeAccount?.accountName}`,
    async (url: string) => {
      if (!activeAccount) return [];
      return await fetch(url).then((res) => res.json());
    },
  );
  useEffect(() => {
    if (!accounts) return;
    setActiveAccount(accounts[0]);
  }, [accounts]);
  if (!accounts || !first) return <div>loading...</div>;
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
        alignItems="center"
        justifyContent="center"
      >
        <FlipMove
          duration={500}
          delay={0}
          easing="cubic-bezier(0.39, 0, 0.45, 1.4)"
          staggerDurationBy={22}
          staggerDelayBy={0}
          enterAnimation={{
            from: {
              transformOrigin: 'top center',
              transform: 'rotateX(90deg) translateY(-8rem)',
            },
            to: {
              transform: 'rotateX(0deg)',
            },
          }}
          leaveAnimation={{
            from: {
              transform: '',
            },
            to: {
              transformOrigin: 'top center',
              transform: 'rotateX(90deg) translateY(-8rem)',
            },
          }}
        >
          {sortedAccounts.map((account: any) => {
            if (!account) return null;
            if (account?.placeholder)
              return (
                <div
                  key="placeholder"
                  className={classNames(
                    atoms({
                      marginBlockEnd: 'md',
                      borderRadius: 'md',
                    }),
                    'placeholder',
                  )}
                >
                  {data?.map((tx: any, index: number) => (
                    <Box key={tx.requestKey + index}>
                      <Text>
                        {tx.fromAccount}, {tx.toAccount}
                        <span
                          style={{
                            color:
                              tx.fromAccount === activeAccount?.accountName
                                ? 'red'
                                : 'green',
                          }}
                        >
                          {tx.amount}
                        </span>
                      </Text>
                    </Box>
                  ))}
                </div>
              );
            return (
              <div
                key={account.accountName + account.network}
                className={atoms({
                  display: 'flex',
                  justifyContent: 'center',
                })}
              >
                <Box
                  className={classNames(
                    sprinkles({
                      position: 'relative',
                    }),
                    'card',
                    {
                      active:
                        activeAccount?.accountName === account.accountName &&
                        activeAccount?.network === account.network,
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
                      {account.devices.map((d: any) => d.identifier).join(', ')}
                    </Heading>

                    <MaskedValue value={account.accountName} />

                    <Text>{account.network}</Text>
                  </Box>
                </Box>
              </div>
            );
          })}
        </FlipMove>
      </Stack>
    </Stack>
  );
}
