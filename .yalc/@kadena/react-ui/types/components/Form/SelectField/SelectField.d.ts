import type { IFormFieldWrapperProps, ISelectProps } from '../../Form';
import type { FC } from 'react';
export interface ISelectFieldProps extends Omit<IFormFieldWrapperProps, 'htmlFor'>, Omit<ISelectProps, 'disabled' | 'children'> {
}
export declare const SelectField: FC<ISelectFieldProps>;
//# sourceMappingURL=SelectField.d.ts.map