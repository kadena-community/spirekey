"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tableClass = exports.thClass = exports.linkButtonClass = exports.trClass = exports.tdClass = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const vars_css_1 = require("../../styles/vars.css");
const css_1 = require("@vanilla-extract/css");
exports.tdClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        paddingY: '$3',
        paddingX: '$4',
        color: '$neutral5',
    }),
    {
        verticalAlign: 'top',
    },
]);
exports.trClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        backgroundColor: '$neutral1',
        height: '$12',
    }),
    {
        selectors: {
            '.stripedClass &:nth-child(even)': {
                background: vars_css_1.vars.colors.$neutral2,
            },
            '.stripedClass &:hover': {
                background: vars_css_1.vars.colors.$blue10,
            },
            [`${vars_css_1.darkThemeClass} .stripedClass &:hover`]: {
                background: vars_css_1.vars.colors.$blue100,
            },
        },
    },
]);
exports.linkButtonClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        marginRight: '$2',
    }),
    {
        float: 'right',
    },
]);
exports.thClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        paddingY: '$3',
        paddingX: '$4',
        backgroundColor: {
            lightMode: '$gray30',
            darkMode: '$gray80',
        },
        color: '$neutral6',
        textAlign: 'left',
    }),
]);
exports.tableClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        backgroundColor: '$neutral2',
        width: '100%',
        borderRadius: '$sm',
        overflow: 'hidden',
    }),
    {
        border: `1px solid ${vars_css_1.vars.colors.$gray30}`,
        borderSpacing: 0,
        selectors: {
            [`${vars_css_1.darkThemeClass} &`]: {
                border: `1px solid ${vars_css_1.vars.colors.$gray60}`,
            },
        },
    },
]);
//# sourceMappingURL=Table.css.js.map