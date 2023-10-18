"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreadcrumbsContainer = void 0;
const Icon_1 = require("../Icon");
const react_1 = __importDefault(require("react"));
const Breadcrumbs_css_1 = require("./Breadcrumbs.css");
const BreadcrumbsContainer = ({ children, icon, }) => {
    const Icon = icon && Icon_1.ProductIcon[icon];
    return (react_1.default.createElement("nav", { className: Breadcrumbs_css_1.navClass, "data-testid": "kda-breadcrumbs" },
        Icon && (react_1.default.createElement("span", { className: Breadcrumbs_css_1.iconContainer },
            react_1.default.createElement(Icon, { size: "sm" }))),
        react_1.default.createElement("ul", { className: Breadcrumbs_css_1.containerClass }, children)));
};
exports.BreadcrumbsContainer = BreadcrumbsContainer;
//# sourceMappingURL=Breadcrumbs.js.map