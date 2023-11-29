import type { FC, ReactElement, Ref } from 'react';
import type { AriaModalOverlayProps, ModalOverlayAria } from 'react-aria';
import type { OverlayTriggerState } from 'react-stately';
export interface IModalProps extends AriaModalOverlayProps {
    state: OverlayTriggerState;
    children: ReactElement | ((modalProps: ModalOverlayAria['modalProps'], ref: Ref<HTMLDivElement>) => ReactElement);
}
export declare const Modal: FC<IModalProps>;
//# sourceMappingURL=Modal.d.ts.map