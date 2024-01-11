"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const Tag_css_1 = require("./Tag.css");
const Tag = ({ children, className, ...restProps }) => {
    return (react_1.default.createElement("span", { className: (0, classnames_1.default)(Tag_css_1.tagClass, className), ...restProps }, children));
};
exports.Tag = Tag;
//# sourceMappingURL=Tag.js.map