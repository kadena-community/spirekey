"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chevronIconClass = exports.selectClass = exports.selectIconClass = exports.selectContainerClassDisabled = exports.selectContainerClass = exports.glowClass = exports.childrenClass = exports.activeLinkClass = exports.linkClass = exports.navListClass = exports.navWrapperClass = exports.logoClass = exports.containerClass = void 0;
const css_1 = require("@vanilla-extract/css");
const styles_1 = require("../../styles");
exports.containerClass = (0, css_1.style)([
    (0, styles_1.sprinkles)({
        alignItems: 'stretch',
        backgroundColor: '$gray90',
        color: '$gray40',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        height: '$16',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        position: 'relative',
    }),
    {
        alignItems: 'center',
        selectors: {
            '&:hover': {
                textDecoration: 'none',
            },
            '&:active': {
                color: styles_1.vars.colors.$negativeContrast,
            },
        },
    },
]);
exports.logoClass = (0, css_1.style)([
    (0, styles_1.sprinkles)({
        display: 'flex',
        marginLeft: '$3',
    }),
    {
        zIndex: 1,
    },
]);
exports.navWrapperClass = (0, css_1.style)([
    (0, styles_1.sprinkles)({
        alignItems: 'stretch',
        display: 'flex',
        justifyContent: 'center',
    }),
]);
exports.navListClass = (0, css_1.style)([
    (0, styles_1.sprinkles)({
        alignItems: 'stretch',
        display: 'flex',
        justifyContent: 'center',
    }),
    {
        listStyle: 'none',
        zIndex: 1,
    },
]);
exports.linkClass = (0, css_1.style)([
    (0, styles_1.sprinkles)({
        alignItems: 'center',
        borderRadius: '$sm',
        color: '$gray40',
        display: 'flex',
        fontSize: '$sm',
        fontWeight: '$semiBold',
        marginRight: '$6',
        marginX: '$1',
        textDecoration: 'none',
    }),
    {
        padding: `${styles_1.vars.sizes.$1} ${styles_1.vars.sizes.$2}`,
        transition: 'background 0.1s ease, color 0.1s ease',
    },
    {
        selectors: {
            '&:active': {
                color: styles_1.vars.colors.$gray90,
                textDecoration: 'none',
            },
            '&:hover': {
                color: styles_1.vars.colors.$white,
                textDecoration: 'none',
            },
            '&:focus-visible': {
                color: styles_1.vars.colors.$blue40,
                textDecoration: 'none',
            },
        },
    },
]);
exports.activeLinkClass = (0, css_1.style)([
    (0, styles_1.sprinkles)({
        backgroundColor: '$white',
        color: '$gray90',
    }),
    {
        selectors: {
            '&:hover': {
                color: styles_1.vars.colors.$gray90,
                textDecoration: 'none',
            },
            '&:focus-visible': {
                background: styles_1.vars.colors.$blue40,
                color: styles_1.vars.colors.$gray90,
                textDecoration: 'none',
            },
        },
    },
]);
exports.childrenClass = (0, css_1.style)([
    (0, styles_1.sprinkles)({
        display: 'flex',
        marginLeft: 'auto',
        marginRight: '$3',
    }),
]);
exports.glowClass = (0, css_1.style)([
    (0, styles_1.sprinkles)({
        left: 0,
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        zIndex: 0,
    }),
]);
exports.selectContainerClass = (0, css_1.style)([
    (0, styles_1.sprinkles)({
        alignItems: 'stretch',
        backgroundColor: '$gray90',
        borderRadius: '$sm',
        display: 'flex',
        flexGrow: 1,
        lineHeight: '$lg',
        overflow: 'hidden',
        paddingLeft: '$4',
        paddingRight: '$2',
        position: 'relative',
    }),
    {
        border: `1px solid ${styles_1.vars.colors.$gray40}`,
        selectors: {
            '&:active': {
                color: styles_1.vars.colors.$gray40,
            },
        },
    },
]);
exports.selectContainerClassDisabled = (0, css_1.style)([
    (0, styles_1.sprinkles)({
        backgroundColor: {
            lightMode: '$gray20',
        },
        color: {
            lightMode: '$foreground',
        },
    }),
]);
exports.selectIconClass = (0, css_1.style)([
    (0, styles_1.sprinkles)({
        alignItems: 'center',
        display: 'flex',
        color: '$gray40',
    }),
    {
        selectors: {
            '&:active': {
                color: styles_1.vars.colors.$gray40,
            },
        },
    },
]);
exports.selectClass = (0, css_1.style)([
    (0, styles_1.sprinkles)({
        background: 'none',
        border: 'none',
        color: '$gray40',
        flexGrow: 1,
        outline: 'none',
        paddingRight: '$8',
        paddingLeft: '$sm',
        paddingY: '$2',
        fontSize: '$base',
    }),
    {
        backgroundColor: 'inherit',
        appearance: 'none',
    },
]);
exports.chevronIconClass = (0, css_1.style)([
    (0, styles_1.sprinkles)({
        marginRight: '$2',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: '$1',
        color: '$gray40',
        display: 'inline-flex',
        alignItems: 'center',
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
//# sourceMappingURL=NavHeader.css.js.map