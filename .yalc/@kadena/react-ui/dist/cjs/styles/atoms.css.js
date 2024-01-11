"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.atoms = exports.colorAtoms = void 0;
const sprinkles_1 = require("@vanilla-extract/sprinkles");
const lodash_mapvalues_1 = __importDefault(require("lodash.mapvalues"));
const themeUtils_1 = require("./themeUtils");
const contract_css_1 = require("./tokens/contract.css");
exports.colorAtoms = (0, themeUtils_1.flattenTokens)({
    inherit: 'inherit',
    currentColor: 'currentColor',
    icon: contract_css_1.tokens.kda.foundation.color.icon,
    text: contract_css_1.tokens.kda.foundation.color.text,
});
const systemProperties = (0, sprinkles_1.defineProperties)({
    properties: {
        background: ['none'],
        backgroundColor: {
            transparent: 'transparent',
            ...(0, themeUtils_1.flattenTokens)(contract_css_1.tokens.kda.foundation.color.background),
        },
        border: {
            none: 'none',
            hairline: contract_css_1.tokens.kda.foundation.border.hairline,
            normal: contract_css_1.tokens.kda.foundation.border.normal,
            thick: contract_css_1.tokens.kda.foundation.border.thick,
        },
        borderColor: (0, themeUtils_1.flattenTokens)(contract_css_1.tokens.kda.foundation.color.border),
        borderRadius: contract_css_1.tokens.kda.foundation.radius,
        borderStyle: ['solid'],
        borderWidth: contract_css_1.tokens.kda.foundation.border.width,
        bottom: [0],
        boxShadow: contract_css_1.tokens.kda.foundation.effect.shadow,
        color: exports.colorAtoms,
        cursor: ['pointer', 'not-allowed'],
        flex: [1],
        flexGrow: [0, 1],
        flexShrink: [0],
        flexWrap: ['wrap', 'nowrap'],
        fontFamily: contract_css_1.tokens.kda.foundation.typography.family,
        fontWeight: (0, themeUtils_1.flattenTokens)(contract_css_1.tokens.kda.foundation.typography.weight),
        height: ['100%'],
        inset: [0],
        left: [0],
        listStyleType: ['none'],
        maxWidth: {
            'content.maxWidth': contract_css_1.tokens.kda.foundation.layout.content.maxWidth,
        },
        minWidth: {
            'content.minWidth': contract_css_1.tokens.kda.foundation.layout.content.minWidth,
        },
        opacity: [0, 1],
        outline: ['none'],
        overflow: ['hidden', 'visible', 'scroll', 'auto'],
        overflowX: ['hidden', 'visible', 'scroll', 'auto'],
        overflowY: ['hidden', 'visible', 'scroll', 'auto'],
        pointerEvents: ['none'],
        position: ['fixed', 'static', 'absolute', 'relative', 'sticky'],
        right: [0],
        textAlign: ['left', 'center', 'right'],
        textDecoration: ['underline', 'none'],
        textTransform: ['uppercase', 'lowercase', 'capitalize', 'none'],
        top: [0],
        whiteSpace: ['nowrap', 'break-spaces', 'normal', 'pre-wrap'],
        width: ['100%'],
        wordBreak: ['normal', 'keep-all', 'break-word', 'break-all'],
        zIndex: [-1, 0, 1],
    },
});
const spacingWithAuto = { ...contract_css_1.tokens.kda.foundation.spacing, auto: 'auto' };
const responsiveProperties = (0, sprinkles_1.defineProperties)({
    conditions: (0, lodash_mapvalues_1.default)(themeUtils_1.breakpoints, (bp) => bp === '' ? {} : { '@media': bp }),
    defaultCondition: 'xs',
    properties: {
        alignItems: ['flex-start', 'center', 'flex-end', 'stretch'],
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
        fontSize: contract_css_1.tokens.kda.foundation.typography.fontSize,
        gap: contract_css_1.tokens.kda.foundation.spacing,
        justifyContent: [
            'flex-start',
            'center',
            'flex-end',
            'space-around',
            'space-between',
        ],
        lineHeight: contract_css_1.tokens.kda.foundation.typography.lineHeight,
        marginBlockEnd: spacingWithAuto,
        marginInlineStart: spacingWithAuto,
        marginInlineEnd: spacingWithAuto,
        marginBlockStart: spacingWithAuto,
        paddingBlockEnd: contract_css_1.tokens.kda.foundation.spacing,
        paddingInlineStart: contract_css_1.tokens.kda.foundation.spacing,
        paddingInlineEnd: contract_css_1.tokens.kda.foundation.spacing,
        paddingBlockStart: contract_css_1.tokens.kda.foundation.spacing,
    },
    shorthands: {
        margin: [
            'marginBlockStart',
            'marginBlockEnd',
            'marginInlineStart',
            'marginInlineEnd',
        ],
        marginInline: ['marginInlineStart', 'marginInlineEnd'],
        marginBlock: ['marginBlockStart', 'marginBlockEnd'],
        padding: [
            'paddingBlockStart',
            'paddingBlockEnd',
            'paddingInlineStart',
            'paddingInlineEnd',
        ],
        paddingInline: ['paddingInlineStart', 'paddingInlineEnd'],
        paddingBlock: ['paddingBlockStart', 'paddingBlockEnd'],
    },
});
exports.atoms = (0, sprinkles_1.createSprinkles)(systemProperties, responsiveProperties);
//# sourceMappingURL=atoms.css.js.map