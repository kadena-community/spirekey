"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = void 0;
const Card_1 = require("../Card");
const Icon_1 = require("../Icon");
const Heading_1 = require("../Typography/Heading/Heading");
const focus_trap_react_1 = __importDefault(require("focus-trap-react"));
const react_1 = __importDefault(require("react"));
const Modal_css_1 = require("./Modal.css");
const useModal_1 = require("./useModal");
const Modal = ({ children, title, onClose }) => {
    const { clearModal } = (0, useModal_1.useModal)();
    function handleCloseModal() {
        onClose === null || onClose === void 0 ? void 0 : onClose();
        clearModal();
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(focus_trap_react_1.default, { focusTrapOptions: {
                fallbackFocus: '[data-cy="modal-background"]',
            } },
            react_1.default.createElement("div", null,
                react_1.default.createElement("button", { "data-cy": "modal-background", className: Modal_css_1.background, onClick: handleCloseModal }),
                react_1.default.createElement("div", { className: Modal_css_1.wrapper, "data-cy": "modal", "data-testid": "kda-modal" },
                    react_1.default.createElement("section", { className: Modal_css_1.modal },
                        react_1.default.createElement(Card_1.Card, { fullWidth: true },
                            react_1.default.createElement("div", { className: Modal_css_1.titleWrapper },
                                react_1.default.createElement(Heading_1.Heading, { as: "h3" }, title)),
                            react_1.default.createElement("button", { className: Modal_css_1.closeButton, onClick: handleCloseModal, title: "Close modal" },
                                "Close",
                                react_1.default.createElement(Icon_1.SystemIcon.Close, null)),
                            children)))))));
};
exports.Modal = Modal;
//# sourceMappingURL=Modal.js.map