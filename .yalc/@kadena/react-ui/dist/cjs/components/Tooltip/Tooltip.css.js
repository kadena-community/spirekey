"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tooltipPositionVariants = exports.base = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const vars_css_1 = require("../../styles/vars.css");
const css_1 = require("@vanilla-extract/css");
exports.base = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        position: 'absolute',
        backgroundColor: '$neutral6',
        fontSize: '$sm',
        paddingY: '$xs',
        paddingX: '$sm',
        borderRadius: '$md',
        color: '$neutral1',
        pointerEvents: 'none',
        width: 'max-content',
        maxWidth: '$maxContentWidth',
    }),
    {
        ':before': {
            content: '',
            position: 'absolute',
            borderTop: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderBottom: `6px solid ${vars_css_1.vars.colors.$neutral6}`,
            borderLeft: '6px solid transparent',
        },
    },
]);
exports.tooltipPositionVariants = (0, css_1.styleVariants)({
    bottom: [
        exports.base,
        {
            marginTop: vars_css_1.vars.sizes.$sm,
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
            marginBottom: vars_css_1.vars.sizes.$sm,
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
            marginLeft: vars_css_1.vars.sizes.$sm,
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
            marginRight: vars_css_1.vars.sizes.$sm,
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