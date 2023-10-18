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
exports.Tree = void 0;
const TreeItems_1 = require("../Tree/TreeItems");
const react_1 = __importStar(require("react"));
const Tree = ({ title, items, isOpen: initialIsOpen = false, linked = false, onOpen, onClose, }) => {
    const [isOpen, setIsOpen] = (0, react_1.useState)(Boolean(initialIsOpen));
    const handleOpen = () => {
        setIsOpen(true);
        onOpen === null || onOpen === void 0 ? void 0 : onOpen();
    };
    const handleClose = () => {
        setIsOpen(false);
        onClose === null || onClose === void 0 ? void 0 : onClose();
    };
    return (react_1.default.createElement(TreeItems_1.TreeItem, { key: String(title), title: title, items: items !== null && items !== void 0 ? items : [], isOpen: isOpen, onOpen: handleOpen, onClose: handleClose, linked: Boolean(linked) }));
};
exports.Tree = Tree;
//# sourceMappingURL=Tree.js.map