import type { Sprinkles } from '../../styles/sprinkles.css';
import type { FC, TextareaHTMLAttributes } from 'react';
import React from 'react';
export interface ITextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'as' | 'disabled' | 'children' | 'className' | 'id'>, Partial<Pick<Sprinkles, 'fontFamily'>> {
    id: string;
    disabled?: boolean;
    ref?: React.ForwardedRef<HTMLTextAreaElement>;
    outlined?: boolean;
}
export declare const Textarea: FC<ITextareaProps>;
//# sourceMappingURL=TextArea.d.ts.map