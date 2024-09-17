import { deviceColors } from '@/styles/shared/tokens.css';
import { style, styleVariants } from '@vanilla-extract/css';

export const device = style({
  width: '3rem',
  minWidth: '3rem',
  height: '3rem',
  padding: '0.75rem',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
});

export const backgroundColors = styleVariants(
  Object.entries(deviceColors).reduce(
    (variants, [, colorHex]) => {
      return {
        ...variants,
        [colorHex]: { backgroundColor: colorHex },
      };
    },
    {} as Record<string, { backgroundColor: string }>,
  ),
);
