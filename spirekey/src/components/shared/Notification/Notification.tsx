import { MonoInfo } from '@kadena/kode-icons';
import { Heading, Text } from '@kadena/kode-ui';
import { tokens } from '@kadena/kode-ui/styles';
import { motion } from 'framer-motion';
import { FC } from 'react';
import * as styles from './Notification.css';

interface Props {
  variant: 'notice' | 'warning' | 'success' | 'error';
  title: string;
  message?: string;
}

export const Notification: FC<Props> = ({ variant, title, message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100, transition: { duration: 0.1 } }}
      layout
      className={styles.wrapper({ variant })}
    >
      <header className={styles.headingWrapper}>
        <MonoInfo className={styles.icon({ variant })} />
        <Heading variant="h6" className={styles.heading({ variant })}>
          {title}
        </Heading>
      </header>
      {message && <Text className={styles.textWhite}>{message}</Text>}
    </motion.div>
  );
};
