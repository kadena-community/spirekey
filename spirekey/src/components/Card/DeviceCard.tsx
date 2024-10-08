import type { Account, Device } from '@kadena/spirekey-types';
import { AnimatePresence, motion } from 'framer-motion';
import Fingerprint from '../icons/Fingerprint/Fingerprint';
import AccountNetwork from './AccountNetwork';
import Alias from './Alias';
import Card from './Card';
import CardBalance from './CardBalance';
import DeviceIcons from './DeviceIcons';

type CardProps = {
  color?: string;
  account?: Account;
  device?: Device;
  balancePercentage?: number;
  isLoading?: boolean;
  showSingleIcon?: boolean;
};

export default function DeviceCard({
  color = '#893de7',
  account,
  device,
  balancePercentage = 10,
  isLoading,
  showSingleIcon = false,
}: CardProps) {
  // @todo: check isRegistered for a specific device
  const hasPendingTX = !!account?.devices[0].pendingRegistrationTxs?.length;

  return (
    <Card
      color={color}
      balancePercentage={balancePercentage}
      title={<Alias title={account?.alias} />}
      icons={
        <DeviceIcons
          account={account}
          device={device}
          showSingleIcon={showSingleIcon}
        />
      }
      center={
        <AccountNetwork
          account={account}
          isLoading={isLoading || hasPendingTX}
        />
      }
      cardBalance={<CardBalance account={account} />}
    >
      {isLoading && (
        <AnimatePresence onExitComplete={() => {}}>
          <motion.div
            key="fingerprint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ padding: '32px' }}
          >
            <div>
              <Fingerprint
                animating={true}
                success={false}
                onSuccessAnimationEnd={() => {}}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </Card>
  );
}
