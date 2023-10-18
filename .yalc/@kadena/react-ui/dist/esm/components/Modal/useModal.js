'use client';
import { createContext, useContext } from 'react';
export const ModalContext = createContext({
    renderModal: (v, title, onCloseCallback) => { },
    clearModal: () => { },
});
export const useModal = () => useContext(ModalContext);
//# sourceMappingURL=useModal.js.map