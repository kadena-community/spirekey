import type { FC, TextareaHTMLAttributes } from 'react';
import React from 'react';
export interface ITextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'as' | 'disabled' | 'className' | 'id'> {
    id: string;
    fontFamily?: 'primaryFont' | 'codeFont';
    disabled?: boolean;
    ref?: React.ForwardedRef<HTMLTextAreaElement>;
    outlined?: boolean;
}
export declare const Textarea: FC<ITextareaProps>;
//# sourceMappingURL=Textarea.d.ts.map