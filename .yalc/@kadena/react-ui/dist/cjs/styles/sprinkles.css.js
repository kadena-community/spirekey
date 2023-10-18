"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sprinkles = void 0;
const sprinkles_1 = require("@vanilla-extract/sprinkles");
const lodash_mapvalues_1 = __importDefault(require("lodash.mapvalues"));
const themeUtils_1 = require("./themeUtils");
const vars_css_1 = require("./vars.css");
const systemProperties = (0, sprinkles_1.defineProperties)({
    properties: {
        fontFamily: vars_css_1.vars.fonts,
        lineHeight: vars_css_1.vars.lineHeights,
        borderRadius: vars_css_1.vars.radii,
        boxShadow: vars_css_1.vars.shadows,
        borderWidth: vars_css_1.vars.borderWidths,
        borderStyle: ['solid', 'none'],
        cursor: ['pointer', 'not-allowed'],
        flexWrap: ['wrap', 'nowrap'],
        top: vars_css_1.vars.sizes,
        bottom: vars_css_1.vars.sizes,
        left: vars_css_1.vars.sizes,
        right: vars_css_1.vars.sizes,
        flexShrink: [0],
        flexGrow: [0, 1],
        zIndex: [-1, 0, 1],
        border: ['none'],
        outline: ['none'],
        textTransform: ['uppercase', 'lowercase', 'capitalize', 'none'],
        textDecoration: ['underline', 'none'],
        wordBreak: ['normal', 'keep-all', 'break-word', 'break-all'],
        listStyleType: ['none'],
        objectFit: ['cover', 'contain'],
    },
});
const colorProperties = (0, sprinkles_1.defineProperties)({
    conditions: {
        lightMode: {},
        darkMode: { selector: `.${vars_css_1.darkThemeClass} &` },
    },
    defaultCondition: 'lightMode',
    properties: {
        color: { ...vars_css_1.vars.colors, inherit: 'inherit' },
        background: { ...vars_css_1.vars.colors, none: 'none' },
        backgroundColor: { ...vars_css_1.vars.colors, transparent: 'transparent' },
        borderColor: vars_css_1.vars.colors,
    },
    shorthands: {
        bg: ['backgroundColor'],
    },
});
const responsiveProperties = (0, sprinkles_1.defineProperties)({
    conditions: (0, lodash_mapvalues_1.default)(themeUtils_1.breakpoints, (bp) => bp === '' ? {} : { '@media': bp }),
    defaultCondition: 'xs',
    properties: {
        position: ['fixed', 'static', 'absolute', 'relative', 'sticky'],
        display: [
            'none',
            'flex',
            'block',
            'inline',
            'inline-block',
            'grid',
            'inline-flex',
        ],
        flexDirection: ['row', 'row-reverse', 'column', 'column-reverse'],
        justifyContent: [
            'flex-start',
            'center',
            'flex-end',
            'space-around',
            'space-between',
        ],
        alignItems: ['flex-start', 'center', 'flex-end', 'stretch'],
        paddingTop: vars_css_1.vars.sizes,
        paddingBottom: vars_css_1.vars.sizes,
        paddingLeft: vars_css_1.vars.sizes,
        paddingRight: vars_css_1.vars.sizes,
        marginTop: vars_css_1.vars.sizes,
        marginBottom: vars_css_1.vars.sizes,
        marginLeft: { ...vars_css_1.vars.sizes, auto: 'auto' },
        marginRight: { ...vars_css_1.vars.sizes, auto: 'auto' },
        width: {
            ...vars_css_1.vars.sizes,
            '100%': '100%',
            'min-content': 'min-content',
            'max-content': 'max-content',
        },
        minWidth: {
            ...vars_css_1.vars.sizes,
            '100%': '100%',
            'min-content': 'min-content',
            'max-content': 'max-content',
        },
        maxWidth: {
            '100%': '100%',
            maxContent: '42.5rem',
        },
        height: { ...vars_css_1.vars.sizes, '100%': '100%', 'min-content': 'min-content' },
        minHeight: {
            ...vars_css_1.vars.sizes,
            '100%': '100%',
            'min-content': 'min-content',
            'max-content': 'max-content',
        },
        gap: vars_css_1.vars.sizes,
        gridGap: vars_css_1.vars.sizes,
        overflow: ['hidden', 'visible', 'scroll', 'auto'],
        pointerEvents: ['none', 'auto'],
        opacity: [0, 1],
        textAlign: ['left', 'center', 'right'],
        fontSize: vars_css_1.vars.fontSizes,
        fontWeight: vars_css_1.vars.fontWeights,
        whiteSpace: ['nowrap', 'break-spaces', 'normal'],
    },
    shorthands: {
        margin: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
        marginX: ['marginLeft', 'marginRight'],
        marginY: ['marginTop', 'marginBottom'],
        padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
        paddingX: ['paddingLeft', 'paddingRight'],
        paddingY: ['paddingTop', 'paddingBottom'],
        placeItems: ['justifyContent', 'alignItems'],
        size: ['width', 'height'],
    },
});
exports.sprinkles = (0, sprinkles_1.createSprinkles)(systemProperties, colorProperties, responsiveProperties);
//# sourceMappingURL=sprinkles.css.js.map