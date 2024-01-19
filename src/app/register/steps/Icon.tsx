import { Picker, PickerItem } from '@/components/Picker/Picker';
import { Heading } from '@kadena/react-ui';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { animationVariants } from '../animation';

interface Props {
  isVisible: boolean;
}

export const Icon: FC<Props> = ({ isVisible }) => {
  return (
    <motion.div
      animate={isVisible ? 'visible' : 'hidden'}
      variants={animationVariants}
    >
      <Heading>Icon</Heading>
      <Picker
        label="Icon"
        description="Please pick an icon"
        selectionMode="single"
      >
        <PickerItem>A</PickerItem>
        <PickerItem>B</PickerItem>
        <PickerItem>C</PickerItem>
      </Picker>
    </motion.div>
  );
};
