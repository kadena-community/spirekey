"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavFooterIconButton = void 0;
const react_1 = __importDefault(require("react"));
const __1 = require("..");
const NavFooter_css_1 = require("./NavFooter.css");
const NavFooterIconButton = ({ icon, onClick, text, }) => {
    const Icon = icon && __1.SystemIcon[icon];
    return (react_1.default.createElement("button", { className: NavFooter_css_1.iconButtonClass, onClick: onClick, "data-testid": "kda-footer-icon-item" },
        text !== undefined ? (react_1.default.createElement("span", { className: NavFooter_css_1.iconTextClass }, text)) : null,
        react_1.default.createElement(Icon, { size: "sm", color: "inherit" })));
};
exports.NavFooterIconButton = NavFooterIconButton;
//# sourceMappingURL=NavFooterIconButton.js.map