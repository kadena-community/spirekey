import { deviceColors } from '@/styles/shared/tokens.css';
import { responsiveStyle } from '@kadena/react-ui/styles';
import { style, styleVariants } from '@vanilla-extract/css';

export const form = style({
  ...responsiveStyle({
    xs: {
      width: '100%',
    },
    sm: {
      width: '80%',
    },
    md: {
      width: '70%',
    },
    lg: {
      width: '60%',
    },
    xl: {
      width: '40%',
    },
    xxl: {
      width: '30%',
    },
  }),
});

export const input = style({
  display: 'none',
});

export const device = style({
  width: '3rem',
  height: '3rem',
  padding: '0.75rem',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
});

export const selected = style({
  position: 'absolute',
  width: '100%',
  height: '100%',
  border: '3px solid white',
  borderRadius: 'inherit',
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
