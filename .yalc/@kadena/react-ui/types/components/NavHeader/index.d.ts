import type { FC } from 'react';
import type { INavHeaderRootProps } from './NavHeader';
import type { INavHeaderContentProps } from './NavHeaderContent';
import type { INavHeaderLinkProps } from './NavHeaderLink';
import type { INavHeaderNavigationProps } from './NavHeaderNavigation';
import { INavHeaderSelectProps } from './NavHeaderSelect';
export { INavHeaderContentProps, INavHeaderLinkProps, INavHeaderNavigationProps, INavHeaderRootProps, INavHeaderSelectProps, };
interface INavHeaderProps {
    Root: FC<INavHeaderRootProps>;
    Navigation: FC<INavHeaderNavigationProps>;
    Link: FC<INavHeaderLinkProps>;
    Content: FC<INavHeaderContentProps>;
    Select: FC<INavHeaderSelectProps>;
}
export declare const NavHeader: INavHeaderProps;
//# sourceMappingURL=index.d.ts.map