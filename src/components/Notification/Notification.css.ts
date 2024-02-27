import { customTokens } from '@/styles/tokens.css';
import { atoms, tokens } from '@kadena/react-ui/styles';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const wrapper = recipe({
  base: [
    atoms({
      borderRadius: 'xs',
      padding: 'lg',
    }),
    { color: 'white', backdropFilter: 'blur(18px)' },
  ],
  variants: {
    variant: {
      notice: {
        background: `linear-gradient(180deg, ${tokens.kda.foundation.color.background.semantic.info.default} 0%, rgba(0, 0, 0, 0.20) 100%)`,
      },
      warning: {
        background: `linear-gradient(180deg, ${tokens.kda.foundation.color.background.semantic.warning.default} 0%, rgba(0, 0, 0, 0.20) 100%)`,
      },
      success: {
        background: `linear-gradient(180deg, ${tokens.kda.foundation.color.background.semantic.positive.default} 0%, rgba(0, 0, 0, 0.20) 100%)`,
      },
      error: {
        background: `linear-gradient(180deg, ${tokens.kda.foundation.color.background.semantic.negative.default} 0%, rgba(0, 0, 0, 0.20) 100%)`,
      },
    },
  },
  defaultVariants: {
    variant: 'notice',
  },
});

export const headingWrapper = style([
  atoms({
    gap: 'md',
    marginBlockEnd: 'sm',
  }),
  {
    display: 'flex',
    alignItems: 'center',
  },
]);

export const heading = atoms({
  fontWeight: 'headingFont.bold',
  fontSize: 'base',
});

export const message = style({
  color: 'inherit !important',
});
