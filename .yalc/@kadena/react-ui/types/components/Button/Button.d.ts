import { SystemIcon } from '../Icon';
import type { ButtonHTMLAttributes, FC } from 'react';
import React from 'react';
import type { colorVariants, typeVariants } from './Button.css';
export interface IButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'as' | 'disabled' | 'className'> {
    active?: boolean;
    as?: 'button' | 'a';
    asChild?: boolean;
    children: React.ReactNode;
    color?: keyof typeof colorVariants;
    disabled?: boolean;
    href?: string;
    icon?: keyof typeof SystemIcon;
    iconAlign?: 'left' | 'right';
    loading?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | React.FormEventHandler<HTMLButtonElement>;
    target?: '_blank' | '_self';
    title?: string;
    type?: 'button' | 'submit' | 'reset';
    variant?: keyof typeof typeVariants;
}
export declare const Button: FC<IButtonProps>;
//# sourceMappingURL=Button.d.ts.map