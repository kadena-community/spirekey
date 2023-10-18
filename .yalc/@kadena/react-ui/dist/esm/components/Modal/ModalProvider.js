'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from './Modal';
import { openModal } from './Modal.css';
import { ModalContext } from './useModal';
export const ModalProvider = ({ children }) => {
    const [mounted, setMounted] = useState(false);
    const [title, setTitle] = useState(undefined);
    const ref = useRef(null);
    const [content, setContent] = useState();
    const [onCloseCallback, setOnCloseCallback] = useState();
    useEffect(() => {
        ref.current = document.querySelector('#modalportal');
        setMounted(true);
    }, []);
    const renderModal = useCallback((node, title, onClose) => {
        setContent(node);
        setTitle(title);
        setOnCloseCallback(() => onClose);
    }, []);
    const clearModal = useCallback(() => {
        onCloseCallback === null || onCloseCallback === void 0 ? void 0 : onCloseCallback();
        setContent(undefined);
        setTitle(undefined);
    }, []);
    const isOpen = mounted && Boolean(ref.current) && Boolean(content);
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add(openModal);
        }
        else {
            document.body.classList.remove(openModal);
        }
    }, [isOpen]);
    return (React.createElement(ModalContext.Provider, { value: { renderModal, clearModal } },
        children,
        isOpen &&
            ref.current &&
            createPortal(React.createElement(React.Fragment, null,
                React.createElement(Modal, { title: title, onClose: onCloseCallback }, content)), ref.current)));
};
//# sourceMappingURL=ModalProvider.js.map