'use client';
import { Card } from '../Card';
import { SystemIcon } from '../Icon';
import { Heading } from '../Typography/Heading/Heading';
import FocusTrap from 'focus-trap-react';
import React from 'react';
import { background, closeButton, modal, titleWrapper, wrapper, } from './Modal.css';
import { useModal } from './useModal';
export const Modal = ({ children, title, onClose }) => {
    const { clearModal } = useModal();
    function handleCloseModal() {
        onClose === null || onClose === void 0 ? void 0 : onClose();
        clearModal();
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(FocusTrap, { focusTrapOptions: {
                fallbackFocus: '[data-cy="modal-background"]',
            } },
            React.createElement("div", null,
                React.createElement("button", { "data-cy": "modal-background", className: background, onClick: handleCloseModal }),
                React.createElement("div", { className: wrapper, "data-cy": "modal", "data-testid": "kda-modal" },
                    React.createElement("section", { className: modal },
                        React.createElement(Card, { fullWidth: true },
                            React.createElement("div", { className: titleWrapper },
                                React.createElement(Heading, { as: "h3" }, title)),
                            React.createElement("button", { className: closeButton, onClick: handleCloseModal, title: "Close modal" },
                                "Close",
                                React.createElement(SystemIcon.Close, null)),
                            children)))))));
};
//# sourceMappingURL=Modal.js.map