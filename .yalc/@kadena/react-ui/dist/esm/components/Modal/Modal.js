'use client';
import { mergeRefs } from '@react-aria/utils';
import React, { cloneElement, useRef } from 'react';
import { Overlay, useModalOverlay } from 'react-aria';
import { underlayClass } from './Modal.css';
export const Modal = ({ children, state, isDismissable = true, isKeyboardDismissDisabled, }) => {
    const nodeRef = useRef(null);
    const { modalProps, underlayProps } = useModalOverlay({
        isDismissable,
        isKeyboardDismissDisabled,
    }, state, nodeRef);
    if (!state.isOpen) {
        return null;
    }
    return (React.createElement(Overlay, null,
        React.createElement("div", { className: underlayClass, ...underlayProps }, typeof children === 'function'
            ? children(modalProps, nodeRef)
            : cloneElement(children, {
                ...children.props,
                ...modalProps,
                ref: mergeRefs(nodeRef, children.ref),
            }))));
};
//# sourceMappingURL=Modal.js.map