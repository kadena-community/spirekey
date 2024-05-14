import type { Account } from '@/context/AccountsContext';
import { useAccounts } from '@/context/AccountsContext';
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

import { useNotifications } from '@/context/shared/NotificationsContext';
import { getNetworkDisplayName } from '@/utils/getNetworkDisplayName';
import { registerAccountOnChain } from '@/utils/register';
import { getAccountFromChain } from '@/utils/shared/account';
import type { ChainId } from '@kadena/client';
import { Button } from '../shared/Button/Button';
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
  optimistic = false,
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

  const onConnect =
    (url: URL, account: Account, chainId: ChainId) => async () => {
      const remoteAccount = await getAccountFromChain({
        accountName: account.accountName,
        networkId: account.networkId,
        chainId,
      });

      if (remoteAccount) {
        window.location.href = url.toString();
        return;
      }

      /**
       * The account does not exist on the given chain on the network.
       * Create the account on the fly if it has only one device.
       */
      if (account.devices.length !== 1) {
        addNotification({
          variant: 'error',
          title: `This account does not exist on ${getNetworkDisplayName(account.networkId)} on chain ${chainId} and cannot be created on the fly.`,
        });
        return;
      }

      const device = account.devices[0];

      /**
       * Register the account on the chain where it did not exist
       */
      const pendingTransaction = await registerAccountOnChain({
        accountName: account.accountName,
        color: device.color,
        deviceType: device.deviceType,
        domain: device.domain,
        credentialId: device['credential-id'],
        credentialPubkey: device.guard.keys[0],
        networkId: account.networkId,
        chainId: chainId,
      });

      /**
       * Add the pending transaction id to the user object that is shared with the client dApp
       */
      const userParam = url.searchParams.get('user') || '';
      const user = JSON.parse(Buffer.from(userParam, 'base64').toString());
      user.pendingTxIds = [pendingTransaction.requestKey];
      url.searchParams.set(
        'user',
        Buffer.from(JSON.stringify(user)).toString('base64'),
      );

      window.location.href = url.toString();
    };

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
        const user = Buffer.from(
          JSON.stringify({
            alias: account.alias,
            accountName: account.accountName,
            pendingTxIds: [d.pendingRegistrationTx].filter(Boolean),
            credentials: [
              {
                type: 'WebAuthn',
                publicKey: d.guard.keys[0],
                id: d['credential-id'],
              },
            ],
          }),
        ).toString('base64');
        if (url) url.searchParams.set('user', user);
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
                  <Stack
                    marginBlock="lg"
                    flexDirection="row"
                    justifyContent="center"
                  >
                    <Link href={`/accounts/${caccount}`} className={detailLink}>
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
                      className={detailLink}
                    >
                      Add device
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
                  <ButtonLink
                    variant="secondary"
                    href={new URL(returnUrl).toString()}
                  >
                    Cancel
                  </ButtonLink>
                  {(optimistic || !d.pendingRegistrationTx) && (
                    <Button
                      onPress={onConnect(url as URL, account, chainId)}
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
