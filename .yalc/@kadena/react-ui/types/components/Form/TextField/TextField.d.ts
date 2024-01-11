import type { IFormFieldWrapperProps, IInputProps } from '../../Form';
import type { FC } from 'react';
export interface ITextFieldProps extends Omit<IFormFieldWrapperProps, 'children' | 'htmlFor'>, Omit<IInputProps, 'disabled' | 'children'> {
}
export declare const TextField: FC<ITextFieldProps>;
//# sourceMappingURL=TextField.d.ts.map