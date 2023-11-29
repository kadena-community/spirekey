import { SystemIcon } from '../../Icon';
import type { vars } from '../../../styles/vars.css';
import type { FC, InputHTMLAttributes } from 'react';
import React from 'react';
export interface IInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'as' | 'disabled' | 'className' | 'id'> {
    leadingText?: string;
    icon?: keyof typeof SystemIcon;
    leadingTextWidth?: keyof typeof vars.sizes;
    disabled?: boolean;
    type?: React.HTMLInputTypeAttribute;
    ref?: React.ForwardedRef<HTMLInputElement>;
    id: string;
    outlined?: boolean;
}
export declare const Input: FC<IInputProps>;
//# sourceMappingURL=Input.d.ts.map