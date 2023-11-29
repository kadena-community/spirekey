"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iconTextClass = exports.iconButtonClass = exports.linkClass = exports.footerPanel = exports.containerClass = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const vars_css_1 = require("../../styles/vars.css");
const css_1 = require("@vanilla-extract/css");
exports.containerClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        maxWidth: { xs: '$maxContentWidth', sm: '100%' },
        height: 'min-content',
        alignItems: 'stretch',
        display: 'flex',
        flexDirection: {
            xs: 'column',
            sm: 'row',
        },
        justifyContent: 'space-between',
        overflow: 'hidden',
        backgroundColor: '$layoutSurfaceSubtle',
        color: '$gray40',
    }),
    {
        selectors: {
            '&:hover': {
                textDecoration: 'none',
            },
            '&:active': {
                color: vars_css_1.vars.colors.$negativeContrast,
            },
        },
    },
]);
exports.footerPanel = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        width: 'max-content',
        border: 'none',
        alignItems: 'center',
        lineHeight: '$lg',
        display: 'flex',
        flexDirection: {
            xs: 'column',
            sm: 'row',
        },
        paddingX: '$4',
        paddingY: '$2',
        gap: '$2',
        justifyContent: 'center',
        marginX: {
            xs: 'auto',
            sm: 0,
        },
    }),
]);
exports.linkClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'flex',
        fontSize: '$xs',
        marginX: '$1',
        textDecoration: 'underline',
        color: 'inherit',
    }),
    {
        textDecorationColor: 'inherit',
    },
    {
        selectors: {
            '&:hover': {
                textDecoration: 'none',
            },
            '&:active': {
                textDecoration: 'none',
            },
        },
    },
]);
exports.iconButtonClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'transparent',
        whiteSpace: 'nowrap',
        border: 'none',
        cursor: 'pointer',
        color: '$gray40',
    }),
]);
exports.iconTextClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        marginRight: '$1',
        fontSize: '$xs',
    }),
]);
//# sourceMappingURL=NavFooter.css.js.map