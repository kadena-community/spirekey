import type { IInputWrapperProps } from '../InputWrapper';
import type { ISelectProps } from '../Select';
import type { FC } from 'react';
export interface ISelectFieldProps extends Omit<IInputWrapperProps, 'htmlFor'> {
    selectProps: Omit<ISelectProps, 'disabled' | 'children' | 'leadingTextWidth'>;
}
export declare const SelectField: FC<ISelectFieldProps>;
//# sourceMappingURL=SelectField.d.ts.map