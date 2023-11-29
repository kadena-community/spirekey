import type { IFormFieldWrapperProps, IInputProps } from '../../Form';
import type { FC } from 'react';
export interface ITextFieldProps extends Omit<IFormFieldWrapperProps, 'children' | 'htmlFor'> {
    inputProps: Omit<IInputProps, 'disabled' | 'children' | 'leadingTextWidth'>;
}
export declare const TextField: FC<ITextFieldProps>;
//# sourceMappingURL=TextField.d.ts.map