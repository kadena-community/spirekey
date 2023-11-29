import type { FC } from 'react';
import React from 'react';
export interface ICopyButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'className'> {
    value: string;
}
export declare const CopyButton: FC<ICopyButtonProps>;
//# sourceMappingURL=CopyButton.d.ts.map