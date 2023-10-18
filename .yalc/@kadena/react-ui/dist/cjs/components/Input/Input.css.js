"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.outlinedClass = exports.leadingTextWidthVariant = exports.leadingTextWrapperClass = exports.leadingTextClass = exports.inputClass = exports.inputContainerClass = exports.disabledClass = exports.containerClass = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const vars_css_1 = require("../../styles/vars.css");
const css_1 = require("@vanilla-extract/css");
const InputWrapper_css_1 = require("../InputWrapper/InputWrapper.css");
exports.containerClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        alignItems: 'stretch',
        borderRadius: '$sm',
        display: 'flex',
        color: '$foreground',
        overflow: 'hidden',
        lineHeight: '$lg',
        bg: {
            lightMode: '$white',
            darkMode: '$gray100',
        },
    }),
    {
        position: 'relative',
        borderBottom: `1px solid ${(0, css_1.fallbackVar)(InputWrapper_css_1.statusColor, vars_css_1.vars.colors.$gray30)}`,
        selectors: {
            [`${vars_css_1.darkThemeClass} &`]: {
                borderBottom: `1px solid ${(0, css_1.fallbackVar)(InputWrapper_css_1.statusColor, vars_css_1.vars.colors.$gray60)}`,
            },
            '.inputGroup &': {
                borderRadius: 0,
            },
            '.inputGroup &:first-child': {
                borderTopRightRadius: vars_css_1.vars.radii.$sm,
                borderTopLeftRadius: vars_css_1.vars.radii.$sm,
            },
            '.inputGroup &:last-child': {
                borderBottomRightRadius: vars_css_1.vars.radii.$sm,
                borderBottomLeftRadius: vars_css_1.vars.radii.$sm,
            },
        },
    },
]);
exports.disabledClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        pointerEvents: 'none',
        bg: {
            darkMode: '$gray60',
            lightMode: '$gray20',
        },
    }),
    {
        opacity: 0.4,
        selectors: {
            '.inputGroup &': {
                opacity: 1,
            },
            [`${vars_css_1.darkThemeClass} &`]: {
                backgroundColor: vars_css_1.vars.colors.$gray60,
            },
        },
    },
]);
exports.inputContainerClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        gap: '$2',
        lineHeight: '$lg',
        paddingX: '$4',
    }),
]);
exports.inputClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        alignItems: 'center',
        background: 'none',
        border: 'none',
        color: '$foreground',
        outline: 'none',
        flexGrow: 1,
        paddingY: '$2',
    }),
    {
        '::placeholder': {
            color: vars_css_1.vars.colors.$gray40,
        },
        [`${vars_css_1.darkThemeClass} &::placeholder`]: {
            color: vars_css_1.vars.colors.$gray50,
        },
    },
]);
exports.leadingTextClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        overflow: 'hidden',
        display: 'inline-block',
        minWidth: 0,
        alignItems: 'center',
        paddingX: '$4',
    }),
    {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
]);
exports.leadingTextWrapperClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        backgroundColor: {
            lightMode: '$gray20',
            darkMode: '$gray60',
        },
        display: 'flex',
        alignItems: 'center',
    }),
]);
exports.leadingTextWidthVariant = (0, css_1.styleVariants)(vars_css_1.vars.sizes, (size) => {
    return {
        width: size,
    };
});
exports.outlinedClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        borderRadius: '$sm',
    }),
    {
        border: `1px solid ${vars_css_1.vars.colors.$neutral3}`,
    },
]);
//# sourceMappingURL=Input.css.js.map