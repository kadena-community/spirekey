import { Account } from '@/context/AccountsContext';
import { useNotifications } from '@/context/shared/NotificationsContext';
import { fundAccount } from '@/utils/fund';
import { Box, Stack, SystemIcon, Text } from '@kadena/react-ui';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import { Fund } from '../icons/Fund';
import * as styles from './AccountButton.css';

interface Props {
  account: Account;
}

export const FundButton: FC<Props> = ({ account }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const { addNotification } = useNotifications();

  const handleFundAccount = async () => {
    if (isLoading) return;
    setError('');
    try {
      setIsLoading(true);
      if (!account) throw new Error('No account selected');

      await fundAccount(account);
      setSuccess(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        addNotification({
          variant: 'error',
          title: 'Error funding',
          message: error.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }

    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  }, [error, success]);

  return (
    <Box className={styles.button} onClick={handleFundAccount}>
      <Stack flexDirection="column" className={styles.buttonContent}>
        <Stack className={styles.iconContainer}>
          <AnimatePresence>
            {isLoading && (
              <motion.span
                key="loader"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.2 }}
                className={styles.icon}
              >
                <SystemIcon.Loading className={styles.loader} />
              </motion.span>
            )}
            {!error && !success && !isLoading && (
              <motion.span
                key="fund"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.2 }}
                className={styles.icon}
              >
                <Fund />
              </motion.span>
            )}
            {error && !isLoading && (
              <motion.span
                key="error"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.2 }}
                className={styles.icon}
              >
                <SystemIcon.Close className={styles.error} />
              </motion.span>
            )}
            {success && !isLoading && (
              <motion.span
                key="success"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.2 }}
                className={styles.icon}
              >
                <SystemIcon.Check className={styles.success} />
              </motion.span>
            )}
          </AnimatePresence>
        </Stack>
        <Stack flexDirection="column" paddingBlock="xs">
          <Text className={styles.title}>Fund</Text>
          <Text className={styles.description}>Account</Text>
        </Stack>
      </Stack>
    </Box>
  );
};
