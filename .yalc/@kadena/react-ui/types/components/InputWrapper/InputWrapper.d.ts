import type { IInputProps } from '../Input';
import type { FC, FunctionComponentElement } from 'react';
import type { vars } from 'src/styles';
import type { IInputHeaderProps } from './InputHeader/InputHeader';
import type { Status } from './InputWrapper.css';
export interface IInputWrapperProps extends Omit<IInputHeaderProps, 'label'> {
    children: FunctionComponentElement<IInputProps> | FunctionComponentElement<IInputProps>[];
    status?: Status;
    disabled?: boolean;
    helperText?: string;
    label?: string;
    leadingTextWidth?: keyof typeof vars.sizes;
}
export declare const InputWrapper: FC<IInputWrapperProps>;
//# sourceMappingURL=InputWrapper.d.ts.map