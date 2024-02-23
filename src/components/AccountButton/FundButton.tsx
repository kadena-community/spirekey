import { Account } from '@/context/AccountsContext';
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
  const [error, setError] = useState<string>('');

  const handleFundAccount = async () => {
    if (isLoading) return;
    setError('');
    try {
      setIsLoading(true);
      if (!account) throw new Error('No account selected');

      await fundAccount(account);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError('error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }, [error]);

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
            {!error && !isLoading && (
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
