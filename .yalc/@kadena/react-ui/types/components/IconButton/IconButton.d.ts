import { SystemIcon } from '../Icon';
import type { FC } from 'react';
import React from 'react';
import type { colorVariants, typeVariants } from './IconButton.css';
export interface IIconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'className'> {
    active?: boolean;
    as?: 'button' | 'a';
    asChild?: boolean;
    color?: keyof typeof colorVariants;
    href?: string;
    icon: keyof typeof SystemIcon;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    target?: '_blank' | '_self';
    title?: string;
    type?: 'button' | 'submit' | 'reset';
    variant?: keyof typeof typeVariants;
}
export declare const IconButton: FC<IIconButtonProps>;
//# sourceMappingURL=IconButton.d.ts.map