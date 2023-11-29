"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadingTextWidthVariant = exports.inputChildrenClass = exports.leadingTextWrapperClass = exports.leadingTextClass = exports.inputClass = exports.inputContainerClass = exports.disabledClass = void 0;
const sprinkles_css_1 = require("../../../styles/sprinkles.css");
const vars_css_1 = require("../../../styles/vars.css");
const css_1 = require("@vanilla-extract/css");
exports.disabledClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        pointerEvents: 'none',
        bg: {
            darkMode: '$gray60',
            lightMode: '$gray20',
        },
    }),
    {
        selectors: {
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
        paddingLeft: '$4',
        paddingRight: '$2',
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
        fontSize: '$base',
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
exports.inputChildrenClass = (0, css_1.style)([
    {
        marginRight: '-0.5rem',
        paddingTop: '0.125rem',
        paddingBottom: '0.125rem',
        paddingRight: '0.125rem',
    },
]);
exports.leadingTextWidthVariant = (0, css_1.styleVariants)(vars_css_1.vars.sizes, (size) => {
    return {
        width: size,
    };
});
//# sourceMappingURL=Input.css.js.map