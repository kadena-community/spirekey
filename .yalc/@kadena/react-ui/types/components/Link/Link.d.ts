import type { FC, ReactNode } from 'react';
import { SystemIcon } from '..';
export interface ILinkProps {
    asChild?: boolean;
    block?: boolean;
    children: ReactNode;
    href?: string;
    icon?: keyof typeof SystemIcon;
    iconAlign?: 'left' | 'right';
    target?: '_blank' | '_self' | '_parent' | '_top';
}
export declare const Link: FC<ILinkProps>;
//# sourceMappingURL=Link.d.ts.map