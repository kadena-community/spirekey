"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.button = void 0;
const css_1 = require("@vanilla-extract/css");
const recipes_1 = require("@vanilla-extract/recipes");
const atoms_css_1 = require("../../styles/atoms.css");
const themeUtils_1 = require("../../styles/themeUtils");
const contract_css_1 = require("../../styles/tokens/contract.css");
const styles_css_1 = require("../../styles/tokens/styles.css");
const IconWrapper_css_1 = require("../Icon/IconWrapper.css");
const bg = (0, css_1.createVar)();
const bgHover = (0, css_1.createVar)();
const fg = (0, css_1.createVar)();
const fgHover = (0, css_1.createVar)();
const focusColor = (0, css_1.createVar)();
const colorVariants = {
    primary: {
        vars: {
            [fg]: (0, themeUtils_1.token)('color.text.brand.primary.inverse.default'),
            [fgHover]: (0, themeUtils_1.token)('color.text.brand.primary.inverse.@hover'),
            [bg]: (0, themeUtils_1.token)('color.background.brand.primary.inverse.default'),
            [bgHover]: (0, themeUtils_1.token)('color.background.brand.primary.inverse.@hover'),
            [focusColor]: (0, themeUtils_1.token)('color.border.brand.primary.@focus'),
            [IconWrapper_css_1.iconFill]: (0, themeUtils_1.token)('color.icon.brand.primary.default'),
        },
    },
    secondary: {
        vars: {
            [fg]: (0, themeUtils_1.token)('color.text.brand.secondary.inverse.default'),
            [fgHover]: (0, themeUtils_1.token)('color.text.brand.secondary.inverse.@hover'),
            [bg]: (0, themeUtils_1.token)('color.background.brand.secondary.inverse.default'),
            [bgHover]: (0, themeUtils_1.token)('color.background.brand.secondary.inverse.@hover'),
            [focusColor]: (0, themeUtils_1.token)('color.border.brand.secondary.@focus'),
            [IconWrapper_css_1.iconFill]: (0, themeUtils_1.token)('color.icon.brand.secondary.default'),
        },
    },
    warning: {
        vars: {
            [fg]: (0, themeUtils_1.token)('color.text.semantic.warning.inverse.default'),
            [fgHover]: (0, themeUtils_1.token)('color.text.semantic.warning.inverse.@hover'),
            [bg]: (0, themeUtils_1.token)('color.background.semantic.warning.inverse.default'),
            [bgHover]: (0, themeUtils_1.token)('color.background.semantic.warning.inverse.@hover'),
            [focusColor]: (0, themeUtils_1.token)('color.border.semantic.warning.@focus'),
            [IconWrapper_css_1.iconFill]: (0, themeUtils_1.token)('color.icon.semantic.warning.default'),
        },
    },
    negative: {
        vars: {
            [fg]: (0, themeUtils_1.token)('color.text.semantic.negative.inverse.default'),
            [fgHover]: (0, themeUtils_1.token)('color.text.semantic.negative.inverse.@hover'),
            [bg]: (0, themeUtils_1.token)('color.background.semantic.negative.inverse.default'),
            [bgHover]: (0, themeUtils_1.token)('color.background.semantic.negative.inverse.@hover'),
            [focusColor]: (0, themeUtils_1.token)('color.border.semantic.negative.@focus'),
            [IconWrapper_css_1.iconFill]: (0, themeUtils_1.token)('color.icon.semantic.negative.default'),
        },
    },
    positive: {
        vars: {
            [fg]: (0, themeUtils_1.token)('color.text.semantic.positive.inverse.default'),
            [fgHover]: (0, themeUtils_1.token)('color.text.semantic.positive.inverse.@hover'),
            [bg]: (0, themeUtils_1.token)('color.background.semantic.positive.inverse.default'),
            [bgHover]: (0, themeUtils_1.token)('color.background.semantic.positive.inverse.@hover'),
            [focusColor]: (0, themeUtils_1.token)('color.border.semantic.positive.@focus'),
            [IconWrapper_css_1.iconFill]: (0, themeUtils_1.token)('color.icon.semantic.positive.default'),
        },
    },
    info: {
        vars: {
            [fg]: (0, themeUtils_1.token)('color.text.semantic.info.inverse.default'),
            [fgHover]: (0, themeUtils_1.token)('color.text.semantic.info.inverse.@hover'),
            [bg]: (0, themeUtils_1.token)('color.background.semantic.info.inverse.default'),
            [bgHover]: (0, themeUtils_1.token)('color.background.semantic.info.inverse.@hover'),
            [focusColor]: (0, themeUtils_1.token)('color.border.semantic.info.@focus'),
            [IconWrapper_css_1.iconFill]: (0, themeUtils_1.token)('color.icon.semantic.info.default'),
        },
    },
};
const focusRing = {
    outline: `${focusColor} solid ${contract_css_1.tokens.kda.foundation.border.width.normal}`,
    outlineOffset: contract_css_1.tokens.kda.foundation.border.width.normal,
};
const buttonReset = (0, css_1.style)({
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
exports.button = (0, recipes_1.recipe)({
    base: [
        buttonReset,
        styles_css_1.bodyBaseBold,
        (0, atoms_css_1.atoms)({
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 'md',
            gap: 'xs',
        }),
        {
            background: 'none',
            border: `${contract_css_1.tokens.kda.foundation.border.width.normal} solid transparent`,
            transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out',
            selectors: {
                '&[data-pressed]': focusRing,
                '&[data-focus-visible]': focusRing,
                '&[data-disabled]': {
                    background: (0, themeUtils_1.token)('color.background.base.@disabled'),
                    color: (0, themeUtils_1.token)('color.text.base.@disabled'),
                    cursor: 'not-allowed',
                    pointerEvents: 'none',
                    vars: {
                        [IconWrapper_css_1.iconFill]: (0, themeUtils_1.token)('color.icon.base.@disabled'),
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
                    [IconWrapper_css_1.iconFill]: fg,
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
                border: `${contract_css_1.tokens.kda.foundation.border.width.normal} solid ${fg}`,
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
                        borderColor: (0, themeUtils_1.token)('color.border.base.@disabled'),
                        color: (0, themeUtils_1.token)('color.text.base.@disabled'),
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
            true: (0, atoms_css_1.atoms)({ padding: 'xs' }),
            false: (0, atoms_css_1.atoms)({ padding: 'sm' }),
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