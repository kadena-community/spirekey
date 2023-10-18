import type { Sprinkles } from '../../styles/sprinkles.css';
import type { FC } from 'react';
import React from 'react';
export interface IThProps extends Pick<Sprinkles, 'width' | 'minWidth' | 'maxWidth'> {
    children?: React.ReactNode;
}
export declare const Th: FC<IThProps>;
//# sourceMappingURL=Th.d.ts.map