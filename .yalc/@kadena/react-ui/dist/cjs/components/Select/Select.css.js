"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chevronIconClass = exports.selectClass = exports.iconClass = exports.containerClassDisabled = exports.containerClass = void 0;
const InputWrapper_css_1 = require("../InputWrapper/InputWrapper.css");
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const css_1 = require("@vanilla-extract/css");
const styles_1 = require("../../styles");
exports.containerClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        alignItems: 'stretch',
        backgroundColor: {
            lightMode: '$white',
            darkMode: '$background',
        },
        borderColor: {
            lightMode: '$white',
            darkMode: '$gray60',
        },
        borderRadius: '$sm',
        color: '$foreground',
        display: 'flex',
        flexGrow: 1,
        gap: '$2',
        lineHeight: '$lg',
        overflow: 'hidden',
        paddingLeft: '$4',
        paddingRight: '$2',
        position: 'relative',
    }),
    {
        borderBottom: `1px solid ${(0, css_1.fallbackVar)(InputWrapper_css_1.statusColor, styles_1.vars.colors.$gray30)}`,
        selectors: {
            [`${styles_1.darkThemeClass} &`]: {
                borderBottom: `1px solid ${(0, css_1.fallbackVar)(InputWrapper_css_1.statusColor, styles_1.vars.colors.$gray60)}`,
            },
        },
    },
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
        opacity: 0.4,
        selectors: {
            '.inputGroup &': {
                opacity: 1,
            },
            [`${styles_1.darkThemeClass} &`]: {
                backgroundColor: styles_1.vars.colors.$gray60,
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
                color: styles_1.vars.colors.$gray40,
            },
        },
    },
]);
//# sourceMappingURL=Select.css.js.map