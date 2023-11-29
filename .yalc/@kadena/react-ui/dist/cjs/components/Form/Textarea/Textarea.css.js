"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buttonContainerClass = exports.textAreaClass = exports.textAreaContainerClass = exports.disabledClass = void 0;
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
exports.textAreaContainerClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        position: 'relative',
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        gap: '$2',
        lineHeight: '$lg',
        paddingLeft: '$4',
        paddingRight: '$2',
    }),
]);
exports.textAreaClass = (0, css_1.style)([
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
        minHeight: vars_css_1.vars.sizes.$20,
        resize: 'none',
        '::placeholder': {
            color: vars_css_1.vars.colors.$gray40,
        },
        [`${vars_css_1.darkThemeClass} &::placeholder`]: {
            color: vars_css_1.vars.colors.$gray50,
        },
    },
]);
exports.buttonContainerClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        top: '$2',
        position: 'relative',
    }),
]);
//# sourceMappingURL=Textarea.css.js.map