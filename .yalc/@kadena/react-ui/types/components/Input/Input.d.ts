import { SystemIcon } from '../Icon';
import type { FC, InputHTMLAttributes } from 'react';
import React from 'react';
import type { vars } from 'src/styles';
export interface IInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'as' | 'disabled' | 'children' | 'className' | 'id'> {
    leadingText?: string;
    leadingTextWidth?: keyof typeof vars.sizes;
    leftIcon?: keyof typeof SystemIcon;
    rightIcon?: keyof typeof SystemIcon;
    disabled?: boolean;
    type?: React.HTMLInputTypeAttribute;
    ref?: React.ForwardedRef<HTMLInputElement>;
    id: string;
    outlined?: boolean;
}
export declare const Input: FC<IInputProps>;
//# sourceMappingURL=Input.d.ts.map