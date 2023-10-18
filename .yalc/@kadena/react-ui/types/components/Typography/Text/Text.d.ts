import type { FC } from 'react';
import React from 'react';
import { colorVariant, elementVariant, fontVariant, sizeVariant, transformVariant } from './Text.css';
export interface ITextProps {
    as?: keyof typeof elementVariant;
    variant?: keyof typeof elementVariant;
    font?: keyof typeof fontVariant;
    bold?: boolean;
    color?: keyof typeof colorVariant;
    transform?: keyof typeof transformVariant;
    size?: keyof typeof sizeVariant;
    children: React.ReactNode;
}
export declare const Text: FC<ITextProps>;
//# sourceMappingURL=Text.d.ts.map