import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { atoms } from '../../styles/atoms.css';
import { token } from '../../styles/themeUtils';
import { tokens } from '../../styles/tokens/contract.css';
import { bodyBaseBold } from '../../styles/tokens/styles.css';
import { iconFill } from '../Icon/IconWrapper.css';
const bg = createVar();
const bgHover = createVar();
const fg = createVar();
const fgHover = createVar();
const focusColor = createVar();
const colorVariants = {
    primary: {
        vars: {
            [fg]: token('color.text.brand.primary.inverse.default'),
            [fgHover]: token('color.text.brand.primary.inverse.@hover'),
            [bg]: token('color.background.brand.primary.inverse.default'),
            [bgHover]: token('color.background.brand.primary.inverse.@hover'),
            [focusColor]: token('color.border.brand.primary.@focus'),
            [iconFill]: token('color.icon.brand.primary.default'),
        },
    },
    secondary: {
        vars: {
            [fg]: token('color.text.brand.secondary.inverse.default'),
            [fgHover]: token('color.text.brand.secondary.inverse.@hover'),
            [bg]: token('color.background.brand.secondary.inverse.default'),
            [bgHover]: token('color.background.brand.secondary.inverse.@hover'),
            [focusColor]: token('color.border.brand.secondary.@focus'),
            [iconFill]: token('color.icon.brand.secondary.default'),
        },
    },
    warning: {
        vars: {
            [fg]: token('color.text.semantic.warning.inverse.default'),
            [fgHover]: token('color.text.semantic.warning.inverse.@hover'),
            [bg]: token('color.background.semantic.warning.inverse.default'),
            [bgHover]: token('color.background.semantic.warning.inverse.@hover'),
            [focusColor]: token('color.border.semantic.warning.@focus'),
            [iconFill]: token('color.icon.semantic.warning.default'),
        },
    },
    negative: {
        vars: {
            [fg]: token('color.text.semantic.negative.inverse.default'),
            [fgHover]: token('color.text.semantic.negative.inverse.@hover'),
            [bg]: token('color.background.semantic.negative.inverse.default'),
            [bgHover]: token('color.background.semantic.negative.inverse.@hover'),
            [focusColor]: token('color.border.semantic.negative.@focus'),
            [iconFill]: token('color.icon.semantic.negative.default'),
        },
    },
    positive: {
        vars: {
            [fg]: token('color.text.semantic.positive.inverse.default'),
            [fgHover]: token('color.text.semantic.positive.inverse.@hover'),
            [bg]: token('color.background.semantic.positive.inverse.default'),
            [bgHover]: token('color.background.semantic.positive.inverse.@hover'),
            [focusColor]: token('color.border.semantic.positive.@focus'),
            [iconFill]: token('color.icon.semantic.positive.default'),
        },
    },
    info: {
        vars: {
            [fg]: token('color.text.semantic.info.inverse.default'),
            [fgHover]: token('color.text.semantic.info.inverse.@hover'),
            [bg]: token('color.background.semantic.info.inverse.default'),
            [bgHover]: token('color.background.semantic.info.inverse.@hover'),
            [focusColor]: token('color.border.semantic.info.@focus'),
            [iconFill]: token('color.icon.semantic.info.default'),
        },
    },
};
const focusRing = {
    outline: `${focusColor} solid ${tokens.kda.foundation.border.width.normal}`,
    outlineOffset: tokens.kda.foundation.border.width.normal,
};
const buttonReset = style({
    position: 'relative',
    appearance: 'button',
    WebkitAppearance: 'button',
    textTransform: 'none',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    verticalAlign: 'top',
    touchAction: 'none',
    userSelect: 'none',
    cursor: 'default',
    textDecoration: 'none',
    isolation: 'isolate',
    border: 'none',
    margin: 0,
    ':focus': {
        outline: 'none',
    },
    ':focus-visible': {
        zIndex: 3,
    },
    selectors: {
        '&::-moz-focus-inner': {
            border: 0,
            borderStyle: 'none',
            padding: 0,
            marginBlockStart: '-2PX',
            marginBlockEnd: '-2PX',
        },
    },
});
export const button = recipe({
    base: [
        buttonReset,
        bodyBaseBold,
        atoms({
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 'md',
            gap: 'xs',
        }),
        {
            background: 'none',
            border: `${tokens.kda.foundation.border.width.normal} solid transparent`,
            transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out',
            selectors: {
                '&[data-pressed]': focusRing,
                '&[data-focus-visible]': focusRing,
                '&[data-disabled]': {
                    background: token('color.background.base.@disabled'),
                    color: token('color.text.base.@disabled'),
                    cursor: 'not-allowed',
                    pointerEvents: 'none',
                    vars: {
                        [iconFill]: token('color.icon.base.@disabled'),
                    },
                },
            },
        },
    ],
    variants: {
        color: colorVariants,
        variant: {
            contained: {
                background: bg,
                color: fg,
                transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out',
                selectors: {
                    '&[data-hovered]': {
                        color: fgHover,
                        background: bgHover,
                    },
                },
                vars: {
                    [iconFill]: fg,
                },
            },
            alternative: {
                color: bg,
                background: fg,
                selectors: {
                    '&[data-hovered]': {
                        background: fgHover,
                        color: bgHover,
                    },
                },
            },
            outlined: {
                border: `${tokens.kda.foundation.border.width.normal} solid ${fg}`,
                outline: 'none',
                color: bg,
                background: 'none',
                selectors: {
                    '&[data-hovered]': {
                        borderColor: fgHover,
                    },
                    '&[data-pressed]': {
                        borderColor: focusColor,
                        outline: 'none',
                    },
                    '&[data-focus-visible]': {
                        borderColor: focusColor,
                        outline: 'none',
                    },
                    '&[data-disabled]': {
                        borderColor: token('color.border.base.@disabled'),
                        color: token('color.text.base.@disabled'),
                        background: 'none',
                    },
                },
            },
            text: {
                background: 'none',
                color: bg,
                selectors: {
                    '&[data-hovered]': {
                        color: bgHover,
                        textDecoration: 'underline',
                    },
                    '&[data-pressed]': {
                        color: focusColor,
                        textDecoration: 'underline',
                        outline: 'none',
                    },
                    '&[data-focus-visible]': {
                        color: focusColor,
                        textDecoration: 'underline',
                        outline: 'none',
                    },
                    '&[data-disabled]': {
                        background: 'none',
                    },
                },
            },
        },
        isCompact: {
            true: atoms({ padding: 'xs' }),
            false: atoms({ padding: 'sm' }),
        },
        isLoading: {
            true: {
                pointerEvents: 'none',
            },
        },
    },
    defaultVariants: {
        variant: 'contained',
        color: 'primary',
        isCompact: false,
    },
});
//# sourceMappingURL=SharedButton.css.js.map