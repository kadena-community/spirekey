import type { ComponentPropsWithRef, FC } from 'react';
import React from 'react';
import type { colorVariants, fontVariants, transformVariants } from '../typography.css';
import type { elementVariants } from './Heading.css';
export interface IHeadingProps extends ComponentPropsWithRef<'h1'> {
    as?: keyof typeof elementVariants;
    variant?: keyof typeof elementVariants;
    font?: keyof typeof fontVariants;
    bold?: boolean;
    color?: keyof typeof colorVariants;
    transform?: keyof typeof transformVariants;
    children: React.ReactNode;
}
export declare const Heading: FC<IHeadingProps>;
//# sourceMappingURL=Heading.d.ts.map