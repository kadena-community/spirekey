"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.button = void 0;
const css_1 = require("@vanilla-extract/css");
const recipes_1 = require("@vanilla-extract/recipes");
const atoms_css_1 = require("../../styles/atoms.css");
const colors_1 = require("../../styles/colors");
const contract_css_1 = require("../../styles/tokens/contract.css");
const styles_css_1 = require("../../styles/tokens/styles.css");
const vars_css_1 = require("../../styles/vars.css");
const hoverBackgroundColor = (0, css_1.createVar)();
const activeBackgroundColor = (0, css_1.createVar)();
const hoverColor = (0, css_1.createVar)();
const outlineColor = (0, css_1.createVar)();
const backgroundColor = (0, css_1.createVar)();
const color = (0, css_1.createVar)();
const colorVariants = {
    primary: {
        vars: {
            [color]: vars_css_1.vars.colors.$primaryContrast,
            [backgroundColor]: vars_css_1.vars.colors.$primarySurface,
            [hoverBackgroundColor]: vars_css_1.vars.colors.$primaryHighContrast,
            [activeBackgroundColor]: vars_css_1.vars.colors.$primaryHighContrast,
            [hoverColor]: vars_css_1.vars.colors.$primaryContrast,
            [outlineColor]: vars_css_1.vars.colors.$primaryAccent,
        },
    },
    secondary: {
        vars: {
            [color]: vars_css_1.vars.colors.$secondaryContrast,
            [backgroundColor]: vars_css_1.vars.colors.$secondarySurface,
            [hoverBackgroundColor]: vars_css_1.vars.colors.$secondaryHighContrast,
            [activeBackgroundColor]: vars_css_1.vars.colors.$secondaryHighContrast,
            [hoverColor]: vars_css_1.vars.colors.$secondaryContrast,
            [outlineColor]: vars_css_1.vars.colors.$secondaryAccent,
        },
    },
    tertiary: {
        vars: {
            [color]: vars_css_1.vars.colors.$tertiaryContrast,
            [backgroundColor]: vars_css_1.vars.colors.$tertiarySurface,
            [hoverBackgroundColor]: vars_css_1.vars.colors.$tertiaryHighContrast,
            [activeBackgroundColor]: vars_css_1.vars.colors.$tertiaryHighContrast,
            [hoverColor]: vars_css_1.vars.colors.$tertiaryContrast,
            [outlineColor]: vars_css_1.vars.colors.$tertiaryAccent,
        },
    },
    warning: {
        vars: {
            [color]: vars_css_1.vars.colors.$warningContrast,
            [backgroundColor]: vars_css_1.vars.colors.$warningSurface,
            [hoverBackgroundColor]: vars_css_1.vars.colors.$warningHighContrast,
            [activeBackgroundColor]: vars_css_1.vars.colors.$warningHighContrast,
            [hoverColor]: vars_css_1.vars.colors.$warningContrast,
            [outlineColor]: vars_css_1.vars.colors.$warningAccent,
        },
    },
    negative: {
        vars: {
            [color]: vars_css_1.vars.colors.$negativeContrast,
            [backgroundColor]: vars_css_1.vars.colors.$negativeSurface,
            [hoverBackgroundColor]: vars_css_1.vars.colors.$negativeHighContrast,
            [activeBackgroundColor]: vars_css_1.vars.colors.$negativeHighContrast,
            [hoverColor]: vars_css_1.vars.colors.$negativeContrast,
            [outlineColor]: vars_css_1.vars.colors.$negativeAccent,
        },
    },
    positive: {
        vars: {
            [color]: vars_css_1.vars.colors.$positiveContrast,
            [backgroundColor]: vars_css_1.vars.colors.$positiveSurface,
            [hoverBackgroundColor]: vars_css_1.vars.colors.$positiveHighContrast,
            [activeBackgroundColor]: vars_css_1.vars.colors.$positiveHighContrast,
            [hoverColor]: vars_css_1.vars.colors.$positiveContrast,
            [outlineColor]: vars_css_1.vars.colors.$positiveAccent,
        },
    },
    primaryInverted: {
        vars: {
            [color]: vars_css_1.vars.colors.$primaryContrastInverted,
            [backgroundColor]: vars_css_1.vars.colors.$primaryLowContrast,
            [hoverBackgroundColor]: vars_css_1.vars.colors.$primarySurfaceInverted,
            [activeBackgroundColor]: vars_css_1.vars.colors.$primaryHighContrast,
            [hoverColor]: vars_css_1.vars.colors.$primaryContrastInverted,
            [outlineColor]: vars_css_1.vars.colors.$primaryAccent,
        },
    },
    secondaryInverted: {
        vars: {
            [color]: vars_css_1.vars.colors.$secondaryContrastInverted,
            [backgroundColor]: vars_css_1.vars.colors.$secondaryLowContrast,
            [hoverBackgroundColor]: vars_css_1.vars.colors.$secondarySurfaceInverted,
            [activeBackgroundColor]: vars_css_1.vars.colors.$secondaryHighContrast,
            [hoverColor]: vars_css_1.vars.colors.$secondaryContrastInverted,
            [outlineColor]: vars_css_1.vars.colors.$secondaryAccent,
        },
    },
    tertiaryInverted: {
        vars: {
            [color]: vars_css_1.vars.colors.$tertiaryContrastInverted,
            [backgroundColor]: vars_css_1.vars.colors.$tertiaryLowContrast,
            [hoverBackgroundColor]: vars_css_1.vars.colors.$tertiarySurfaceInverted,
            [activeBackgroundColor]: vars_css_1.vars.colors.$tertiaryHighContrast,
            [hoverColor]: vars_css_1.vars.colors.$tertiaryContrastInverted,
            [outlineColor]: vars_css_1.vars.colors.$tertiaryAccent,
        },
    },
    warningInverted: {
        vars: {
            [color]: vars_css_1.vars.colors.$warningContrastInverted,
            [backgroundColor]: vars_css_1.vars.colors.$warningLowContrast,
            [hoverBackgroundColor]: vars_css_1.vars.colors.$warningSurfaceInverted,
            [activeBackgroundColor]: vars_css_1.vars.colors.$warningHighContrast,
            [hoverColor]: vars_css_1.vars.colors.$warningContrastInverted,
            [outlineColor]: vars_css_1.vars.colors.$warningAccent,
        },
    },
    positiveInverted: {
        vars: {
            [color]: vars_css_1.vars.colors.$positiveContrastInverted,
            [backgroundColor]: vars_css_1.vars.colors.$positiveLowContrast,
            [hoverBackgroundColor]: vars_css_1.vars.colors.$positiveSurfaceInverted,
            [activeBackgroundColor]: vars_css_1.vars.colors.$positiveHighContrast,
            [hoverColor]: vars_css_1.vars.colors.$positiveContrastInverted,
            [outlineColor]: vars_css_1.vars.colors.$positiveAccent,
        },
    },
    negativeInverted: {
        vars: {
            [color]: vars_css_1.vars.colors.$negativeContrastInverted,
            [backgroundColor]: vars_css_1.vars.colors.$negativeLowContrast,
            [hoverBackgroundColor]: vars_css_1.vars.colors.$negativeSurfaceInverted,
            [activeBackgroundColor]: vars_css_1.vars.colors.$negativeHighContrast,
            [hoverColor]: vars_css_1.vars.colors.$negativeContrastInverted,
            [outlineColor]: vars_css_1.vars.colors.$negativeAccent,
        },
    },
};
const focusRing = {
    outlineColor,
    outlineStyle: 'solid',
    outlineWidth: contract_css_1.tokens.kda.foundation.border.width.normal,
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
            borderRadius: 'sm',
            gap: 'sm',
            paddingInline: 'md',
            paddingBlock: 'sm',
        }),
        {
            color,
            backgroundColor,
            transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out',
            selectors: {
                '&[data-hovered]': {
                    color: hoverColor,
                    backgroundColor: hoverBackgroundColor,
                },
                '&[data-pressed]': focusRing,
                '&[data-focus-visible]': focusRing,
                '&[data-disabled]': {
                    opacity: 0.7,
                    backgroundColor: colors_1.colorPalette.$gray60,
                    color: colors_1.colorPalette.$gray10,
                    cursor: 'not-allowed',
                    pointerEvents: 'none',
                },
            },
        },
    ],
    variants: {
        variant: colorVariants,
        isCompact: {
            true: {
                paddingInline: vars_css_1.vars.sizes.$1,
                paddingBlock: vars_css_1.vars.sizes.$1,
            },
        },
        isOutlined: {
            true: {
                backgroundColor: 'transparent',
                outlineOffset: 0,
                vars: {
                    [backgroundColor]: 'none',
                    [hoverBackgroundColor]: 'none',
                },
            },
        },
        isLoading: {
            true: {
                pointerEvents: 'none',
            },
        },
        onlyIcon: {
            true: {
                paddingInline: vars_css_1.vars.sizes.$2,
                paddingBlock: vars_css_1.vars.sizes.$2,
            },
        },
    },
    defaultVariants: {
        variant: 'primary',
        isCompact: false,
        isOutlined: false,
    },
});
//# sourceMappingURL=NewButton.css.js.map