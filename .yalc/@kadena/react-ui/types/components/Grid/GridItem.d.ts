import type { FC, ReactNode } from 'react';
import type { ResponsiveInputType } from './Grid.css';
import { rowSpanVariants } from './Grid.css';
export interface IGridItemProps {
    children?: ReactNode;
    columnSpan?: ResponsiveInputType;
    rowSpan?: keyof typeof rowSpanVariants;
}
export declare const GridItem: FC<IGridItemProps>;
//# sourceMappingURL=GridItem.d.ts.map