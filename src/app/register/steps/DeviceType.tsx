import { Heading } from '@kadena/react-ui';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { animationVariants } from '../animation';

interface Props {
  isVisible: boolean;
}

export const DeviceType: FC<Props> = ({ isVisible }) => {
  const { register } = useFormContext();

  return (
    <motion.div
      animate={isVisible ? 'visible' : 'hidden'}
      variants={animationVariants}
    >
      <Heading>Device Type</Heading>
      <div>
        <input
          {...register('deviceType')}
          type="radio"
          value="security-key"
          id="deviceType-security-key"
        />
        <label htmlFor="deviceType-security-key">Security Key</label>
        <br />

        <input
          {...register('deviceType')}
          type="radio"
          value="phone"
          id="deviceType-phone"
        />
        <label htmlFor="deviceType-phone">Phone</label>
        <br />

        <input
          {...register('deviceType')}
          type="radio"
          value="desktop"
          id="deviceType-desktop"
        />
        <label htmlFor="deviceType-desktop">Desktop</label>
      </div>

      {/* <Picker
        label="Icon"
        description="Please pick an icon"
        selectionMode="single"
      >
        <PickerItem>A</PickerItem>
        <PickerItem>B</PickerItem>
        <PickerItem>C</PickerItem>
      </Picker> */}
    </motion.div>
  );
};
