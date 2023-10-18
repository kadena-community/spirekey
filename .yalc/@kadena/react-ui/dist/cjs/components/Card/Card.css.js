"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disabledClass = exports.stackClass = exports.fullWidthClass = exports.container = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const vars_css_1 = require("../../styles/vars.css");
const css_1 = require("@vanilla-extract/css");
const textColor = (0, css_1.createVar)();
exports.container = (0, css_1.style)([
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
exports.stackClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({ marginY: 0 }),
    {
        selectors: {
            '&:first-child': {
                borderRadius: `${vars_css_1.vars.radii.$sm} ${vars_css_1.vars.radii.$sm} 0 0`,
                borderBottom: 'none',
            },
            '&:last-child': {
                borderRadius: `0 0 ${vars_css_1.vars.radii.$sm} ${vars_css_1.vars.radii.$sm}`,
                borderTop: 'none',
            },
            '&:not(:last-child)': {
                marginBottom: 0,
            },
            '&:not(:first-child)': {
                marginTop: 0,
            },
            '&:not(:last-child):before': {
                content: '',
                position: 'absolute',
                left: vars_css_1.vars.sizes.$lg,
                bottom: 0,
                height: '1px',
                width: `calc(100% - ${vars_css_1.vars.sizes.$lg} - ${vars_css_1.vars.sizes.$lg})`,
                borderBottom: `${vars_css_1.vars.borderWidths.$md} solid ${vars_css_1.vars.colors.$neutral2}`,
            },
        },
    },
]);
exports.disabledClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        backgroundColor: '$neutral1',
        pointerEvents: 'none',
    }),
    {
        border: `${vars_css_1.vars.borderWidths.$md} solid ${vars_css_1.vars.colors.$borderSubtle}`,
        vars: {
            [textColor]: vars_css_1.vars.colors.$neutral3,
        },
    },
]);
//# sourceMappingURL=Card.css.js.map