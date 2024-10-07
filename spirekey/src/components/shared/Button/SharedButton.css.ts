import { customTokens } from '@/styles/shared/tokens.css';
import { atoms, tokens } from '@kadena/kode-ui/styles';
import { RecipeVariants, recipe } from '@vanilla-extract/recipes';

export const button = recipe({
  base: [
    atoms({
      borderRadius: 'xs',
      paddingBlock: 'sm',
      paddingInline: 'xl',
      fontWeight: 'primaryFont.bold',
      fontSize: 'base',
      textDecoration: 'none',
      position: 'relative',
      border: 'none',
    }),
    {
      selectors: {
        '&:after': {
          pointerEvents: 'none',
          content: '',
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          padding: '1px',
          border: '1px solid transparent',
          background:
            'linear-gradient(0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.1)) border-box',
          mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor, exclude',
        },
      },
    },
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
      },
      progress: {
        background: 'none',
        color: tokens.kda.foundation.color.text.base.inverse.default,
        ':before': {
          content: '',
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

export type Variants = Omit<
  NonNullable<RecipeVariants<typeof button>>,
  'onlyIcon'
>;
