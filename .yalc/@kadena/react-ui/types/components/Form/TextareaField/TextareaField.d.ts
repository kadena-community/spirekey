import type { IFormFieldWrapperProps, ITextareaProps } from '../../Form';
import type { FC } from 'react';
export interface ITextareaFieldProps extends Omit<IFormFieldWrapperProps, 'htmlFor' | 'children'> {
    textAreaProps: Omit<ITextareaProps, 'disabled'>;
}
export declare const TextareaField: FC<ITextareaFieldProps>;
//# sourceMappingURL=TextareaField.d.ts.map