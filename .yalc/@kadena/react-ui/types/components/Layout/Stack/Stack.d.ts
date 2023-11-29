import type { Sprinkles } from '../../../styles/sprinkles.css';
import type React from 'react';
import type { ElementType } from 'react';
export interface IStackProps extends Pick<Sprinkles, 'alignItems' | 'gap' | 'justifyContent' | 'height' | 'margin' | 'marginBottom' | 'marginLeft' | 'marginRight' | 'marginTop' | 'marginX' | 'marginY' | 'maxHeight' | 'maxWidth' | 'minHeight' | 'minWidth' | 'overflow' | 'padding' | 'paddingBottom' | 'paddingLeft' | 'paddingRight' | 'paddingTop' | 'paddingX' | 'paddingY' | 'width'> {
    className?: string;
    direction?: Sprinkles['flexDirection'];
    wrap?: Sprinkles['flexWrap'];
    as?: ElementType;
    children?: React.ReactNode;
}
export declare const Stack: ({ className, children, alignItems, as, direction, gap, justifyContent, height, margin, marginBottom, marginLeft, marginRight, marginTop, marginX, marginY, maxHeight, maxWidth, minHeight, minWidth, overflow, padding, paddingBottom, paddingLeft, paddingRight, paddingTop, paddingX, paddingY, width, wrap, }: IStackProps) => React.ReactElement;
//# sourceMappingURL=Stack.d.ts.map