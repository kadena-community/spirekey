"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavFooterLink = void 0;
const react_1 = __importDefault(require("react"));
const NavFooter_css_1 = require("./NavFooter.css");
const NavFooterLink = ({ children, asChild = false, ...restProps }) => {
    if (asChild && react_1.default.isValidElement(children)) {
        return react_1.default.cloneElement(children, {
            ...restProps,
            ...children.props,
            className: NavFooter_css_1.linkClass,
            children: children.props.children,
        });
    }
    return (react_1.default.createElement("a", { className: NavFooter_css_1.linkClass, ...restProps, "data-testid": "kda-footer-link-item" }, children));
};
exports.NavFooterLink = NavFooterLink;
//# sourceMappingURL=NavFooterLink.js.map