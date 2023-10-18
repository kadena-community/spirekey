import type { FC } from 'react';
import type { IGridItemProps } from './GridItem';
import type { IGridRootProps } from './GridRoot';
export type { IGridRootProps as IGridContainerProps, IGridItemProps };
interface IGrid {
    Root: FC<IGridRootProps>;
    Item: FC<IGridItemProps>;
}
export declare const Grid: IGrid;
//# sourceMappingURL=index.d.ts.map