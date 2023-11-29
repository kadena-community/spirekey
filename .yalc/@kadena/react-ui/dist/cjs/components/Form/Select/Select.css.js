"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chevronIconClass = exports.selectClass = exports.iconClass = exports.containerClassDisabled = exports.containerClass = void 0;
const sprinkles_css_1 = require("../../../styles/sprinkles.css");
const vars_css_1 = require("../../../styles/vars.css");
const css_1 = require("@vanilla-extract/css");
const Form_css_1 = require("../Form.css");
exports.containerClass = (0, css_1.style)([
    Form_css_1.baseContainerClass,
    (0, sprinkles_css_1.sprinkles)({
        backgroundColor: {
            lightMode: '$white',
            darkMode: '$background',
        },
        flexGrow: 1,
        gap: '$2',
        paddingLeft: '$4',
        paddingRight: '$2',
    }),
]);
exports.containerClassDisabled = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        pointerEvents: 'none',
        backgroundColor: {
            lightMode: '$gray20',
            darkMode: '$gray60',
        },
        color: {
            lightMode: '$foreground',
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
exports.iconClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        alignItems: 'center',
        display: 'flex',
    }),
]);
exports.selectClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        background: 'none',
        border: 'none',
        color: '$foreground',
        flexGrow: 1,
        outline: 'none',
        paddingRight: '$2',
        paddingY: '$2',
        fontSize: '$base',
    }),
    {
        backgroundColor: 'inherit',
        color: 'inherit',
        appearance: 'none',
    },
]);
exports.chevronIconClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'inline-flex',
        alignItems: 'center',
        marginRight: '$2',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: '$1',
        color: '$gray40',
    }),
    {
        pointerEvents: 'none',
        zIndex: 10,
        selectors: {
            '&:active': {
                color: vars_css_1.vars.colors.$gray40,
            },
        },
    },
]);
//# sourceMappingURL=Select.css.js.map