import type { ComponentPropsWithRef, FC } from 'react';
import React from 'react';
import { colorVariants, transformVariants } from '../typography.css';
export declare const TEXT_ELEMENTS: readonly ["p", "span", "code"];
export type TextElementType = (typeof TEXT_ELEMENTS)[number];
type TextVariant = 'small' | 'smallest' | 'base';
export interface ITextProps extends ComponentPropsWithRef<'p'> {
    as?: TextElementType;
    variant?: TextVariant;
    bold?: boolean;
    color?: keyof typeof colorVariants;
    transform?: keyof typeof transformVariants;
    children: React.ReactNode;
}
export declare const Text: FC<ITextProps>;
export {};
//# sourceMappingURL=Text.d.ts.map