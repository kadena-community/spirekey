"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = exports.TEXT_ELEMENTS = void 0;
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const styles_1 = require("../../../styles");
const typography_css_1 = require("../typography.css");
exports.TEXT_ELEMENTS = ['p', 'span', 'code'];
function getFontClass(variant, isBold, type) {
    if (type === 'code' && variant === 'smallest') {
        return isBold ? styles_1.codeSmallestBold : styles_1.codeSmallestRegular;
    }
    if (type === 'code' && variant === 'small') {
        return isBold ? styles_1.codeSmallBold : styles_1.codeSmallRegular;
    }
    if (type === 'code' && variant === 'base') {
        return isBold ? styles_1.codeBaseBold : styles_1.codeBaseRegular;
    }
    if (variant === 'smallest') {
        return isBold ? styles_1.bodySmallestBold : styles_1.bodySmallestRegular;
    }
    if (variant === 'small') {
        return isBold ? styles_1.bodySmallBold : styles_1.bodySmallRegular;
    }
    return isBold ? styles_1.bodyBaseBold : styles_1.bodyBaseRegular;
}
const Text = ({ as = 'span', variant = 'base', bold = false, color = 'default', transform = 'none', children, className, ...props }) => {
    const classList = (0, classnames_1.default)(getFontClass(variant, bold, as), typography_css_1.colorVariants[color], typography_css_1.transformVariants[transform], className);
    const Element = exports.TEXT_ELEMENTS.includes(as) ? as : 'span';
    return (react_1.default.createElement(Element, { className: classList, ...props }, children));
};
exports.Text = Text;
//# sourceMappingURL=Text.js.map