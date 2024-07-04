import { SpireKeyKdacolorLogoGreen } from '@kadena/kode-icons/product';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import Fingerprint from '../icons/Fingerprint/Fingerprint';
import Card from './Card';
import * as styles from './Card.css';

interface Props {
  isInProgress: boolean;
  isSuccessful: boolean;
  onSuccessfulAnimationEnd?: () => void;
  children?: React.ReactNode;
}

export default function PasskeyCard({
  isInProgress,
  isSuccessful,
  onSuccessfulAnimationEnd,
  children,
}: Props) {
  const [fingerprintAnimationDone, setFingerprintAnimationDone] =
    useState<boolean>(false);

  return (
    <Card balancePercentage={50} color="#4A9079">
      <div className={styles.icon}>
        <AnimatePresence
          onExitComplete={() => {
            onSuccessfulAnimationEnd?.();
          }}
        >
          {!fingerprintAnimationDone && (
            <motion.div
              key="fingerprint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Fingerprint
                animating={isInProgress}
                success={isSuccessful}
                onSuccessAnimationEnd={() => {
                  setTimeout(() => {
                    setFingerprintAnimationDone(true);
                  }, 1000);
                }}
              />
            </motion.div>
          )}
          {fingerprintAnimationDone && (
            <motion.div
              key="logo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SpireKeyKdacolorLogoGreen className={styles.logo} />
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
