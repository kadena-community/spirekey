"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageNav = void 0;
const Icon_1 = require("../Icon");
const react_1 = __importDefault(require("react"));
const Pagination_css_1 = require("./Pagination.css");
const PageNav = ({ label, direction, disabled = false, onClick, }) => {
    const isPrevious = direction === 'prev';
    const isNext = direction === 'next';
    return (react_1.default.createElement("button", { className: Pagination_css_1.pageNavButtonClass, disabled: disabled, onClick: onClick },
        isPrevious ? react_1.default.createElement(Icon_1.SystemIcon.LeadingIcon, null) : null,
        react_1.default.createElement("span", { className: Pagination_css_1.pageNavLabelClass }, label),
        isNext ? react_1.default.createElement(Icon_1.SystemIcon.TrailingIcon, null) : null));
};
exports.PageNav = PageNav;
//# sourceMappingURL=PageNav.js.map