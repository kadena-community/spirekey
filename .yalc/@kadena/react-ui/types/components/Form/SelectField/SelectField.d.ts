import type { IFormFieldWrapperProps, ISelectProps } from '../../Form';
import type { FC } from 'react';
export interface ISelectFieldProps extends Omit<IFormFieldWrapperProps, 'htmlFor'> {
    selectProps: Omit<ISelectProps, 'disabled' | 'children' | 'leadingTextWidth'>;
}
export declare const SelectField: FC<ISelectFieldProps>;
//# sourceMappingURL=SelectField.d.ts.map