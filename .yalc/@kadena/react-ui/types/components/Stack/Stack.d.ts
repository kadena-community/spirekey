import type { Sprinkles } from '../../styles/sprinkles.css';
import type React from 'react';
import type { ElementType } from 'react';
export interface IStackProps extends Pick<Sprinkles, 'margin' | 'marginX' | 'marginY' | 'marginTop' | 'marginBottom' | 'marginLeft' | 'marginRight' | 'justifyContent' | 'alignItems' | 'width' | 'padding' | 'paddingX' | 'paddingY' | 'paddingTop' | 'paddingBottom' | 'paddingLeft' | 'paddingRight'> {
    direction?: Sprinkles['flexDirection'];
    wrap?: Sprinkles['flexWrap'];
    gap?: Sprinkles['gap'];
    as?: ElementType;
    children?: React.ReactNode;
}
export declare const Stack: ({ as, margin, marginX, marginY, marginTop, marginBottom, marginLeft, marginRight, gap, justifyContent, alignItems, wrap, direction, width, padding, paddingX, paddingY, paddingTop, paddingBottom, paddingLeft, paddingRight, children, }: IStackProps) => React.ReactElement;
//# sourceMappingURL=Stack.d.ts.map