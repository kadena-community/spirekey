import { SurfaceCard } from '@/components/SurfaceCard/SurfaceCard';
import { Text } from '@kadena/react-ui';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { animationVariants } from '../animation';
import { descriptionEmphasis, item, itemContainer } from './steps.css';

import { DeviceDesktop } from '@/components/icons/DeviceDesktop';
import { DevicePhone } from '@/components/icons/DevicePhone';
import { DeviceSecurityKey } from '@/components/icons/DeviceSecurityKey';
import { customTokens } from '@/styles/tokens.css';
import { token } from '@kadena/react-ui/styles';

interface Props {
  isVisible: boolean;
}

const deviceTypes: Record<string, string> = {
  'security-key': 'Security Key',
  phone: 'Phone',
  desktop: 'Desktop',
};

export const DeviceType: FC<Props> = ({ isVisible }) => {
  const { register, watch } = useFormContext();

  const selectedDeviceType = watch('deviceType');

  const getDescription = () => {
    return (
      <Text>
        <Text className={descriptionEmphasis}>
          {deviceTypes[selectedDeviceType]}
        </Text>{' '}
        selected as device type.
      </Text>
    );
  };

  return (
    <motion.div
      animate={isVisible ? 'visible' : 'hidden'}
      variants={animationVariants}
    >
      <SurfaceCard title="Device Type" description={getDescription()}>
        <div className={itemContainer}>
          <div>
            <input
              {...register('deviceType')}
              type="radio"
              value="security-key"
              id="deviceType-security-key"
            />
            <label htmlFor="deviceType-security-key" className={item}>
              <DeviceSecurityKey />
            </label>
          </div>

          <input
            {...register('deviceType')}
            type="radio"
            value="phone"
            id="deviceType-phone"
          />
          <label htmlFor="deviceType-phone" className={item}>
            <DevicePhone />
          </label>

          <input
            {...register('deviceType')}
            type="radio"
            value="desktop"
            id="deviceType-desktop"
          />
          <label htmlFor="deviceType-desktop" className={item}>
            <DeviceDesktop />
          </label>
        </div>
      </SurfaceCard>

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
