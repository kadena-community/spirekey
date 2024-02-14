import { useAccounts, type Account } from '@/context/AccountsContext';

import { calculateBalancePercentage } from '@/utils/balance';
import { Stack } from '@kadena/react-ui';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { ButtonLink } from '../ButtonLink/ButtonLink';
import DeviceCard from '../Card/DeviceCard';
import { Carousel } from '../Carousel/Carousel';

interface AccountProps {
  account: Account;
  isActive?: boolean;
  returnUrl?: string;
  optimistic?: boolean;
}

export function Account({
  account,
  isActive = false,
  returnUrl,
  optimistic = false,
}: AccountProps) {
  const { accounts } = useAccounts();
  const [delayedActive, setDelayedActive] = useState(false);
  const accountBalancesOnNetwork = accounts
    .filter((a) => a.network === account.network)
    .map((a) => parseFloat(a?.balance || '0'));

  const balancePercentage = calculateBalancePercentage(
    parseFloat(account?.balance || '0'),
    accountBalancesOnNetwork,
  );

  // We want to delay the rendering of the active state to prevent the height of the cards animating in `CardCollection`
  useEffect(() => {
    if (isActive) {
      setTimeout(() => setDelayedActive(true), 500);
    } else {
      setDelayedActive(false);
    }
    () => setDelayedActive(false);
  }, [isActive]);

  return (
    <Carousel
      account={account}
      isActive={delayedActive}
      hideAddDeviceCard={!!returnUrl}
    >
      {account.devices.map((d) => {
        const caccount = encodeURIComponent(account.accountName);
        const cid = encodeURIComponent(d['credential-id']);

        return (
          <Fragment key={d['credential-id']}>
            <DeviceCard
              account={account}
              balancePercentage={balancePercentage}
            />
            <AnimatePresence>
              {!returnUrl && delayedActive && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/accounts/${caccount}/devices/${cid}/fund`}>
                    fund
                  </Link>{' '}
                  -
                  <Link href={`/accounts/${caccount}/devices/${cid}/send`}>
                    send
                  </Link>{' '}
                  -
                  <Link href={`/accounts/${caccount}/devices/${cid}/receive`}>
                    receive
                  </Link>{' '}
                  -
                  <Link
                    href={`/accounts/${caccount}/devices/${cid}/transactions`}
                  >
                    transactions
                  </Link>{' '}
                  -
                  <Link href={`/accounts/${caccount}/devices/${cid}#${cid}`}>
                    details
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
            {returnUrl && delayedActive && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Stack
                  flexDirection="row"
                  justifyContent="center"
                  gap="xl"
                  marginBlockStart="lg"
                  paddingInline="lg"
                >
                  <ButtonLink variant="secondary" href={returnUrl}>
                    Cancel
                  </ButtonLink>
                  {(optimistic || !d.pendingRegistrationTx) && (
                    <ButtonLink
                      variant="primary"
                      href={`${returnUrl}?user=${Buffer.from(
                        JSON.stringify({
                          alias: account.alias,
                          accountName: account.accountName,
                          pendingTxIds: [d.pendingRegistrationTx].filter(
                            Boolean,
                          ),
                          credentials: [
                            {
                              type: 'WebAuthn',
                              publicKey: d.guard.keys[0],
                              id: d['credential-id'],
                            },
                          ],
                        }),
                      ).toString('base64')}`}
                    >
                      Login
                    </ButtonLink>
                  )}
                </Stack>
              </motion.div>
            )}
          </Fragment>
        );
      })}
    </Carousel>
  );
}
