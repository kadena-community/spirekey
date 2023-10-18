"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.navAccordionLinkClass = exports.navAccordionGroupListItemClass = exports.navAccordionGroupListClass = exports.navAccordionGroupIconClass = exports.navAccordionGroupTitleClass = exports.navAccordionGroupButtonClass = exports.navAccordionListItemClass = exports.navAccordionListClass = exports.navAccordionWrapperClass = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const vars_css_1 = require("../../styles/vars.css");
const css_1 = require("@vanilla-extract/css");
exports.navAccordionWrapperClass = (0, css_1.style)({});
exports.navAccordionListClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        listStyleType: 'none',
        margin: 0,
        padding: 0,
    }),
    {
        selectors: {
            '&:last-child': {
                marginBottom: vars_css_1.vars.sizes.$2,
            },
        },
    },
]);
exports.navAccordionListItemClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        alignItems: 'center',
        display: 'flex',
        lineHeight: '$normal',
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        paddingLeft: '$5',
        position: 'relative',
    }),
    {
        selectors: {
            '&:before': {
                content: '·',
                fontSize: vars_css_1.vars.fontSizes.$xl,
                lineHeight: vars_css_1.vars.lineHeights.$normal,
                paddingRight: vars_css_1.vars.sizes.$2,
                verticalAlign: 'middle',
                position: 'absolute',
                left: vars_css_1.vars.sizes.$1,
            },
        },
    },
]);
exports.navAccordionGroupButtonClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        alignItems: 'center',
        marginBottom: 0,
        textAlign: 'left',
    }),
    {
        justifyContent: 'flex-start',
        paddingBottom: '0 !important',
    },
]);
exports.navAccordionGroupTitleClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        fontWeight: '$normal',
        paddingLeft: '$1',
    }),
]);
exports.navAccordionGroupIconClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        color: '$layoutSurfaceOverlay',
    }),
    {
        transform: 'rotate(-90deg)',
        transition: 'transform 0.2s ease',
        selectors: {
            '&.isOpen': {
                transform: 'rotate(0deg)',
            },
        },
    },
]);
exports.navAccordionGroupListClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        margin: 0,
        marginTop: '$2',
        marginBottom: '$2',
        marginLeft: '$2',
        overflow: 'hidden',
        padding: 0,
    }),
    {
        borderLeft: `1px solid ${vars_css_1.vars.colors.$layoutSurfaceSubtle}`,
    },
]);
exports.navAccordionGroupListItemClass = (0, css_1.style)([
    {
        paddingLeft: '0',
    },
]);
exports.navAccordionLinkClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        color: '$layoutSurfaceOverlay',
        paddingY: '$1',
        textDecoration: 'none',
    }),
    {
        selectors: {
            '&:active, &:hover': {
                color: `${vars_css_1.vars.colors.$negativeSurface} !important`,
            },
            '&:hover': {
                textDecoration: 'underline',
            },
            '&:visited': {
                color: `${vars_css_1.vars.colors.$layoutSurfaceOverlay} !important`,
                textDecoration: 'none !important',
            },
            'nav > &': {
                alignItems: 'center',
                borderBottom: `1px solid ${vars_css_1.vars.colors.$borderDefault}`,
                color: vars_css_1.vars.colors.$neutral5,
                display: 'flex',
                fontSize: vars_css_1.vars.fontSizes.$base,
                fontWeight: vars_css_1.vars.fontWeights.$semiBold,
                paddingBottom: vars_css_1.vars.sizes.$2,
                paddingTop: 0,
                textDecoration: 'none',
            },
            'nav > &:hover': {
                color: `${vars_css_1.vars.colors.$neutral5} !important`,
            },
            [`${exports.navAccordionGroupListItemClass} &`]: {
                alignItems: 'center',
                color: vars_css_1.vars.colors.$neutral4,
                display: 'flex',
                fontSize: vars_css_1.vars.fontSizes.$sm,
                marginLeft: vars_css_1.vars.sizes.$2,
                paddingLeft: vars_css_1.vars.sizes.$5,
                position: 'relative',
            },
            [`${exports.navAccordionGroupListItemClass} &:before`]: {
                content: '·',
                fontSize: vars_css_1.vars.fontSizes.$xl,
                left: vars_css_1.vars.sizes.$1,
                lineHeight: vars_css_1.vars.lineHeights.$base,
                paddingRight: vars_css_1.vars.sizes.$2,
                position: 'absolute',
                verticalAlign: 'middle',
            },
        },
    },
]);
//# sourceMappingURL=NavAccordion.css.js.map