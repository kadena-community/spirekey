import type { FC, ReactNode } from 'react';
export interface ITabProps {
    children: ReactNode;
    selected?: boolean;
    handleClick?: (tabId: string) => void;
    id: string;
}
export declare const Tab: FC<ITabProps>;
//# sourceMappingURL=Tab.d.ts.map