"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconWrapper = void 0;
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const IconWrapper_css_1 = require("./IconWrapper.css");
const IconWrapper = (Component) => {
    const WrappedIcon = ({ size = 'md', ...props }) => (react_1.default.createElement("span", { className: (0, classnames_1.default)(IconWrapper_css_1.iconContainer, IconWrapper_css_1.sizeVariants[size]) },
        react_1.default.createElement(Component, { ...props, height: "100%", width: "100%" })));
    WrappedIcon.displayName = Component.displayName;
    return WrappedIcon;
};
exports.IconWrapper = IconWrapper;
//# sourceMappingURL=IconWrapper.js.map