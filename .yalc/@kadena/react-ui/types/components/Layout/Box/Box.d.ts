import type { Sprinkles } from '../../../styles/sprinkles.css';
import type React from 'react';
import type { ElementType } from 'react';
export interface IBoxProps extends Partial<Pick<Sprinkles, 'alignItems' | 'backgroundColor' | 'borderColor' | 'borderRadius' | 'borderStyle' | 'borderWidth' | 'bottom' | 'cursor' | 'display' | 'flexDirection' | 'flexGrow' | 'flexShrink' | 'flexWrap' | 'height' | 'inset' | 'justifyContent' | 'left' | 'margin' | 'marginBottom' | 'marginLeft' | 'marginRight' | 'marginTop' | 'marginX' | 'marginY' | 'maxHeight' | 'maxWidth' | 'minHeight' | 'minWidth' | 'opacity' | 'overflow' | 'padding' | 'paddingBottom' | 'paddingLeft' | 'paddingRight' | 'paddingTop' | 'paddingX' | 'paddingY' | 'position' | 'right' | 'textAlign' | 'top' | 'width' | 'zIndex'>> {
    className?: string;
    as?: ElementType;
    children?: React.ReactNode;
}
export declare const Box: ({ as, children, className, alignItems, backgroundColor, borderColor, borderRadius, borderStyle, borderWidth, bottom, cursor, display, flexDirection, flexGrow, flexShrink, flexWrap, height, inset, justifyContent, left, margin, marginBottom, marginLeft, marginRight, marginTop, marginX, marginY, maxHeight, maxWidth, minHeight, minWidth, opacity, overflow, padding, paddingBottom, paddingLeft, paddingRight, paddingTop, paddingX, paddingY, position, right, textAlign, top, width, zIndex, }: IBoxProps) => React.ReactElement;
//# sourceMappingURL=Box.d.ts.map