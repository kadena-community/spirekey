import { Box, Grid, GridItem } from "@kadena/react-ui";
import { SurfaceCard } from "../SurfaceCard/SurfaceCard";
import classNames from "classnames";

export function ColorForm() {
  return (
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
                  className={classNames(color, {
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
  )
}