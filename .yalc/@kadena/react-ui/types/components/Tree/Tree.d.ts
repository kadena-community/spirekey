import type { FC } from 'react';
import React from 'react';
export interface ITreeProps {
    title?: React.ReactNode;
    items?: Omit<ITreeProps, 'linked'>[];
    isOpen?: boolean;
    linked?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
}
export declare const Tree: FC<ITreeProps>;
//# sourceMappingURL=Tree.d.ts.map