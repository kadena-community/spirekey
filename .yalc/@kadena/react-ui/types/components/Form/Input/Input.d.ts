import type { FC, InputHTMLAttributes } from 'react';
import React from 'react';
import type { FormFieldStatus } from '../Form.css';
export interface IInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'as' | 'id'> {
    leadingText?: string;
    startIcon?: React.ReactElement;
    type?: React.HTMLInputTypeAttribute;
    ref?: React.ForwardedRef<HTMLInputElement>;
    id: string;
    outlined?: boolean;
    status?: FormFieldStatus;
    fontFamily?: 'primaryFont' | 'codeFont';
}
export declare const Input: FC<IInputProps>;
//# sourceMappingURL=Input.d.ts.map