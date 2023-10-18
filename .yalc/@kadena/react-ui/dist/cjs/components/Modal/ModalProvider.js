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
exports.ModalProvider = void 0;
const react_1 = __importStar(require("react"));
const react_dom_1 = require("react-dom");
const Modal_1 = require("./Modal");
const Modal_css_1 = require("./Modal.css");
const useModal_1 = require("./useModal");
const ModalProvider = ({ children }) => {
    const [mounted, setMounted] = (0, react_1.useState)(false);
    const [title, setTitle] = (0, react_1.useState)(undefined);
    const ref = (0, react_1.useRef)(null);
    const [content, setContent] = (0, react_1.useState)();
    const [onCloseCallback, setOnCloseCallback] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        ref.current = document.querySelector('#modalportal');
        setMounted(true);
    }, []);
    const renderModal = (0, react_1.useCallback)((node, title, onClose) => {
        setContent(node);
        setTitle(title);
        setOnCloseCallback(() => onClose);
    }, []);
    const clearModal = (0, react_1.useCallback)(() => {
        onCloseCallback === null || onCloseCallback === void 0 ? void 0 : onCloseCallback();
        setContent(undefined);
        setTitle(undefined);
    }, []);
    const isOpen = mounted && Boolean(ref.current) && Boolean(content);
    (0, react_1.useEffect)(() => {
        if (isOpen) {
            document.body.classList.add(Modal_css_1.openModal);
        }
        else {
            document.body.classList.remove(Modal_css_1.openModal);
        }
    }, [isOpen]);
    return (react_1.default.createElement(useModal_1.ModalContext.Provider, { value: { renderModal, clearModal } },
        children,
        isOpen &&
            ref.current &&
            (0, react_dom_1.createPortal)(react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(Modal_1.Modal, { title: title, onClose: onCloseCallback }, content)), ref.current)));
};
exports.ModalProvider = ModalProvider;
//# sourceMappingURL=ModalProvider.js.map