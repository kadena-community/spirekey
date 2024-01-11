import type { ComponentPropsWithRef, FC } from 'react';
import React from 'react';
import { colorVariants, transformVariants } from '../typography.css';
export declare const HEADING_ELEMENTS: readonly ["h1", "h2", "h3", "h4", "h5", "h6"];
export type HeadingElementType = (typeof HEADING_ELEMENTS)[number];
export interface IHeadingProps extends ComponentPropsWithRef<'h1'> {
    as?: HeadingElementType;
    variant?: HeadingElementType;
    bold?: boolean;
    color?: keyof typeof colorVariants;
    transform?: keyof typeof transformVariants;
    children: React.ReactNode;
}
export declare const Heading: FC<IHeadingProps>;
//# sourceMappingURL=Heading.d.ts.map