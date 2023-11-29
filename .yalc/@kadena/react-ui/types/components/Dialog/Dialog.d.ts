import type { FC, ReactNode } from 'react';
import type { AriaDialogProps } from 'react-aria';
import type { OverlayTriggerState } from 'react-stately';
import type { IModalProps } from '../Modal/Modal';
interface IBaseDialogProps extends Omit<IModalProps, 'children'>, AriaDialogProps {
    children?: ((state: OverlayTriggerState) => ReactNode) | ReactNode;
    className?: string;
}
export interface IDialogProps extends Omit<IBaseDialogProps, 'state'> {
    children?: ((state: OverlayTriggerState) => ReactNode) | ReactNode;
    isOpen?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
}
export declare const Dialog: FC<IDialogProps>;
export {};
//# sourceMappingURL=Dialog.d.ts.map