"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boldClass = exports.colorVariant = exports.transformVariant = exports.fontVariant = exports.sizeVariant = exports.elementVariant = void 0;
const sprinkles_css_1 = require("../../../styles/sprinkles.css");
const css_1 = require("@vanilla-extract/css");
const typography_css_1 = require("../typography.css");
exports.elementVariant = (0, css_1.styleVariants)({
    p: [(0, sprinkles_css_1.sprinkles)({ fontWeight: '$normal' })],
    span: [(0, sprinkles_css_1.sprinkles)({ fontWeight: '$normal' })],
    code: [(0, sprinkles_css_1.sprinkles)({ fontWeight: '$normal' })],
});
exports.sizeVariant = (0, css_1.styleVariants)({
    sm: [(0, sprinkles_css_1.sprinkles)({ fontSize: '$xs' })],
    md: [(0, sprinkles_css_1.sprinkles)({ fontSize: '$sm' })],
    lg: [(0, sprinkles_css_1.sprinkles)({ fontSize: '$base' })],
});
exports.fontVariant = (0, css_1.styleVariants)(typography_css_1.fontVariants);
exports.transformVariant = (0, css_1.styleVariants)(typography_css_1.transformVariants);
exports.colorVariant = (0, css_1.styleVariants)(typography_css_1.colorVariants);
exports.boldClass = (0, css_1.style)([(0, sprinkles_css_1.sprinkles)({ fontWeight: '$semiBold' })]);
//# sourceMappingURL=Text.css.js.map