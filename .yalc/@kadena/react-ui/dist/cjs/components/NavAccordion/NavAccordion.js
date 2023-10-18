"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavAccordionRoot = void 0;
const index_1 = require("../../styles/index");
const react_1 = __importStar(require("react"));
const NavAccordion_context_1 = require("./NavAccordion.context");
const NavAccordion_css_1 = require("./NavAccordion.css");
const NavAccordionRoot = ({ children, linked = false, darkMode = false, }) => {
    const [openSections, setOpenSections] = (0, react_1.useState)(NavAccordion_context_1.initialOpenSections);
    const NavElement = () => (react_1.default.createElement("nav", { className: NavAccordion_css_1.navAccordionWrapperClass }, children));
    return (react_1.default.createElement(NavAccordion_context_1.NavAccordionContext.Provider, { value: { openSections, setOpenSections, linked } }, darkMode ? (react_1.default.createElement("div", { className: index_1.darkThemeClass },
        react_1.default.createElement(NavElement, null))) : (react_1.default.createElement(NavElement, null))));
};
exports.NavAccordionRoot = NavAccordionRoot;
//# sourceMappingURL=NavAccordion.js.map