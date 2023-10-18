"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreadcrumbsItem = void 0;
const react_1 = __importDefault(require("react"));
const Breadcrumbs_css_1 = require("./Breadcrumbs.css");
const BreadcrumbsItem = ({ children, href, asChild = false, }) => {
    if (asChild && react_1.default.isValidElement(children)) {
        return (react_1.default.createElement("li", { className: Breadcrumbs_css_1.itemClass }, react_1.default.cloneElement(children, {
            href,
            className: Breadcrumbs_css_1.linkClass,
            ...children.props,
        })));
    }
    return (react_1.default.createElement("li", { className: Breadcrumbs_css_1.itemClass }, href !== undefined ? (react_1.default.createElement("a", { className: Breadcrumbs_css_1.linkClass, href: href }, children)) : (react_1.default.createElement("span", { className: Breadcrumbs_css_1.spanClass }, children))));
};
exports.BreadcrumbsItem = BreadcrumbsItem;
//# sourceMappingURL=BreadcrumbsItem.js.map