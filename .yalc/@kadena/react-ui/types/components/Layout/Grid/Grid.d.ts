import type { FC } from 'react';
import type { IBoxProps } from '../Box';
import type { ResponsiveInputType } from './Grid.css';
export interface IGridProps extends Omit<IBoxProps, 'display' | 'flex' | 'alignItems' | 'flexDirection' | 'justifyContent'> {
    columns?: ResponsiveInputType;
}
export declare const Grid: FC<IGridProps>;
//# sourceMappingURL=Grid.d.ts.map