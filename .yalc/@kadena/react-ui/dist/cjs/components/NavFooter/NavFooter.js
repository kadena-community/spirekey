"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavFooterContainer = void 0;
const vars_css_1 = require("../../styles/vars.css");
const react_1 = __importDefault(require("react"));
const NavFooter_css_1 = require("./NavFooter.css");
const NavFooterContainer = ({ children, darkMode = false, }) => {
    const footerContent = (react_1.default.createElement("footer", { className: NavFooter_css_1.containerClass, "data-testid": "kda-footer" }, children));
    if (darkMode) {
        return react_1.default.createElement("div", { className: vars_css_1.darkThemeClass }, footerContent);
    }
    return footerContent;
};
exports.NavFooterContainer = NavFooterContainer;
//# sourceMappingURL=NavFooter.js.map