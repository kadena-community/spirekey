import { Surface } from '@/components/Surface/Surface';
import { SurfaceCard } from '@/components/SurfaceCard/SurfaceCard';
import { NetworkDevnet } from '@/components/icons/NetworkDevnet';
import { NetworkMainnet } from '@/components/icons/NetworkMainnet';
import { NetworkTestnet } from '@/components/icons/NetworkTestnet';
import { getNetworkDisplayName } from '@/utils/getNetworkDisplayName';
import { Text } from '@kadena/react-ui';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { animationVariants } from '../animation';
import { descriptionEmphasis, item, itemContainer } from './steps.css';

interface Props {
  isVisible: boolean;
}

export const Network: FC<Props> = ({ isVisible }) => {
  const { register, watch } = useFormContext();

  const selectedNetwork = watch('networkId');

  const getDescription = () => {
    const dev = ' For development purposes only';
    const main = ' WebAuthn wallets are not yet supported on Mainnet';

    return (
      <Text>
        <Text className={descriptionEmphasis}>
          {getNetworkDisplayName(selectedNetwork)}
        </Text>{' '}
        selected.
        {['testnet04', 'fast-development'].includes(selectedNetwork)
          ? dev
          : main}
      </Text>
    );
  };

  return (
    <motion.div
      animate={isVisible ? 'visible' : 'hidden'}
      variants={animationVariants}
    >
      <SurfaceCard title="Network" description={getDescription()}>
        <div className={itemContainer}>
          <div>
            <input
              {...register('networkId')}
              aria-label="Mainnet"
              type="radio"
              value="mainnet01"
              id="network-mainnet"
            />
            <label htmlFor="network-mainnet" className={item}>
              <NetworkMainnet />
            </label>
          </div>
          <div>
            <input
              {...register('networkId')}
              aria-label="Testnet"
              type="radio"
              value="testnet04"
              id="network-testnet"
            />
            <label htmlFor="network-testnet" className={item}>
              <NetworkTestnet />
            </label>
          </div>
          <div>
            <input
              {...register('networkId')}
              aria-label="Devnet"
              type="radio"
              value="fast-development"
              id="network-devnet"
              required
            />
            <label htmlFor="network-devnet" className={item}>
              <NetworkDevnet />
            </label>
          </div>
        </div>
      </SurfaceCard>
    </motion.div>
  );
};
