import type { Account } from '@kadena-spirekey/types';
import type { ChainId } from '@kadena/client';
import { Grid, Stack } from '@kadena/react-ui';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

import { AccountButton } from '@/components/AccountButton/AccountButton';
import { FundButton } from '@/components/AccountButton/FundButton';
import DeviceCard from '@/components/Card/DeviceCard';
import { Carousel } from '@/components/Carousel/Carousel';
import { Request } from '@/components/icons/Request';
import { Send } from '@/components/icons/Send';
import { Transactions } from '@/components/icons/Transactions';
import { Button } from '@/components/shared/Button/Button';
import { ButtonLink } from '@/components/shared/ButtonLink/ButtonLink';
import { useAccounts } from '@/context/AccountsContext';
import { useNotifications } from '@/context/shared/NotificationsContext';
import { calculateBalancePercentage } from '@/utils/balance';
import { onConnectWith } from '@/utils/connect';
import { getDevnetNetworkId } from '@/utils/shared/getDevnetNetworkId';

import * as styles from './Account.css';

interface AccountProps {
  account: Account;
  isActive?: boolean;
  returnUrl?: string;
  optimistic?: boolean;
  chainId?: ChainId;
}

export function Account({
  account,
  isActive = false,
  returnUrl,
  optimistic = true,
  chainId = process.env.CHAIN_ID as ChainId,
}: AccountProps) {
  const { accounts } = useAccounts();
  const { addNotification } = useNotifications();
  const [delayedIsActive, setDelayedIsActive] = useState(false);

  const balancePercentage = calculateBalancePercentage(account, accounts);

  // We want to delay the rendering of the active state to prevent the height of the cards animating in `CardCollection`
  useEffect(() => {
    if (isActive) {
      setTimeout(() => setDelayedIsActive(true), 500);
    } else {
      setDelayedIsActive(false);
    }
    () => setDelayedIsActive(false);
  }, [isActive]);
  const { push } = useRouter();

  const onConnect = onConnectWith({
    addNotification,
    redirect: push,
  });

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
        const url = returnUrl ? new URL(returnUrl) : '';
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
                  {process.env.ACCOUNT_OPERATIONS === 'true' && (
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
                  )}
                  {process.env.ACCOUNT_OPERATIONS === 'true' && (
                    <>
                      <Stack
                        marginBlock="lg"
                        flexDirection="row"
                        justifyContent="center"
                      >
                        <Link
                          href={`/accounts/${caccount}`}
                          className={styles.detailLink}
                        >
                          Account details
                        </Link>
                      </Stack>
                      <Stack
                        marginBlock="lg"
                        flexDirection="row"
                        justifyContent="center"
                      >
                        <Link
                          href={`/accounts/${caccount}/devices/add`}
                          className={styles.detailLink}
                        >
                          Add device
                        </Link>
                      </Stack>
                    </>
                  )}
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
                  <ButtonLink
                    variant="secondary"
                    href={new URL(returnUrl).toString()}
                  >
                    Cancel
                  </ButtonLink>
                  {(optimistic || !d.pendingRegistrationTxs?.length) && (
                    <Button
                      onPress={onConnect({
                        url,
                        networkId: account.networkId,
                        chainId,
                        account,
                      })}
                      variant="primary"
                    >
                      Connect
                    </Button>
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
