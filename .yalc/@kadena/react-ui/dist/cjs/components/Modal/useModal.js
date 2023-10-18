"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useModal = exports.ModalContext = void 0;
const react_1 = require("react");
exports.ModalContext = (0, react_1.createContext)({
    renderModal: (v, title, onCloseCallback) => { },
    clearModal: () => { },
});
const useModal = () => (0, react_1.useContext)(exports.ModalContext);
exports.useModal = useModal;
//# sourceMappingURL=useModal.js.map