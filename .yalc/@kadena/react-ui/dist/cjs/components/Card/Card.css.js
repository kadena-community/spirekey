"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disabledClass = exports.fullWidthClass = exports.containerClass = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const vars_css_1 = require("../../styles/vars.css");
const css_1 = require("@vanilla-extract/css");
exports.containerClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        backgroundColor: {
            lightMode: '$gray10',
            darkMode: '$gray90',
        },
        color: {
            lightMode: '$gray100',
            darkMode: '$gray20',
        },
        paddingX: '$10',
        paddingY: '$6',
        borderRadius: '$sm',
        marginY: '$6',
        border: 'none',
        width: 'max-content',
        position: 'relative',
    }),
    {
        border: `1px solid ${vars_css_1.vars.colors.$gray30}`,
        selectors: {
            [`${vars_css_1.darkThemeClass} &`]: {
                border: `1px solid ${vars_css_1.vars.colors.$gray60}`,
            },
        },
    },
]);
exports.fullWidthClass = (0, css_1.style)({
    width: '100%',
});
exports.disabledClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        pointerEvents: 'none',
    }),
    {
        opacity: 0.5,
    },
]);
//# sourceMappingURL=Card.css.js.map