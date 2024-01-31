// import { Picker, PickerItem } from '@/components/Picker/Picker';
import { Surface } from '@/components/Surface/Surface';
import { customTokens } from '@/styles/tokens.css';
import { deviceColors } from '@/utils/deviceColors';
import { Box, Heading, Text } from '@kadena/react-ui';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { animationVariants } from '../animation';
import { color } from './Color.css';

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
      <Heading variant="h5">Color</Heading>

      <Text>
        This color helps you to identify this account. The color is only stored
        on your device and cannot been seen by others.
      </Text>

      <Surface>
        {Object.entries(deviceColors).map(([description, colorHex]) => {
          return (
            <>
              <input
                {...register('color')}
                type="radio"
                value={colorHex}
                id={`color-${colorHex}`}
              />
              <label
                htmlFor={`color-${colorHex}`}
                aria-label={`Color ${description}`}
              >
                <Box
                  className={color}
                  style={{ backgroundColor: colorHex }}
                ></Box>
              </label>
              <br />
            </>
          );
        })}
      </Surface>

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
