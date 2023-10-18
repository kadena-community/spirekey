"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.navClass = exports.iconContainer = exports.spanClass = exports.linkClass = exports.itemClass = exports.containerClass = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const vars_css_1 = require("../../styles/vars.css");
const css_1 = require("@vanilla-extract/css");
exports.containerClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'flex',
        padding: 0,
    }),
    {
        flexFlow: 'wrap',
        listStyle: 'none',
    },
]);
exports.itemClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'flex',
        padding: 0,
        color: '$neutral4',
    }),
    {
        whiteSpace: 'nowrap',
        selectors: {
            '&::before': {
                margin: `0 ${vars_css_1.vars.sizes.$2}`,
            },
            '&:not(:first-child):not(:last-child)::before': {
                content: '/',
            },
            '&:last-child::before': {
                content: '∙',
            },
            '&:first-child': {
                fontWeight: 'bold',
            },
            '&:first-child::before': {
                content: '',
                margin: '0',
            },
        },
    },
]);
exports.linkClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'flex',
        color: '$neutral4',
    }),
    {
        textDecoration: 'none',
        selectors: {
            '&:hover': {
                textDecoration: 'underline',
            },
        },
    },
]);
exports.spanClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        marginRight: '$1',
    }),
]);
exports.iconContainer = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'flex',
        marginX: '$2',
    }),
]);
exports.navClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'max-content',
    }),
]);
//# sourceMappingURL=Breadcrumbs.css.js.map