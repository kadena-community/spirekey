"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visibleClass = exports.arrowVariants = exports.container = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const vars_css_1 = require("../../styles/vars.css");
const css_1 = require("@vanilla-extract/css");
exports.container = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        placeItems: 'center',
        gap: '$2',
        borderRadius: '$md',
        paddingX: '$4',
        paddingY: '$3',
        border: 'none',
        fontSize: '$base',
        backgroundColor: '$neutral1',
        color: '$neutral6',
        width: 'max-content',
        position: 'fixed',
        display: 'none',
        pointerEvents: 'none',
    }),
    {
        zIndex: 10,
        top: '50%',
        marginRight: '-50%',
        border: `${vars_css_1.vars.borderWidths.$md} solid ${vars_css_1.vars.colors.$neutral2}`,
    },
]);
const baseArrow = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        position: 'absolute',
        width: '$4',
        height: '$4',
        backgroundColor: '$neutral1',
        pointerEvents: 'none',
    }),
    {
        rotate: '45deg',
    },
]);
exports.arrowVariants = (0, css_1.styleVariants)({
    right: [
        baseArrow,
        {
            top: `calc(50% - ${vars_css_1.vars.sizes.$4} / 2)`,
            left: `calc((-1 * ${vars_css_1.vars.sizes.$4} / 2) - 1px)`,
            borderLeft: `${vars_css_1.vars.borderWidths.$md} solid ${vars_css_1.vars.colors.$neutral2}`,
            borderBottom: `${vars_css_1.vars.borderWidths.$md} solid ${vars_css_1.vars.colors.$neutral2}`,
        },
    ],
    left: [
        baseArrow,
        {
            top: `calc(50% - ${vars_css_1.vars.sizes.$4} / 2)`,
            right: `calc((-1 * ${vars_css_1.vars.sizes.$4} / 2) - 1px)`,
            borderRight: `${vars_css_1.vars.borderWidths.$md} solid ${vars_css_1.vars.colors.$neutral2}`,
            borderTop: `${vars_css_1.vars.borderWidths.$md} solid ${vars_css_1.vars.colors.$neutral2}`,
        },
    ],
    top: [
        baseArrow,
        {
            top: `calc(100% - ${vars_css_1.vars.sizes.$4} / 2)`,
            borderBottom: `${vars_css_1.vars.borderWidths.$md} solid ${vars_css_1.vars.colors.$neutral2}`,
            borderRight: `${vars_css_1.vars.borderWidths.$md} solid ${vars_css_1.vars.colors.$neutral2}`,
        },
    ],
    bottom: [
        baseArrow,
        {
            top: `calc(-1 * ${vars_css_1.vars.sizes.$4} / 2)`,
            borderTop: `${vars_css_1.vars.borderWidths.$md} solid ${vars_css_1.vars.colors.$neutral2}`,
            borderLeft: `${vars_css_1.vars.borderWidths.$md} solid ${vars_css_1.vars.colors.$neutral2}`,
        },
    ],
});
exports.visibleClass = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'flex',
    }),
]);
//# sourceMappingURL=Tooltip.css.js.map