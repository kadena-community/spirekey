import { useAccounts, type Account } from '@/context/AccountsContext';

import { calculateBalancePercentage } from '@/utils/balance';
import { getDevnetNetworkId } from '@/utils/shared/getDevnetNetworkId';
import { Grid, Stack } from '@kadena/react-ui';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { AccountButton } from '../AccountButton/AccountButton';
import { FundButton } from '../AccountButton/FundButton';
import DeviceCard from '../Card/DeviceCard';
import { Carousel } from '../Carousel/Carousel';
import { Request } from '../icons/Request';
import { Send } from '../icons/Send';
import { Transactions } from '../icons/Transactions';
import { ButtonLink } from '../shared/ButtonLink/ButtonLink';
import { detailLink } from './Account.css';

import * as styles from './Account.css';

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
  const [delayedIsActive, setDelayedIsActive] = useState(false);
  const accountBalancesOnNetwork = accounts
    .filter((a) => a.networkId === account.networkId)
    .map((a) => parseFloat(a.balance));

  const balancePercentage = calculateBalancePercentage(
    parseFloat(account.balance),
    accountBalancesOnNetwork,
  );

  // We want to delay the rendering of the active state to prevent the height of the cards animating in `CardCollection`
  useEffect(() => {
    if (isActive) {
      setTimeout(() => setDelayedIsActive(true), 500);
    } else {
      setDelayedIsActive(false);
    }
    () => setDelayedIsActive(false);
  }, [isActive]);

  return (
    <Carousel
      account={account}
      delayedIsActive={delayedIsActive}
      isActive={isActive}
      hideAddDeviceCard={!!returnUrl}
    >
      {account.devices.map((d) => {
        const caccount = encodeURIComponent(account.accountName);
        const cid = encodeURIComponent(d['credential-id']);

        return (
          <Fragment key={d['credential-id']}>
            <DeviceCard
              color={d.color}
              account={account}
              device={d}
              balancePercentage={balancePercentage}
            />
            <AnimatePresence>
              {!returnUrl && delayedIsActive && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Grid
                    justifyContent="center"
                    gap="md"
                    marginBlockStart="md"
                    className={styles.accountButtonWrapper}
                  >
                    <AccountButton
                      href={`/accounts/${caccount}/devices/${cid}/transactions`}
                      icon={<Transactions />}
                      title="Overview"
                      description="Transfers"
                    />
                    <AccountButton
                      href={`/accounts/${caccount}/devices/${cid}/send`}
                      icon={<Send />}
                      title="Send"
                      description="Transfers"
                    />
                    <AccountButton
                      href={`/accounts/${caccount}/devices/${cid}/receive`}
                      icon={<Request />}
                      title="Request"
                      description="Transfers"
                    />
                    {[getDevnetNetworkId()].includes(account.networkId) && (
                      <FundButton account={account} />
                    )}
                  </Grid>
                  <Stack
                    marginBlock="lg"
                    flexDirection="row"
                    justifyContent="center"
                  >
                    <Link
                      href={`/accounts/${caccount}/devices/${cid}#${cid}`}
                      className={detailLink}
                    >
                      Account details
                    </Link>
                  </Stack>
                </motion.div>
              )}
            </AnimatePresence>
            {returnUrl && delayedIsActive && (
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
                      Connect
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
