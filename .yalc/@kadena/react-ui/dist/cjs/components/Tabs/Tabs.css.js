"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tabsContainerWrapper = exports.selectorLine = exports.selectedClass = exports.tabClass = exports.tabsContainer = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const vars_css_1 = require("../../styles/vars.css");
const css_1 = require("@vanilla-extract/css");
exports.tabsContainer = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
        marginBottom: '$4',
    }),
    {
        borderBottom: `${vars_css_1.vars.sizes.$0} solid ${vars_css_1.vars.colors.$neutral2}`,
        selectors: {
            [`${vars_css_1.darkThemeClass} &`]: {
                borderBottom: `${vars_css_1.vars.sizes.$0} solid ${vars_css_1.vars.colors.$neutral3}`,
            },
        },
    },
]);
exports.tabClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        border: 'none',
        cursor: 'pointer',
        paddingY: '$2',
        fontSize: '$md',
        backgroundColor: 'transparent',
        color: '$neutral4',
    }),
    {
        whiteSpace: 'nowrap',
    },
]);
exports.selectedClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        fontWeight: '$bold',
    }),
    {
        color: vars_css_1.vars.colors.$primaryContrastInverted,
    },
]);
exports.selectorLine = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        position: 'absolute',
        display: 'block',
        backgroundColor: {
            darkMode: '$neutral6',
            lightMode: '$primaryAccent',
        },
        width: 0,
        height: '$0',
    }),
    {
        bottom: '-2px',
        transition: 'transform .4s ease, width .4s ease',
        transform: `translateX(0)`,
    },
]);
exports.tabsContainerWrapper = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'flex',
        width: '100%',
    }),
    {
        overflowY: 'scroll',
    },
]);
//# sourceMappingURL=Tabs.css.js.map