import type { FC, HTMLAttributeAnchorTarget, ReactNode } from 'react';
import React from 'react';
export interface INavHeaderLinkProps {
    children: ReactNode;
    href: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    target?: HTMLAttributeAnchorTarget;
    asChild?: boolean;
}
export declare const NavHeaderLink: FC<INavHeaderLinkProps>;
//# sourceMappingURL=NavHeaderLink.d.ts.map