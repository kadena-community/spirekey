import type { IInputProps } from '../Input';
import type { IInputWrapperProps } from '../InputWrapper';
import type { FC } from 'react';
export interface ITextFieldProps extends Omit<IInputWrapperProps, 'children' | 'htmlFor'> {
    inputProps: Omit<IInputProps, 'disabled' | 'children' | 'leadingTextWidth'>;
}
export declare const TextField: FC<ITextFieldProps>;
//# sourceMappingURL=TextField.d.ts.map