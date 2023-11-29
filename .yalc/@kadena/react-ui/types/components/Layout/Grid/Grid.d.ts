import type { Sprinkles } from '../../../styles/sprinkles.css';
import type { FC, ReactNode } from 'react';
import type { ResponsiveInputType } from './Grid.css';
import { gapVariants } from './Grid.css';
export interface IGridProps extends Pick<Sprinkles, 'height' | 'margin' | 'marginBottom' | 'marginLeft' | 'marginRight' | 'marginTop' | 'marginX' | 'marginY' | 'maxHeight' | 'maxWidth' | 'minHeight' | 'minWidth' | 'overflow' | 'padding' | 'paddingBottom' | 'paddingLeft' | 'paddingRight' | 'paddingTop' | 'paddingX' | 'paddingY' | 'width'> {
    className?: string;
    children?: ReactNode;
    columns?: ResponsiveInputType;
    gap?: keyof typeof gapVariants;
}
export declare const Grid: FC<IGridProps>;
//# sourceMappingURL=Grid.d.ts.map