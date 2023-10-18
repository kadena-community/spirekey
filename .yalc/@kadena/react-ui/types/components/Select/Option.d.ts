import type { FC } from 'react';
import React from 'react';
export interface IOptionProps extends Omit<React.HTMLAttributes<HTMLOptionElement>, 'as'> {
    children: React.ReactNode;
    value?: string[] | string | number;
}
export declare const Option: FC<IOptionProps>;
//# sourceMappingURL=Option.d.ts.map