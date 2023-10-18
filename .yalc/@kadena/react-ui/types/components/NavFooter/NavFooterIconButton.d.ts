import type { FC } from 'react';
import React from 'react';
import { SystemIcon } from '..';
export interface INavFooterIconButtonProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'color'> {
    icon: keyof typeof SystemIcon;
    onClick?: React.MouseEventHandler;
    text?: string;
}
export declare const NavFooterIconButton: FC<INavFooterIconButtonProps>;
//# sourceMappingURL=NavFooterIconButton.d.ts.map