"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavFooterPanel = void 0;
const react_1 = __importDefault(require("react"));
const NavFooter_css_1 = require("./NavFooter.css");
const NavFooterPanel = ({ children }) => {
    return (react_1.default.createElement("div", { className: NavFooter_css_1.footerPanel, "data-testid": "kda-footer-panel" }, children));
};
exports.NavFooterPanel = NavFooterPanel;
//# sourceMappingURL=NavFooterPanel.js.map