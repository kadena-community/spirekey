import { Box, Grid, GridItem } from "@kadena/react-ui";
import { SurfaceCard } from "../SurfaceCard/SurfaceCard";
import classNames from "classnames";
import { deviceColors } from "@/styles/tokens.css";
import { color as colorStyle, input, selected, wrapper } from './Color.css';
import type { FormData, FormMethods } from "./Registration";

type Props = Pick<FormData, 'color'> & FormMethods;

export function ColorForm({color, updateFields}: Props) {
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
                type="radio"
                name="color"
                value={colorHex}
                id={`color-${colorHex}`}
                checked={color === colorHex}
                onChange={event => updateFields({color: event.target.value})}
              />
              <label
                htmlFor={`color-${colorHex}`}
                aria-label={`Color ${description}`}
              >
                <Box
                  className={classNames(colorStyle, {
                    selected: color === colorHex,
                  })}
                  style={{ backgroundColor: colorHex }}
                >
                  {color === colorHex && (
                    <div className={selected}></div>
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