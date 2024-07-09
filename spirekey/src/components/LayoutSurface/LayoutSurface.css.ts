import { breakpoints, tokens } from '@kadena/kode-ui/styles';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  backgroundColor: tokens.kda.foundation.color.background.layer.default,
  height: '100%',
  width: '100%',
  padding: '32px',
  flexDirection: 'column',
  gap: tokens.kda.foundation.spacing.md,

  '@media': {
    [breakpoints.md]: {
      maxWidth: '680px',
      height: 'auto',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'grid',
      gridTemplateColumns: '2fr 3fr',
      gridTemplateRows: 'auto auto',
      border: `1px solid ${tokens.kda.foundation.color.border.base.subtle}`,
      borderRadius: tokens.kda.foundation.radius.sm,
    },
  },
});

export const logoWrapper = style({
  marginBlockEnd: tokens.kda.foundation.spacing.n4,
  '@media': {
    [breakpoints.md]: {
      marginBlockEnd: 0,
    },
  }
})

export const logo = style({
  gridColumn: '1 / span 1',
  gridRow: '1 / span 1',
  fontSize: '32px',

  '@media': {
    [breakpoints.md]: {
      marginBlockEnd: 0,
      fontSize: '64px',
    },
  },
});

export const text = style({
  gridColumn: '1 / span 1',
  gridRow: '2 / span 1',
});

export const content = style({
  gridColumn: '2 / span 1',
  gridRow: '2 / span 1',
});

export const buttons = style({
  flexDirection: 'row',
  justifyContent: 'space-between',
  '@media': {
    [breakpoints.md]: {
      justifyContent: 'flex-end',
    },
  },
});
