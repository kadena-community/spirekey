import type { FC, FunctionComponentElement } from 'react';
import type { INavHeaderLinkProps } from './NavHeaderLink';
export interface INavHeaderNavigationProps {
    children: FunctionComponentElement<INavHeaderLinkProps>[];
    activeHref?: string;
}
export declare const NavHeaderNavigation: FC<INavHeaderNavigationProps>;
//# sourceMappingURL=NavHeaderNavigation.d.ts.map