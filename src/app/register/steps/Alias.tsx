// import { Picker, PickerItem } from '@/components/Picker/Picker';
import { Heading, TextField } from '@kadena/react-ui';
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
      <Heading>Alias</Heading>
      <TextField id="alias" {...register('alias')} />
    </motion.div>
  );
};
