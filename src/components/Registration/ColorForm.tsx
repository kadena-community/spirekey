import { deviceColors } from '@/styles/tokens.css';
import { Box, Grid, GridItem } from '@kadena/react-ui';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { SurfaceCard } from '../SurfaceCard/SurfaceCard';
import type { FormData, FormUtils } from './Registration';
import {
  colorInput,
  colorLabel,
  colorWrapper,
  selectedColor,
} from './styles.css';

type Props = Pick<FormData, 'color'> & FormUtils;

export function ColorForm({ color, updateFields, direction }: Props) {
  const xPositionMultiplier = direction === 'forward' ? 1 : -1;

  return (
    <AnimatePresence>
      <motion.div
        key="register-step-color"
        initial={{ x: 300 * xPositionMultiplier, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300 * xPositionMultiplier, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <SurfaceCard
          title="Color"
          description="This color helps you to identify this account. The color is only stored
          on your device and cannot been seen by others."
        >
          <Grid gap="md" className={colorWrapper}>
            {Object.entries(deviceColors).map(([description, colorHex]) => {
              return (
                <GridItem key={colorHex}>
                  <input
                    className={colorInput}
                    type="radio"
                    name="color"
                    value={colorHex}
                    id={`color-${colorHex}`}
                    checked={color === colorHex}
                    onChange={(event) =>
                      updateFields({ color: event.target.value })
                    }
                  />
                  <label
                    htmlFor={`color-${colorHex}`}
                    aria-label={`Color ${description}`}
                  >
                    <Box
                      className={classNames(colorLabel, {
                        selected: color === colorHex,
                      })}
                      style={{ backgroundColor: colorHex }}
                    >
                      {color === colorHex && (
                        <div className={selectedColor}></div>
                      )}
                    </Box>
                  </label>
                </GridItem>
              );
            })}
          </Grid>
        </SurfaceCard>
      </motion.div>
    </AnimatePresence>
  );
}
