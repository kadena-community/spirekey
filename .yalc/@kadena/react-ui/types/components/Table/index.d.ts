import type { FC } from 'react';
import type { ITBodyProps } from './TBody';
import type { ITHeadProps } from './THead';
import type { ITableProps } from './Table';
import type { ITdProps } from './Td';
import type { IThProps } from './Th';
import type { ITrProps } from './Tr';
export type { ITBodyProps, ITHeadProps, ITableProps, ITdProps, IThProps, ITrProps, };
interface ITable {
    Root: FC<ITableProps>;
    Body: FC<ITBodyProps>;
    Head: FC<ITHeadProps>;
    Tr: FC<ITrProps>;
    Th: FC<IThProps>;
    Td: FC<ITdProps>;
}
export declare const Table: ITable;
//# sourceMappingURL=index.d.ts.map