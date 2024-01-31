import { Stack } from '@kadena/react-ui';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import fingerprint from '@/assets/images/fingerprint.svg';
import { SurfaceCard } from '@/components/SurfaceCard/SurfaceCard';
import { animationVariants } from '../animation';

interface Props {
  isVisible: boolean;
  onClick: () => void;
}

export const Fingerprint: FC<Props> = ({ isVisible, onClick }) => {
  return (
    <motion.div
      animate={isVisible ? 'visible' : 'hidden'}
      variants={animationVariants}
    >
      <SurfaceCard
        title="Biometrics"
        description="To secure your account we need you to confirm with your biometrics"
      >
        {/* @TODO move onClick one level up? */}
        <Stack justifyContent="center" alignItems="center" onClick={onClick}>
          <Image src={fingerprint} alt="fingerprint icon" />
        </Stack>
      </SurfaceCard>
    </motion.div>
  );
};
