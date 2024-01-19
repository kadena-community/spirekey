import { Picker, PickerItem } from '@/components/Picker/Picker';
import { Button, Heading } from '@kadena/react-ui';
import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';
import { animationVariants } from '../animation';

interface Props {
  isVisible: boolean;
}

export const Color: FC<Props> = ({ isVisible }) => {
  return (
    <motion.div
      animate={isVisible ? 'visible' : 'hidden'}
      variants={animationVariants}
    >
      <Heading>Color</Heading>
      <Picker
        label="Color"
        description="Please pick a color"
        selectionMode="single"
      >
        <PickerItem>Green</PickerItem>
        <PickerItem>Red</PickerItem>
      </Picker>
    </motion.div>
  );
};
