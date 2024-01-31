// import { Picker, PickerItem } from '@/components/Picker/Picker';
import { Surface } from '@/components/Surface/Surface';
import { Heading, Text, TextField } from '@kadena/react-ui';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { animationVariants } from '../animation';

interface Props {
  isVisible: boolean;
}

export const Alias: FC<Props> = ({ isVisible }) => {
  const { register } = useFormContext();

  return (
    <motion.div
      animate={isVisible ? 'visible' : 'hidden'}
      variants={animationVariants}
    >
      <Heading variant="h5">Alias</Heading>

      <Text>
        This alias helps you to identify this account. The alias is only stored
        on your device and cannot been seen by others.
      </Text>

      <Surface>
        <TextField id="alias" placeholder="Your alias" {...register('alias')} />
      </Surface>
    </motion.div>
  );
};
