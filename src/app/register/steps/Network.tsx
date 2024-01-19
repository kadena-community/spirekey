import { Heading, Text } from '@kadena/react-ui';
import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { animationVariants } from '../animation';

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
      <Heading>Network</Heading>

      {['testnet', 'devnet'].includes(selectedNetwork) && (
        <Text>For development purposes only</Text>
      )}

      <div>
        <input
          {...register('network')}
          type="radio"
          value="mainnet"
          id="network-mainnet"
        />
        <label htmlFor="network-mainnet">Mainnet</label>

        <input
          {...register('network')}
          type="radio"
          value="testnet"
          id="network-testnet"
        />
        <label htmlFor="network-testnet">Testnet</label>
        <input
          {...register('network')}
          type="radio"
          value="devnet"
          id="network-devnet"
        />
        <label htmlFor="network-devnet">Devnet</label>
      </div>
    </motion.div>
  );
};
