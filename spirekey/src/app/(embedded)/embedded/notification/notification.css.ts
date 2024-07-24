import { style } from '@vanilla-extract/css';

import { atoms, token } from '@kadena/kode-ui/styles';

export const wrapper = style([
  atoms({
    borderRadius: 'lg',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    paddingInline: 'sm',
    backgroundColor: 'base.default',
  }),
  {
    selectors: {
      '&:after': {
        content: '',
        position: 'absolute',
        width: '100%',
        height: '100%',
        inset: 0,
        borderRadius: token('radius.lg'),
        border: `${token('border.width.thick')} solid transparent`,
        background:
          'linear-gradient(0deg, var(--card-progress-color-start) 10%, var(--card-progress-color-end)) border-box',
        mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
        maskComposite: 'exclude',
        pointerEvents: 'none',
        clipPath:
          'polygon(0 0, var(--card-progress) 0%, var(--card-progress) 100%, 0 100%)',
      },
    },
  },
]);

export const spireKeyLoader = style({
  width: token('size.n6'),
  height: token('size.n6'),
});

export const notificationButton = style([
  atoms({
    cursor: 'pointer',
    paddingBlock: 'sm',
    paddingInline: 'sm',
    background: 'none',
    border: 'none',
  }),
  {
    ':focus-visible': {
      outline: `${token('color.border.tint.outline')} solid ${token('border.width.normal')}`,
      borderRadius: token('radius.xs'),
    },
  },
]);
