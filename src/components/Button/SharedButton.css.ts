import { customTokens } from '@/styles/tokens.css';
import { atoms, tokens } from '@kadena/react-ui/styles';
import { globalStyle, style } from '@vanilla-extract/css';
import { RecipeVariants, recipe } from '@vanilla-extract/recipes';

export const button = recipe({
  base: [
    atoms({
      borderRadius: 'xs',
      paddingBlock: 'sm',
      paddingInline: 'xl',
      fontWeight: 'headingFont.bold',
      fontSize: 'base',
      textDecoration: 'none',
      position: 'relative',
      border: 'none',
    }),
  ],
  variants: {
    variant: {
      primary: {
        backgroundColor: customTokens.color.accent,
        color: tokens.kda.foundation.color.text.base.inverse.default,
      },
      secondary: {
        color: customTokens.color.buttonText,
        backgroundColor: customTokens.color.surface,
        backdropFilter: 'blur(18px)',
        border: tokens.kda.foundation.border.hairline,
      },
      progress: {
        background: 'none',
        color: tokens.kda.foundation.color.text.base.inverse.default,
        ':before': {
          content: '""',
          position: 'absolute',
          borderRadius: tokens.kda.foundation.radius.xs,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: customTokens.color.accent,
          zIndex: -1,
        },
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export const progressIndicator = style({
  position: 'absolute',
  borderRadius: tokens.kda.foundation.radius.xs,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: tokens.kda.foundation.color.neutral.n100,
  zIndex: -1,
});

export type Variants = Omit<
  NonNullable<RecipeVariants<typeof button>>,
  'onlyIcon'
>;
