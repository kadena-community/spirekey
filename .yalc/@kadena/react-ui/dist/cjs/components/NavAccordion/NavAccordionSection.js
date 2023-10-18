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
exports.NavAccordionSection = void 0;
const Accordion_css_1 = require("../Accordion/Accordion.css");
const Icon_1 = require("../Icon");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importStar(require("react"));
const NavAccordion_context_1 = require("./NavAccordion.context");
const NavAccordion_css_1 = require("./NavAccordion.css");
const NavAccordionGroup_1 = require("./NavAccordionGroup");
const NavAccordionSection = ({ children, onClose, onOpen, title, }) => {
    const { openSections, setOpenSections, linked } = (0, react_1.useContext)(NavAccordion_context_1.NavAccordionContext);
    const sectionId = title.replace(/\s+/g, '').toLowerCase();
    const isOpen = openSections.includes(sectionId);
    const handleClick = () => {
        if (isOpen) {
            setOpenSections(linked ? [] : [...openSections.filter((i) => i !== sectionId)]);
            onClose === null || onClose === void 0 ? void 0 : onClose();
        }
        else {
            setOpenSections(linked ? [sectionId] : [...openSections, sectionId]);
            onOpen === null || onOpen === void 0 ? void 0 : onOpen();
        }
    };
    return (react_1.default.createElement("section", { className: Accordion_css_1.accordionSectionClass },
        react_1.default.createElement("button", { className: (0, classnames_1.default)([Accordion_css_1.accordionButtonClass]), onClick: handleClick },
            react_1.default.createElement("h3", { className: Accordion_css_1.accordionHeadingTitleClass }, title),
            react_1.default.createElement(Icon_1.SystemIcon.Close, { className: (0, classnames_1.default)(Accordion_css_1.accordionToggleIconClass, {
                    isOpen,
                }), size: "sm" })),
        children && isOpen && (react_1.default.createElement("ul", { className: NavAccordion_css_1.navAccordionListClass }, react_1.Children.map(children, (child) => {
            const Element = child.type === NavAccordionGroup_1.NavAccordionGroup ? 'ul' : 'li';
            const className = Element === 'ul'
                ? NavAccordion_css_1.navAccordionListClass
                : NavAccordion_css_1.navAccordionListItemClass;
            return react_1.default.createElement(Element, { className: className }, child);
        })))));
};
exports.NavAccordionSection = NavAccordionSection;
//# sourceMappingURL=NavAccordionSection.js.map