import type { FC, FunctionComponentElement } from 'react';
import type { INavFooterIconButtonProps } from './NavFooterIconButton';
import type { INavFooterLinkProps } from './NavFooterLink';
export interface INavFooterPanelProps {
    children: FunctionComponentElement<INavFooterLinkProps | INavFooterIconButtonProps>[];
}
export declare const NavFooterPanel: FC<INavFooterPanelProps>;
//# sourceMappingURL=NavFooterPanel.d.ts.map