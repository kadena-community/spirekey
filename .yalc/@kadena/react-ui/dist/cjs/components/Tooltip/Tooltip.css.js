"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tooltipPositionVariants = exports.base = void 0;
const atoms_css_1 = require("../../styles/atoms.css");
const index_1 = require("../../styles/index");
const css_1 = require("@vanilla-extract/css");
exports.base = (0, css_1.style)([
    (0, atoms_css_1.atoms)({
        position: 'absolute',
        backgroundColor: 'layer-3.default',
        fontSize: 'sm',
        paddingBlock: 'sm',
        paddingInline: 'md',
        borderRadius: 'md',
        color: 'text.base.default',
        pointerEvents: 'none',
        maxWidth: 'content.maxWidth',
    }),
    {
        width: 'max-content',
        ':before': {
            content: '',
            position: 'absolute',
            borderTop: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderBottom: `6px solid ${index_1.tokens.kda.foundation.color.background['layer-3'].default}`,
            borderLeft: '6px solid transparent',
        },
    },
]);
exports.tooltipPositionVariants = (0, css_1.styleVariants)({
    bottom: [
        exports.base,
        {
            marginTop: index_1.tokens.kda.foundation.spacing.md,
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            ':before': {
                top: '0',
                left: '50%',
                transform: 'translate(-50%, -100%)',
            },
        },
    ],
    top: [
        exports.base,
        {
            marginBottom: index_1.tokens.kda.foundation.spacing.md,
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            ':before': {
                bottom: '0',
                left: '50%',
                transform: 'translate(-50%, 100%) rotate(180deg)',
            },
        },
    ],
    right: [
        exports.base,
        {
            marginLeft: index_1.tokens.kda.foundation.spacing.md,
            left: '100%',
            top: '50%',
            transform: 'translateY(-50%)',
            ':before': {
                top: '50%',
                left: '0',
                transform: 'translate(-100%, -50%) rotate(270deg)',
            },
        },
    ],
    left: [
        exports.base,
        {
            marginRight: index_1.tokens.kda.foundation.spacing.md,
            right: '100%',
            top: '50%',
            transform: 'translateY(-50%)',
            ':before': {
                top: '50%',
                right: '0',
                transform: 'translate(100%, -50%) rotate(90deg)',
            },
        },
    ],
});
//# sourceMappingURL=Tooltip.css.js.map