import type { FC } from 'react';
import type { AriaTagGroupProps } from 'react-aria';
export interface ITagGroupProps extends Omit<AriaTagGroupProps<object>, 'description' | 'errorMessage' | 'selectionBehavior' | 'items' | 'selectionMode' | 'defaultSelectedKeys' | 'selectedKeys' | 'onSelectionChange'> {
    className?: string;
    tagAsChild?: boolean;
}
export declare const TagGroup: FC<ITagGroupProps>;
//# sourceMappingURL=TagGroup.d.ts.map