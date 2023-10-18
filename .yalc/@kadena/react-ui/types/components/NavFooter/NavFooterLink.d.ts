import type { FC, HTMLAttributeAnchorTarget, ReactNode } from 'react';
export type Target = '_self' | '_blank';
export interface INavFooterLinkProps {
    children: ReactNode;
    href?: string;
    target?: HTMLAttributeAnchorTarget | undefined;
    asChild?: boolean;
}
export declare const NavFooterLink: FC<INavFooterLinkProps>;
//# sourceMappingURL=NavFooterLink.d.ts.map