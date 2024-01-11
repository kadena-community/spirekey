import type { DOMAttributes, FC } from 'react';
import React from 'react';
export interface ITagProps extends DOMAttributes<HTMLSpanElement> {
    children: React.ReactNode;
    className?: string;
}
export declare const Tag: FC<ITagProps>;
//# sourceMappingURL=Tag.d.ts.map