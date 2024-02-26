import { SurfaceCard } from '@/components/SurfaceCard/SurfaceCard';
import { Text } from '@kadena/react-ui';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { animationVariants } from './animation';
import { descriptionEmphasis, item, itemContainer } from './styles.css';

import { DeviceDesktop } from '@/components/icons/DeviceDesktop';
import { DevicePhone } from '@/components/icons/DevicePhone';
import { DeviceSecurityKey } from '@/components/icons/DeviceSecurityKey';
import { StepProps } from './Registration';

const deviceTypes: Record<string, string> = {
  'security-key': 'Security Key',
  phone: 'Phone',
  desktop: 'Desktop',
};

const getDescription = (deviceType: string) => {
  return (
    <Text>
      <Text className={descriptionEmphasis}>{deviceTypes[deviceType]}</Text>{' '}
      selected as device type.
    </Text>
  );
};

export const DeviceTypeForm: FC<StepProps> = ({
  stepIndex,
  isVisible,
  defaultValues,
  updateFields,
  navigation,
}) => {
  const { handleSubmit, register, watch } = useForm({
    defaultValues: { deviceType: defaultValues.deviceType },
  });

  const selectedDeviceType = watch('deviceType');

  const onSubmit = (values: { deviceType: string }) => {
    updateFields(values);
    navigation.next();
  };

  return (
    <motion.div
      animate={isVisible ? 'visible' : 'hidden'}
      variants={animationVariants}
    >
      <form
        id={`registration-form-${stepIndex}`}
        onSubmit={handleSubmit(onSubmit)}
      ></form>
      <SurfaceCard
        title="Device Type"
        description={getDescription(selectedDeviceType)}
      >
        <div className={itemContainer}>
          <div>
            <input
              type="radio"
              value="security-key"
              id="deviceType-security-key"
              {...register('deviceType', {
                onChange: (event) => {
                  updateFields({ deviceType: event.target.value });
                },
              })}
            />
            <label htmlFor="deviceType-security-key" className={item}>
              <DeviceSecurityKey />
            </label>
          </div>

          <input
            type="radio"
            value="phone"
            id="deviceType-phone"
            {...register('deviceType', {
              onChange: (event) => {
                updateFields({ deviceType: event.target.value });
              },
            })}
          />
          <label htmlFor="deviceType-phone" className={item}>
            <DevicePhone />
          </label>

          <input
            type="radio"
            value="desktop"
            id="deviceType-desktop"
            {...register('deviceType', {
              onChange: (event) => {
                updateFields({ deviceType: event.target.value });
              },
            })}
          />
          <label htmlFor="deviceType-desktop" className={item}>
            <DeviceDesktop />
          </label>
        </div>
      </SurfaceCard>
    </motion.div>
  );
};
