import { atoms, style, styleVariants, token } from '@kadena/kode-ui/styles';

export const stepper = style({});

export const step = style({
  position: 'relative',
  selectors: {
    '&:before': {
      content: '',
      backgroundColor: token('color.background.accent.primary.inverse.default'),
      borderRadius: token('radius.round'),
      height: token('size.n2'),
      width: token('size.n2'),
      transform: 'translateX(-50%)',
    },
    '&:after': {
      content: '',
      position: 'absolute',
      backgroundColor: token('color.background.accent.primary.inverse.default'),
      height: '100%',
      width: '1px',
      transform: 'translateX(-50%)',
    },
    '&[data-active]:before': {
      height: token('size.n4'),
      width: token('size.n4'),
    }
  },
});

export const stepVariants = styleVariants({
  positive: [step, {}],
  error: [step, {}],
  warning: [step, {}],
  pending: [step, {}],
});
