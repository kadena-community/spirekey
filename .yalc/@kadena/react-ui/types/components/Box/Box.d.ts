import type { Sprinkles } from '../../styles/sprinkles.css';
import type React from 'react';
import type { ElementType } from 'react';
export interface IBoxProps extends Partial<Pick<Sprinkles, 'display' | 'margin' | 'marginX' | 'marginY' | 'marginTop' | 'marginBottom' | 'marginLeft' | 'marginRight' | 'padding' | 'paddingX' | 'paddingY' | 'paddingTop' | 'paddingBottom' | 'paddingLeft' | 'paddingRight'>> {
    as?: ElementType;
    children?: React.ReactNode;
}
export declare const Box: ({ as, display, margin, marginX, marginY, marginTop, marginBottom, marginLeft, marginRight, padding, paddingX, paddingY, paddingTop, paddingBottom, paddingLeft, paddingRight, children, }: IBoxProps) => React.ReactElement;
//# sourceMappingURL=Box.d.ts.map