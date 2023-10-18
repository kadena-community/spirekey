import type { FC } from 'react';
import type { INavFooterRootProps } from './NavFooter';
import type { INavFooterIconButtonProps } from './NavFooterIconButton';
import type { INavFooterLinkProps } from './NavFooterLink';
import type { INavFooterPanelProps } from './NavFooterPanel';
export { INavFooterIconButtonProps, INavFooterLinkProps, INavFooterPanelProps, INavFooterRootProps, };
export interface INavFooterProps {
    Root: FC<INavFooterRootProps>;
    Panel: FC<INavFooterPanelProps>;
    Link: FC<INavFooterLinkProps>;
    IconButton: FC<INavFooterIconButtonProps>;
}
export declare const NavFooter: INavFooterProps;
//# sourceMappingURL=index.d.ts.map