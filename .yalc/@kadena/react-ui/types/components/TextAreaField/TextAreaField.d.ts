import type { IInputWrapperProps } from '../InputWrapper';
import type { ITextareaProps } from '../TextArea';
import type { FC } from 'react';
export interface ITextAreaFieldProps extends Omit<IInputWrapperProps, 'htmlFor' | 'children'> {
    textAreaProps: Omit<ITextareaProps, 'disabled'>;
}
export declare const TextAreaField: FC<ITextAreaFieldProps>;
//# sourceMappingURL=TextAreaField.d.ts.map