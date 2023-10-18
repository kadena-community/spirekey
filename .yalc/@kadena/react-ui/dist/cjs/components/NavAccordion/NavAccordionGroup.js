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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavAccordionGroup = void 0;
const Accordion_css_1 = require("../Accordion/Accordion.css");
const Icon_1 = require("../Icon");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importStar(require("react"));
const NavAccordion_css_1 = require("./NavAccordion.css");
const NavAccordionGroup = ({ children, onClose, onOpen, title, }) => {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const handleClick = () => {
        if (isOpen) {
            onClose === null || onClose === void 0 ? void 0 : onClose();
        }
        else {
            onOpen === null || onOpen === void 0 ? void 0 : onOpen();
        }
        setIsOpen(!isOpen);
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("button", { className: (0, classnames_1.default)([
                Accordion_css_1.accordionButtonClass,
                NavAccordion_css_1.navAccordionGroupButtonClass,
            ]), onClick: handleClick },
            react_1.default.createElement(Icon_1.SystemIcon.ChevronDown, { className: (0, classnames_1.default)(NavAccordion_css_1.navAccordionGroupIconClass, {
                    isOpen,
                }), size: "sm" }),
            react_1.default.createElement("span", { className: NavAccordion_css_1.navAccordionGroupTitleClass }, title)),
        children && isOpen && (react_1.default.createElement("ul", { className: (0, classnames_1.default)([
                NavAccordion_css_1.navAccordionListClass,
                NavAccordion_css_1.navAccordionGroupListClass,
            ]) }, react_1.Children.map(children, (child) => (react_1.default.createElement("li", { className: NavAccordion_css_1.navAccordionGroupListItemClass }, child)))))));
};
exports.NavAccordionGroup = NavAccordionGroup;
//# sourceMappingURL=NavAccordionGroup.js.map