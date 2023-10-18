import type { ReactNode } from 'react';
interface IModalContext {
    renderModal: (v: ReactNode, title?: string, onCloseCallback?: () => void) => void;
    clearModal: () => void;
}
export declare const ModalContext: import("react").Context<IModalContext>;
export declare const useModal: () => IModalContext;
export {};
//# sourceMappingURL=useModal.d.ts.map