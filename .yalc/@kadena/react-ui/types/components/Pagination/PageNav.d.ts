import type { FC } from 'react';
interface IPageNavProps {
    label: string;
    direction?: 'prev' | 'next';
    disabled?: boolean;
    onClick: () => void;
}
export declare const PageNav: FC<IPageNavProps>;
export {};
//# sourceMappingURL=PageNav.d.ts.map