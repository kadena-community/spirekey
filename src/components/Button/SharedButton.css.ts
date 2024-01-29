import { customTokens } from '@/styles/tokens.css';
import { atoms, tokens } from '@kadena/react-ui/styles';
import { RecipeVariants, recipe } from '@vanilla-extract/recipes';

export const button = recipe({
  base: [
    atoms({
      borderRadius: 'xs',
      paddingBlock: 'sm',
      paddingInline: 'xl',
      fontWeight: 'headingFont.bold',
      fontSize: 'base',
      border: 'hairline',
      textDecoration: 'none',
    }),
  ],
  variants: {
    color: {
      primary: {
        backgroundColor: customTokens.color.accent,
        color: tokens.kda.foundation.color.text.base.inverse.default,
      },
      secondary: {
        color: customTokens.color.buttonText,
        backgroundColor: customTokens.color.surface,
        backdropFilter: 'blur(18px)',
      },
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

export type Variants = Omit<
  NonNullable<RecipeVariants<typeof button>>,
  'onlyIcon'
>;
