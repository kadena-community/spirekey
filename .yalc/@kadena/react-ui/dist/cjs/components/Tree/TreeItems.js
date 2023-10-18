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
exports.TreeItem = void 0;
const Icon_1 = require("../Icon");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importStar(require("react"));
const Tree_css_1 = require("./Tree.css");
const TreeItem = ({ title, items, isOpen, linked = false, onOpen, onClose, }) => {
    const hasTitle = !!title;
    const hasChildren = !!(items === null || items === void 0 ? void 0 : items.length);
    const initialExpandedChildren = items === null || items === void 0 ? void 0 : items.map((item, index) => (item.isOpen ? index : undefined)).filter((item) => item !== undefined);
    const [expandedChildren, setExpandedChildren] = (0, react_1.useState)(initialExpandedChildren);
    const handleExpandChildren = (index) => {
        var _a, _b;
        if (linked) {
            expandedChildren.forEach((childrenIndex) => { var _a, _b; return (_b = (_a = items === null || items === void 0 ? void 0 : items[childrenIndex]) === null || _a === void 0 ? void 0 : _a.onClose) === null || _b === void 0 ? void 0 : _b.call(_a); });
            setExpandedChildren([index]);
        }
        else
            setExpandedChildren([...expandedChildren, index]);
        (_b = (_a = items === null || items === void 0 ? void 0 : items[index]) === null || _a === void 0 ? void 0 : _a.onOpen) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    const handleCollapseChildren = (index) => {
        var _a, _b;
        setExpandedChildren(expandedChildren.filter((item) => item !== index));
        (_b = (_a = items === null || items === void 0 ? void 0 : items[index]) === null || _a === void 0 ? void 0 : _a.onClose) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    const handleToggle = () => {
        if (!hasChildren)
            return;
        if (isOpen)
            onClose === null || onClose === void 0 ? void 0 : onClose();
        else
            onOpen === null || onOpen === void 0 ? void 0 : onOpen();
    };
    return (react_1.default.createElement("div", { className: Tree_css_1.treeWrapperClass, "data-testid": "kda-tree-item", role: "tree" },
        hasTitle && (react_1.default.createElement("div", { className: (0, classnames_1.default)(Tree_css_1.treeTitleClassWrapper, { isOpen }), onClick: handleToggle, role: "treeitem", "aria-selected": Boolean(isOpen), "data-testid": "kda-tree-title" },
            react_1.default.createElement("span", { className: (0, classnames_1.default)(Tree_css_1.treeToggleClass, Tree_css_1.treeToggleVariant[isOpen ? 'opened' : 'closed']) }, hasChildren ? (react_1.default.createElement(Icon_1.SystemIcon.ChevronDown, { size: "md" })) : (react_1.default.createElement(Icon_1.SystemIcon.Circle, { size: "md" }))),
            react_1.default.createElement("span", { className: (0, classnames_1.default)(Tree_css_1.treeTitleClass, Tree_css_1.treeTitleVariant[hasChildren ? 'isParent' : 'isChild']) }, title))),
        isOpen && (react_1.default.createElement("div", { className: Tree_css_1.treeBranchWrapperVariant[hasTitle ? 'isChild' : 'isParent'] }, items === null || items === void 0 ? void 0 : items.map((item, index) => {
            var _a;
            return (react_1.default.createElement(exports.TreeItem, { key: String(item.title), title: item.title, items: (_a = item === null || item === void 0 ? void 0 : item.items) !== null && _a !== void 0 ? _a : [], isOpen: expandedChildren.includes(index), onOpen: () => handleExpandChildren(index), onClose: () => handleCollapseChildren(index), linked: Boolean(linked) }));
        })))));
};
exports.TreeItem = TreeItem;
//# sourceMappingURL=TreeItems.js.map