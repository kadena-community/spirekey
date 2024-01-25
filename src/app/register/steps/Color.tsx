// import { Picker, PickerItem } from '@/components/Picker/Picker';
import { Heading } from '@kadena/react-ui';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { animationVariants } from '../animation';

interface Props {
  isVisible: boolean;
}

export const Color: FC<Props> = ({ isVisible }) => {
  const { register } = useFormContext();

  return (
    <motion.div
      animate={isVisible ? 'visible' : 'hidden'}
      variants={animationVariants}
    >
      <Heading>Color</Heading>
      <div>
        <input {...register('color')} type="radio" value="red" id="color-red" />
        <label htmlFor="color-red">Red</label>
        <br />

        <input
          {...register('color')}
          type="radio"
          value="yellow"
          id="color-yellow"
        />
        <label htmlFor="color-yellow">Yellow</label>
        <br />

        <input
          {...register('color')}
          type="radio"
          value="green"
          id="color-green"
        />
        <label htmlFor="color-green">Green</label>
      </div>

      {/* <Picker
        label="Color"
        description="Please pick a color"
        selectionMode="single"
      >
        <PickerItem>Green</PickerItem>
        <PickerItem>Red</PickerItem>
      </Picker> */}
    </motion.div>
  );
};
