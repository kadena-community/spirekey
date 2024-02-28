import { Heading, SystemIcon, Text } from '@kadena/react-ui';
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
        <SystemIcon.AlertCircleOutline />
        <Heading variant="h6" className={styles.heading}>
          {title}
        </Heading>
      </header>
      {message && <Text style={{ color: 'inherit' }}>{message}</Text>}
    </motion.div>
  );
};
