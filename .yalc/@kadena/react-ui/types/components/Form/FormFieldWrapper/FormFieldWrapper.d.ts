import type { IInputProps, ISelectProps, ITextareaProps } from '../../Form';
import type { FC, FunctionComponentElement } from 'react';
import type { vars } from 'src/styles';
import type { FormFieldStatus } from '../Form.css';
import type { IFormFieldHeaderProps } from './FormFieldHeader/FormFieldHeader';
export interface IFormFieldWrapperProps extends Omit<IFormFieldHeaderProps, 'label'> {
    children: FunctionComponentElement<IInputProps | ISelectProps | ITextareaProps> | FunctionComponentElement<IInputProps | ISelectProps | ITextareaProps>[];
    status?: FormFieldStatus;
    disabled?: boolean;
    helperText?: string;
    label?: string;
    leadingTextWidth?: keyof typeof vars.sizes;
}
export declare const FormFieldWrapper: FC<IFormFieldWrapperProps>;
//# sourceMappingURL=FormFieldWrapper.d.ts.map