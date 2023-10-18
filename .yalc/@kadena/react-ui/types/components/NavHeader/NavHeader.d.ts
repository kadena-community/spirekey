import type { LogoVariant } from '../BrandLogo';
import type { FC, FunctionComponentElement } from 'react';
import type { INavHeaderContentProps } from './NavHeaderContent';
import type { INavHeaderNavigationProps } from './NavHeaderNavigation';
export interface INavHeaderRootProps {
    brand?: LogoVariant;
    children?: FunctionComponentElement<INavHeaderNavigationProps | INavHeaderContentProps>[];
}
export declare const NavHeaderContainer: FC<INavHeaderRootProps>;
//# sourceMappingURL=NavHeader.d.ts.map