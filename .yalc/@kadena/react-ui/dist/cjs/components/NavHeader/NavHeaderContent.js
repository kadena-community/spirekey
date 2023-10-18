"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavHeaderContent = void 0;
const react_1 = __importDefault(require("react"));
const NavHeader_css_1 = require("./NavHeader.css");
const NavHeaderContent = ({ children }) => {
    return react_1.default.createElement("div", { className: NavHeader_css_1.childrenClass }, children);
};
exports.NavHeaderContent = NavHeaderContent;
//# sourceMappingURL=NavHeaderContent.js.map