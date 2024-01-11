import type { FC } from 'react';
import React from 'react';
import type { AriaTagProps } from 'react-aria';
import type { ListState } from 'react-stately';
interface IInternalTagItemProps extends AriaTagProps<object> {
    state: ListState<object>;
    children?: React.ReactNode;
    asChild?: boolean;
}
export declare const InternalTagItem: FC<IInternalTagItemProps>;
export {};
//# sourceMappingURL=InternalTagItem.d.ts.map