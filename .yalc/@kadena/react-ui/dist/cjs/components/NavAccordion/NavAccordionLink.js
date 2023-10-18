"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavAccordionLink = void 0;
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const NavAccordion_css_1 = require("./NavAccordion.css");
const NavAccordionLink = ({ asChild, children, href, ...restProps }) => {
    if (asChild && react_1.default.isValidElement(children)) {
        return react_1.default.cloneElement(children, {
            ...restProps,
            ...children.props,
            className: NavAccordion_css_1.navAccordionLinkClass,
        });
    }
    return (react_1.default.createElement("a", { className: (0, classnames_1.default)(NavAccordion_css_1.navAccordionLinkClass), href: href }, children));
};
exports.NavAccordionLink = NavAccordionLink;
//# sourceMappingURL=NavAccordionLink.js.map