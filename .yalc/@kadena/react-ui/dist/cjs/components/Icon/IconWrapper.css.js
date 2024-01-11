"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sizeVariants = exports.iconContainer = exports.iconFill = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
const css_1 = require("@vanilla-extract/css");
exports.iconFill = (0, css_1.createVar)();
exports.iconContainer = (0, css_1.style)([
    (0, sprinkles_css_1.sprinkles)({
        display: 'block',
    }),
    {
        fill: exports.iconFill,
        color: exports.iconFill,
        transform: 'translate3d(0,0,0)',
    },
]);
exports.sizeVariants = (0, css_1.styleVariants)({
    xs: [(0, sprinkles_css_1.sprinkles)({ size: '$3' })],
    sm: [(0, sprinkles_css_1.sprinkles)({ size: '$4' })],
    md: [(0, sprinkles_css_1.sprinkles)({ size: '$6' })],
    lg: [(0, sprinkles_css_1.sprinkles)({ size: '$8' })],
    xl: [(0, sprinkles_css_1.sprinkles)({ size: '$10' })],
    heroHeader: [(0, sprinkles_css_1.sprinkles)({ size: '$24' })],
});
//# sourceMappingURL=IconWrapper.css.js.map