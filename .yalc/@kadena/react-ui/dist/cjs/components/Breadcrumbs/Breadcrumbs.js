"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreadcrumbsContainer = void 0;
const react_1 = __importDefault(require("react"));
const Breadcrumbs_css_1 = require("./Breadcrumbs.css");
const BreadcrumbsContainer = ({ children, icon, }) => {
    return (react_1.default.createElement("nav", { className: Breadcrumbs_css_1.navClass, "data-testid": "kda-breadcrumbs" },
        icon && react_1.default.createElement("span", { className: Breadcrumbs_css_1.iconContainer }, icon),
        react_1.default.createElement("ul", { className: Breadcrumbs_css_1.containerClass }, children)));
};
exports.BreadcrumbsContainer = BreadcrumbsContainer;
//# sourceMappingURL=Breadcrumbs.js.map