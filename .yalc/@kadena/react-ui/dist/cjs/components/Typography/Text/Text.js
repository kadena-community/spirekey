"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const Text_css_1 = require("./Text.css");
const Text = ({ as = 'span', variant = as, font = variant === 'code' ? 'mono' : 'main', bold = false, size = 'lg', color = 'default', transform = 'none', children, }) => {
    const classList = (0, classnames_1.default)(Text_css_1.elementVariant[variant], Text_css_1.fontVariant[font], Text_css_1.sizeVariant[size], Text_css_1.colorVariant[color], Text_css_1.transformVariant[transform], { [Text_css_1.boldClass]: bold });
    switch (as) {
        case 'p':
            return react_1.default.createElement("p", { className: classList }, children);
        case 'code':
            return react_1.default.createElement("code", { className: classList }, children);
        case 'span':
        default:
            return react_1.default.createElement("span", { className: classList }, children);
    }
};
exports.Text = Text;
//# sourceMappingURL=Text.js.map