import { Surface } from '@/components/Surface/Surface';
import { Heading, SystemIcon, Text } from '@kadena/react-ui';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { animationVariants } from '../animation';
import { item, itemContainer } from './icons.css';

interface Props {
  isVisible: boolean;
}

export const Network: FC<Props> = ({ isVisible }) => {
  const { register, watch } = useFormContext();

  const selectedNetwork = watch('network');

  return (
    <motion.div
      animate={isVisible ? 'visible' : 'hidden'}
      variants={animationVariants}
    >
      <Heading variant="h5">Network</Heading>

      {['testnet04', 'fast-development'].includes(selectedNetwork) && (
        <Text>For development purposes only</Text>
      )}

      <Surface>
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
              <SystemIcon.Earth size="xl" />
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
              <SystemIcon.CarBrakeParking size="xl" />
            </label>
          </div>
          <div>
            <input
              {...register('networkId')}
              aria-label="Devnet"
              type="radio"
              value="fast-development"
              id="network-devnet"
            />
            <label htmlFor="network-devnet" className={item}>
              <SystemIcon.ApplicationBrackets size="xl" />
            </label>
          </div>
        </div>
      </Surface>
    </motion.div>
  );
};
