"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorVariants = exports.transformVariants = exports.fontVariants = void 0;
const sprinkles_css_1 = require("../../styles/sprinkles.css");
exports.fontVariants = {
    main: [(0, sprinkles_css_1.sprinkles)({ fontFamily: '$main' })],
    mono: [(0, sprinkles_css_1.sprinkles)({ fontFamily: '$mono' })],
};
exports.transformVariants = {
    uppercase: [(0, sprinkles_css_1.sprinkles)({ textTransform: 'uppercase' })],
    lowercase: [(0, sprinkles_css_1.sprinkles)({ textTransform: 'lowercase' })],
    capitalize: [(0, sprinkles_css_1.sprinkles)({ textTransform: 'capitalize' })],
    none: [(0, sprinkles_css_1.sprinkles)({ textTransform: 'none' })],
};
exports.colorVariants = {
    default: [(0, sprinkles_css_1.sprinkles)({ color: '$neutral4' })],
    emphasize: [(0, sprinkles_css_1.sprinkles)({ color: '$neutral6' })],
};
//# sourceMappingURL=typography.css.js.map