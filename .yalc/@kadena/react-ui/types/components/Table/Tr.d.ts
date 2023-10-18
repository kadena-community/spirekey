import type { FC } from 'react';
import React from 'react';
import { Td } from './Td';
import { Th } from './Th';
import type { CompoundType } from './types';
export interface ITrProps {
    children?: CompoundType<typeof Td> | CompoundType<typeof Th>;
    url?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
export declare const Tr: FC<ITrProps>;
//# sourceMappingURL=Tr.d.ts.map