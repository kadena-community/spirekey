import { NetworkDevnet } from '@/components/icons/NetworkDevnet';
import { NetworkMainnet } from '@/components/icons/NetworkMainnet';
import { NetworkTestnet } from '@/components/icons/NetworkTestnet';
import { getNetworkDisplayName } from '@/utils/getNetworkDisplayName';
import { getDevnetNetworkId } from '@/utils/shared/getDevnetNetworkId';
import { Box, Text } from '@kadena/react-ui';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { SurfaceCard } from '../SurfaceCard/SurfaceCard';
import { StepProps } from './Recover';
import { animationVariants } from './animation';
import * as styles from './styles.css';

export const NetworkIdForm: FC<StepProps> = ({
  isVisible,
  stepIndex,
  updateFields,
  defaultValues,
  navigation,
}) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { networkId: defaultValues.networkId },
  });

  const selectedNetwork = watch('networkId');

  const onSubmit = (values: { networkId: string }) => {
    updateFields(values);
    navigation.next();
  };

  const getDescription = () => {
    const dev = ' For development purposes only';

    return (
      <Text>
        <Text className={styles.descriptionEmphasis}>
          {getNetworkDisplayName(selectedNetwork)}
        </Text>{' '}
        selected.
        {['testnet04', 'fast-development', 'development'].includes(
          selectedNetwork,
        )
          ? dev
          : ''}
      </Text>
    );
  };

  return (
    <motion.div
      animate={isVisible ? 'visible' : 'hidden'}
      variants={animationVariants}
    >
      <form
        id={`registration-form-${stepIndex}`}
        onSubmit={() => {
          console.log('HI');
          return handleSubmit(onSubmit);
        }}
      >
        <SurfaceCard
          title="Network"
          description={
            <>
              {getDescription()}
              {errors.networkId && (
                <Box style={{ color: 'red' }}>{errors.networkId.message}</Box>
              )}
            </>
          }
        >
          <div className={styles.itemContainer}>
            <div>
              <input
                {...register('networkId', {
                  onChange: (event) => {
                    updateFields({ networkId: event.target.value });
                  },
                  required: 'Please select a network',
                })}
                aria-label="Mainnet"
                type="radio"
                value="mainnet01"
                id="network-mainnet"
              />
              <label htmlFor="network-mainnet" className={styles.item}>
                <NetworkMainnet />
                <span>Mainnet</span>
              </label>
            </div>
            <div>
              <input
                {...register('networkId', {
                  onChange: (event) => {
                    updateFields({ networkId: event.target.value });
                  },
                  required: 'Please select a network',
                })}
                aria-label="Testnet"
                type="radio"
                value="testnet04"
                id="network-testnet"
              />
              <label htmlFor="network-testnet" className={styles.item}>
                <NetworkTestnet />
                <span>Testnet</span>
              </label>
            </div>
            <div>
              <input
                {...register('networkId', {
                  onChange: (event) => {
                    updateFields({ networkId: event.target.value });
                  },
                  required: 'Please select a network',
                })}
                aria-label="Devnet"
                type="radio"
                value={getDevnetNetworkId()}
                id="network-devnet"
              />
              <label htmlFor="network-devnet" className={styles.item}>
                <NetworkDevnet />
                <span>Devnet</span>
              </label>
            </div>
          </div>
        </SurfaceCard>
      </form>
    </motion.div>
  );
};
