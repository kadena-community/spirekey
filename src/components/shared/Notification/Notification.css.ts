import { customTokens } from '@/styles/shared/tokens.css';
import { atoms, tokens } from '@kadena/react-ui/styles';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const wrapper = recipe({
  base: [
    atoms({
      borderRadius: 'xs',
      padding: 'lg',
    }),
    { backdropFilter: 'blur(18px)' },
  ],
  variants: {
    variant: {
      notice: {
        background: `rgba(0, 0, 0, 0.60) linear-gradient(180deg, ${tokens.kda.foundation.color.background.semantic.info.default} 0%, rgba(0, 0, 0, 0.20) 100%)`,
      },
      warning: {
        background: `rgba(0, 0, 0, 0.60) linear-gradient(180deg, ${tokens.kda.foundation.color.background.semantic.warning.default} 0%, rgba(0, 0, 0, 0.20) 100%)`,
      },
      success: {
        background: `rgba(0, 0, 0, 0.60) linear-gradient(180deg, rgba(114, 224, 106, 0.2) 0%, rgba(0, 0, 0, 0.20) 100%)`,
        color: 'rgba(150, 238, 133, 1)',
      },
      error: {
        background: `rgba(0, 0, 0, 0.60) linear-gradient(180deg, rgba(104, 25, 25, 0.2) 0%, rgba(0, 0, 0, 0.20) 100%)`,
        color: 'rgba(244, 160, 160, 1)',
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

// @TODO fix importants
export const icon = recipe({
  variants: {
    variant: {
      notice: {
        color: `rgba(53, 140, 221, 1) !important`,
      },
      warning: {
        color: 'rgba(176, 140, 0, 1) !important',
      },
      success: {
        color: 'rgba(114, 224, 106, 1) !important',
      },
      error: {
        color: 'rgba(221, 53, 53, 1) !important',
      },
    },
  },
  defaultVariants: {
    variant: 'notice',
  },
});

export const heading = recipe({
  base: [
    atoms({
      fontWeight: 'headingFont.bold',
      fontSize: 'base',
    }),
  ],
  variants: {
    variant: {
      notice: {
        color: 'rgba(160, 203, 244, 1) !important',
      },
      warning: {
        color: 'rgba(248, 217, 4, 1) !important',
      },
      success: {
        color: 'rgba(150, 238, 133, 1) !important',
      },
      error: {
        color: 'rgba(244, 160, 160, 1) !important',
      },
    },
    defaultVariants: {
      variant: 'notice',
    },
  },
});
