import { Heading, Text } from '@kadena/react-ui';
import { motion } from 'framer-motion';
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

      {['testnet04', 'fast-development'].includes(selectedNetwork) && (
        <Text>For development purposes only</Text>
      )}

      <div>
        <input
          {...register('networkId')}
          type="radio"
          value="mainnet01"
          id="network-mainnet"
        />
        <label htmlFor="network-mainnet">Mainnet</label>
        <br />

        <input
          {...register('networkId')}
          type="radio"
          value="testnet04"
          id="network-testnet"
        />
        <label htmlFor="network-testnet">Testnet</label>
        <br />

        <input
          {...register('networkId')}
          type="radio"
          value="fast-development"
          id="network-devnet"
        />
        <label htmlFor="network-devnet">Devnet</label>
      </div>
    </motion.div>
  );
};
