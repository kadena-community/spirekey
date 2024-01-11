"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Heading = exports.HEADING_ELEMENTS = void 0;
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const styles_1 = require("../../../styles");
const typography_css_1 = require("../typography.css");
exports.HEADING_ELEMENTS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
function getHeadingClass(variant, isBold) {
    switch (variant) {
        case 'h2':
            return isBold ? styles_1.fontH2Bold : styles_1.fontH2Regular;
        case 'h3':
            return isBold ? styles_1.fontH3Bold : styles_1.fontH3Regular;
        case 'h4':
            return isBold ? styles_1.fontH4Bold : styles_1.fontH4Regular;
        case 'h5':
            return isBold ? styles_1.fontH5Bold : styles_1.fontH5Regular;
        case 'h6':
            return isBold ? styles_1.fontH6Bold : styles_1.fontH6Regular;
        case 'h1':
        default:
            return isBold ? styles_1.fontH1Bold : styles_1.fontH1Regular;
    }
}
const Heading = ({ as = 'h1', variant = as, color = 'emphasize', transform = 'none', bold = true, children, className, ...props }) => {
    const classList = (0, classnames_1.default)(getHeadingClass(variant, bold), typography_css_1.colorVariants[color], typography_css_1.transformVariants[transform], className);
    const Element = exports.HEADING_ELEMENTS.includes(as) ? as : 'h1';
    return (react_1.default.createElement(Element, { className: classList, ...props }, children));
};
exports.Heading = Heading;
//# sourceMappingURL=Heading.js.map