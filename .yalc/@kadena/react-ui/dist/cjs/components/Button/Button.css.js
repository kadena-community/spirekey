"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iconLoadingClass = exports.buttonLoadingClass = exports.alternativeVariant = exports.compactVariant = exports.defaultVariant = exports.typeVariants = exports.colorVariants = exports.activeClass = void 0;
const colors_1 = require("../../styles/colors");
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const vars_css_1 = require("../../styles/vars.css");
const css_1 = require("@vanilla-extract/css");
const backgroundColorHover = (0, css_1.createVar)(), backgroundColorActive = (0, css_1.createVar)(), colorHover = (0, css_1.createVar)(), outlineColorFocus = (0, css_1.createVar)();
exports.activeClass = (0, css_1.style)({
    outlineOffset: '2px',
    outlineWidth: vars_css_1.vars.borderWidths.$md,
    outlineStyle: 'solid',
    outlineColor: outlineColorFocus,
});
const container = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        border: 'none',
        borderRadius: '$sm',
        cursor: 'pointer',
        display: 'flex',
        fontSize: '$base',
        fontWeight: '$semiBold',
        gap: '$2',
        lineHeight: '$normal',
        paddingX: '$4',
        paddingY: '$3',
        placeItems: 'center',
        textDecoration: 'none',
    }),
    {
        selectors: {
            '&[href]': {
                display: 'inline-flex',
            },
        },
        ':hover': {
            color: colorHover,
            backgroundColor: backgroundColorHover,
        },
        ':active': {
            outlineOffset: '2px',
            outlineWidth: vars_css_1.vars.borderWidths.$md,
            outlineStyle: 'solid',
            outlineColor: outlineColorFocus,
        },
        ':focus-visible': {
            outlineOffset: '2px',
            outlineWidth: vars_css_1.vars.borderWidths.$md,
            outlineStyle: 'solid',
            outlineColor: outlineColorFocus,
        },
        ':disabled': {
            opacity: 0.7,
            backgroundColor: colors_1.colorPalette.$gray60,
            color: colors_1.colorPalette.$gray10,
            cursor: 'not-allowed',
            pointerEvents: 'none',
        },
        transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out',
    },
]);
exports.colorVariants = {
    primary: 'primary',
    secondary: 'secondary',
    positive: 'positive',
    warning: 'warning',
    negative: 'negative',
};
exports.typeVariants = {
    default: 'default',
    compact: 'compact',
    alternative: 'alternative',
};
exports.defaultVariant = (0, css_1.styleVariants)(exports.colorVariants, (variant) => {
    return [
        container,
        (0, sprinkles_css_1.sprinkles)({
            bg: `$${variant}Surface`,
            color: `$${variant}Contrast`,
        }),
        {
            vars: {
                [colorHover]: vars_css_1.vars.colors[`$${variant}Contrast`],
                [backgroundColorHover]: vars_css_1.vars.colors[`$${variant}HighContrast`],
                [backgroundColorActive]: vars_css_1.vars.colors[`$${variant}HighContrast`],
                [outlineColorFocus]: vars_css_1.vars.colors[`$${variant}Accent`],
            },
        },
    ];
});
exports.compactVariant = (0, css_1.styleVariants)(exports.colorVariants, (variant) => {
    return [
        container,
        (0, sprinkles_css_1.sprinkles)({
            background: 'none',
            color: `$${variant}ContrastInverted`,
        }),
        {
            padding: `${vars_css_1.vars.sizes.$1} ${vars_css_1.vars.sizes.$1}`,
            vars: {
                [colorHover]: vars_css_1.vars.colors[`$${variant}ContrastInverted`],
                [backgroundColorHover]: 'none',
                [backgroundColorActive]: vars_css_1.vars.colors[`$${variant}HighContrast`],
                [outlineColorFocus]: vars_css_1.vars.colors[`$${variant}Accent`],
            },
        },
    ];
});
exports.alternativeVariant = (0, css_1.styleVariants)(exports.colorVariants, (variant) => {
    return [
        container,
        (0, sprinkles_css_1.sprinkles)({
            bg: `$${variant}LowContrast`,
            color: `$${variant}ContrastInverted`,
        }),
        {
            vars: {
                [colorHover]: vars_css_1.vars.colors[`$${variant}ContrastInverted`],
                [backgroundColorHover]: vars_css_1.vars.colors[`$${variant}SurfaceInverted`],
                [backgroundColorActive]: vars_css_1.vars.colors[`$${variant}HighContrast`],
                [outlineColorFocus]: vars_css_1.vars.colors[`$${variant}Accent`],
            },
        },
    ];
});
const rotate = (0, css_1.keyframes)({
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
});
exports.buttonLoadingClass = (0, css_1.style)({
    pointerEvents: 'none',
});
exports.iconLoadingClass = (0, css_1.style)({
    animationName: rotate,
    animationDuration: '1.5s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
});
//# sourceMappingURL=Button.css.js.map