import type { FC } from 'react';
import type { ITabProps } from './Tab';
import type { ITabContentProps } from './TabContent';
import type { ITabsContainerProps } from './TabsContainer';
interface ITabs {
    Root: FC<ITabsContainerProps>;
    Tab: FC<ITabProps>;
    Content: FC<ITabContentProps>;
}
export type { ITabContentProps, ITabProps, ITabsContainerProps };
export declare const Tabs: ITabs;
//# sourceMappingURL=index.d.ts.map