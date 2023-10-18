import type { Sprinkles } from '../../styles/sprinkles.css';
import type { FC } from 'react';
import { TBody } from './TBody';
import { THead } from './THead';
import type { CompoundType } from './types';
export interface ITableProps extends Pick<Sprinkles, 'wordBreak'> {
    children?: CompoundType<typeof TBody> | CompoundType<typeof THead>;
    striped?: boolean;
}
export declare const Table: FC<ITableProps>;
//# sourceMappingURL=Table.d.ts.map