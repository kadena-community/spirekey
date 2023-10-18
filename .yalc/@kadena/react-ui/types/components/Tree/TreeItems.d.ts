import type { FC } from 'react';
import React from 'react';
interface ITreeItemProps {
    title?: React.ReactNode;
    items?: Omit<ITreeItemProps, 'linked'>[];
    isOpen?: boolean;
    linked?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
}
export declare const TreeItem: FC<ITreeItemProps>;
export {};
//# sourceMappingURL=TreeItems.d.ts.map