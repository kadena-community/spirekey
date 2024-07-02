import { SpireKeyKdacolorLogoGreen } from '@kadena/react-icons/product';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import Fingerprint from '../icons/Fingerprint/Fingerprint';
import Card from './Card';
import * as styles from './Card.css';

interface Props {
  isInProgress: boolean;
  isSuccessful: boolean;
  children?: React.ReactNode;
}

export default function PasskeyCard({
  isInProgress,
  isSuccessful,
  children,
}: Props) {
  const [isDone, setIsDone] = useState<boolean>(false);

  return (
    <Card balancePercentage={50}>
      <div className={styles.icon}>
        <AnimatePresence>
          {!isDone && (
            <motion.div
              key="fingerprint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Fingerprint
                animating={isInProgress}
                success={isSuccessful}
                onSuccessAnimationEnd={() => setIsDone(true)}
              />
            </motion.div>
          )}
          {isDone && (
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
