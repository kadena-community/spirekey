import { style } from '@kadena/kode-ui';
import { responsiveStyle } from '@kadena/kode-ui/styles';

export const cardContainerClass = style([
  {
    display: 'grid',
    gridTemplateAreas: `
                'stepper'
                'context'
                'content'
                'actions'
                `,
  },
]);

export const gridContextPlaceholderClass = style({
  gridArea: 'context',
  minHeight: '30dvh',
});
export const gridContextClass = style({
  position: 'absolute',
  gridArea: 'context',
  background: '#161f29',
  minHeight: '30dvh',
  left: '-2.3rem',
  top: '-2.2rem',
  width: '100vw!important',

  ...responsiveStyle({
    xs: {},
    md: {
      width: '112.3%!important',
    },
  }),
});

export const gridStepperClass = style({
  gridArea: 'stepper',
});
export const gridContentClass = style({
  gridArea: 'content',
});
export const gridActionsClass = style({
  gridArea: 'actions',
});
