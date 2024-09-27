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
  minHeight: '37vw',
  ...responsiveStyle({
    md: {
      minHeight: 'auto',
      height: '30vh',
    },
  }),
});
export const gridContextClass = style({
  position: 'absolute',

  gridArea: 'context',
  background: 'transparent',

  minHeight: '30dvw',
  left: '-2.3rem',
  top: '-12vw',
  width: '100vw!important',

  ...responsiveStyle({
    xs: {
      top: '-21vw',
    },

    md: {
      minHeight: '30dvh',
      top: '-8.5rem',
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
