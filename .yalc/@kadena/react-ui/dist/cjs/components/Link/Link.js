"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = void 0;
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const __1 = require("..");
const Link_css_1 = require("./Link.css");
const Link = ({ asChild = false, block = false, children, icon, iconAlign = 'left', ...restProps }) => {
    const Icon = icon && __1.SystemIcon[icon];
    const linkClasses = (0, classnames_1.default)(Link_css_1.linkContainerClass, {
        [Link_css_1.blockLinkClass]: block,
    });
    const getContents = (linkContents) => (react_1.default.createElement(react_1.default.Fragment, null,
        Icon && iconAlign === 'left' && react_1.default.createElement(Icon, { size: "md" }),
        linkContents,
        Icon && iconAlign === 'right' && react_1.default.createElement(Icon, { size: "md" })));
    if (asChild && react_1.default.isValidElement(children)) {
        return react_1.default.cloneElement(children, {
            ...restProps,
            ...children.props,
            className: linkClasses,
            children: getContents(children.props.children),
        });
    }
    return (react_1.default.createElement("a", { className: linkClasses, ...restProps }, getContents(children)));
};
exports.Link = Link;
//# sourceMappingURL=Link.js.map