import type { ChainId } from '@kadena/client';
import { Link as ButtonLink, Stack } from '@kadena/kode-ui';
import type { Account } from '@kadena/spirekey-types';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

import DeviceCard from '@/components/Card/DeviceCard';
import { Carousel } from '@/components/Carousel/Carousel';
import { Button } from '@/components/shared/Button/Button';
import { useAccounts } from '@/context/AccountsContext';
import { useNotifications } from '@/context/shared/NotificationsContext';
import { calculateBalancePercentage } from '@/utils/balance';
import { onConnectWith } from '@/utils/connect';

import { MonoArrowCircleUp, MonoList } from '@kadena/kode-icons/system';
import { CardFooterGroup } from '@kadena/kode-ui/patterns';

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
  chainId = process.env.CHAIN_ID,
}: AccountProps) {
  const { accounts } = useAccounts();
  const { addNotification } = useNotifications();
  const [delayedIsActive, setDelayedIsActive] = useState(false);
  const { push } = useRouter();

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
                    <CardFooterGroup>
                      <ButtonLink
                        href={`/accounts/${caccount}/devices/${cid}/transactions`}
                        startVisual={<MonoList />}
                        variant="outlined"
                      >
                        Transactions
                      </ButtonLink>
                      <ButtonLink
                        href={`/accounts/${caccount}/devices/${cid}/send`}
                        startVisual={<MonoArrowCircleUp />}
                        variant="primary"
                      >
                        Transfers
                      </ButtonLink>
                    </CardFooterGroup>
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
                    variant="outlined"
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
