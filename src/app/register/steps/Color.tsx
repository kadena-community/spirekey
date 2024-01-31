// import { Picker, PickerItem } from '@/components/Picker/Picker';
import { Surface } from '@/components/Surface/Surface';
import { SurfaceCard } from '@/components/SurfaceCard/SurfaceCard';
import { customTokens } from '@/styles/tokens.css';
import { deviceColors } from '@/utils/deviceColors';
import { Box, Grid, GridItem, Heading, Stack, Text } from '@kadena/react-ui';
import classnames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { animationVariants } from '../animation';
import { color, input, selected, wrapper } from './Color.css';

interface Props {
  isVisible: boolean;
}

export const Color: FC<Props> = ({ isVisible }) => {
  const { register, watch } = useFormContext();

  const selectedColor = watch('color');

  return (
    <motion.div
      animate={isVisible ? 'visible' : 'hidden'}
      variants={animationVariants}
    >
      <SurfaceCard
        title="Color"
        description="This color helps you to identify this account. The color is only stored
        on your device and cannot been seen by others."
      >
        <Grid gap="md" className={wrapper}>
          {Object.entries(deviceColors).map(([description, colorHex]) => {
            return (
              <GridItem key={colorHex}>
                <input
                  className={input}
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
                    className={classnames(color, {
                      selected: selectedColor === colorHex,
                    })}
                    style={{ backgroundColor: colorHex }}
                  >
                    {selectedColor === colorHex && (
                      <AnimatePresence>
                        <motion.div
                          initial={{ transform: 'scale(0)', opacity: 0 }}
                          animate={{ transform: 'scale(1)', opacity: 1 }}
                          transition={{ duration: 0.1 }}
                          className={selected}
                        />
                      </AnimatePresence>
                    )}
                  </Box>
                </label>
              </GridItem>
            );
          })}
        </Grid>
      </SurfaceCard>

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
