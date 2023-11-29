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
exports.Modal = void 0;
const utils_1 = require("@react-aria/utils");
const react_1 = __importStar(require("react"));
const react_aria_1 = require("react-aria");
const Modal_css_1 = require("./Modal.css");
const Modal = ({ children, state, isDismissable = true, isKeyboardDismissDisabled, }) => {
    const nodeRef = (0, react_1.useRef)(null);
    const { modalProps, underlayProps } = (0, react_aria_1.useModalOverlay)({
        isDismissable,
        isKeyboardDismissDisabled,
    }, state, nodeRef);
    if (!state.isOpen) {
        return null;
    }
    return (react_1.default.createElement(react_aria_1.Overlay, null,
        react_1.default.createElement("div", { className: Modal_css_1.underlayClass, ...underlayProps }, typeof children === 'function'
            ? children(modalProps, nodeRef)
            : (0, react_1.cloneElement)(children, {
                ...children.props,
                ...modalProps,
                ref: (0, utils_1.mergeRefs)(nodeRef, children.ref),
            }))));
};
exports.Modal = Modal;
//# sourceMappingURL=Modal.js.map