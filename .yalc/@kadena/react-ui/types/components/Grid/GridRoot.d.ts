import type { Sprinkles } from '../../styles/sprinkles.css';
import type { FC, ReactNode } from 'react';
import type { ResponsiveInputType } from './Grid.css';
import { gapVariants } from './Grid.css';
export interface IGridRootProps extends Pick<Sprinkles, 'margin' | 'marginX' | 'marginY' | 'marginTop' | 'marginBottom' | 'marginLeft' | 'marginRight' | 'padding' | 'paddingX' | 'paddingY' | 'paddingTop' | 'paddingBottom' | 'paddingLeft' | 'paddingRight'> {
    children?: ReactNode;
    columns?: ResponsiveInputType;
    gap?: keyof typeof gapVariants;
}
export declare const GridRoot: FC<IGridRootProps>;
//# sourceMappingURL=GridRoot.d.ts.map