"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chevronIconClass = exports.selectClass = exports.selectIconClass = exports.selectContainerClassDisabled = exports.selectContainerClass = exports.glowClass = exports.childrenClass = exports.activeLinkClass = exports.linkClass = exports.navListClass = exports.navWrapperClass = exports.logoClass = exports.itemsContainerClass = exports.containerClass = void 0;
const css_1 = require("@vanilla-extract/css");
const styles_1 = require("../../styles");
exports.containerClass = (0, css_1.style)([
    (0, styles_1.atoms)({
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        position: 'relative',
    }),
    {
        height: styles_1.vars.sizes.$16,
        backgroundColor: styles_1.vars.colors.$gray90,
        color: styles_1.vars.colors.$gray40,
    },
]);
exports.itemsContainerClass = (0, css_1.style)([
    (0, styles_1.atoms)({
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflowX: 'auto',
    }),
    {
        paddingLeft: styles_1.vars.sizes.$3,
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
    (0, styles_1.atoms)({
        display: 'flex',
        paddingInline: 'md',
        paddingBlock: 'sm',
    }),
]);
exports.navWrapperClass = (0, css_1.style)([
    (0, styles_1.atoms)({
        alignItems: 'stretch',
        display: 'flex',
        justifyContent: 'center',
    }),
]);
exports.navListClass = (0, css_1.style)([
    (0, styles_1.atoms)({
        alignItems: 'stretch',
        display: 'flex',
        justifyContent: 'center',
    }),
    {
        listStyle: 'none',
        paddingInlineStart: '1rem',
        zIndex: 1,
    },
]);
exports.linkClass = (0, css_1.style)([
    (0, styles_1.atoms)({
        alignItems: 'center',
        display: 'flex',
        fontSize: 'sm',
        fontWeight: 'bodyFont.black',
        textDecoration: 'none',
    }),
    {
        borderRadius: '1px',
        color: styles_1.vars.colors.$gray40,
        marginRight: styles_1.vars.sizes.$6,
        margin: `0 ${styles_1.vars.sizes.$1}`,
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
    {
        backgroundColor: styles_1.vars.colors.$white,
        color: styles_1.vars.colors.$gray90,
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
    (0, styles_1.atoms)({
        display: 'flex',
    }),
    {
        marginRight: styles_1.vars.sizes.$3,
    },
]);
exports.glowClass = (0, css_1.style)([
    {
        top: 0,
        left: 0,
        pointerEvents: 'none',
        position: 'absolute',
        zIndex: 0,
    },
]);
exports.selectContainerClass = (0, css_1.style)([
    (0, styles_1.atoms)({
        alignItems: 'stretch',
        display: 'flex',
        flexGrow: 1,
        lineHeight: 'lg',
        overflow: 'hidden',
        position: 'relative',
    }),
    {
        paddingLeft: styles_1.vars.sizes.$4,
        paddingRight: styles_1.vars.sizes.$2,
        backgroundColor: styles_1.vars.colors.$gray90,
        borderRadius: '1px',
        border: `1px solid ${styles_1.vars.colors.$gray40}`,
        selectors: {
            '&:active': {
                color: styles_1.vars.colors.$gray40,
            },
        },
    },
]);
exports.selectContainerClassDisabled = (0, css_1.style)([
    {
        backgroundColor: styles_1.vars.colors.$gray20,
        color: styles_1.vars.colors.$gray100,
    },
]);
exports.selectIconClass = (0, css_1.style)([
    (0, styles_1.atoms)({
        alignItems: 'center',
        display: 'flex',
    }),
    {
        color: styles_1.vars.colors.$gray40,
        selectors: {
            '&:active': {
                color: styles_1.vars.colors.$gray40,
            },
        },
    },
]);
exports.selectClass = (0, css_1.style)([
    (0, styles_1.atoms)({
        background: 'none',
        border: 'none',
        flexGrow: 1,
        outline: 'none',
        fontSize: 'base',
    }),
    {
        backgroundColor: 'inherit',
        color: styles_1.vars.colors.$gray40,
        appearance: 'none',
        padding: `${styles_1.vars.sizes.$2} 0`,
        paddingRight: styles_1.vars.sizes.$8,
        paddingLeft: styles_1.vars.sizes.$3,
    },
]);
exports.chevronIconClass = (0, css_1.style)([
    (0, styles_1.atoms)({
        position: 'absolute',
        display: 'inline-flex',
        alignItems: 'center',
        top: 0,
        bottom: 0,
    }),
    {
        right: styles_1.vars.sizes.$1,
        color: styles_1.vars.colors.$gray40,
        marginRight: styles_1.vars.sizes.$2,
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