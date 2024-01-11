import type { ReactNode } from 'react';
import type { AriaTabPanelProps } from 'react-aria';
import type { TabListState } from 'react-stately';
interface ITabPanelProps extends AriaTabPanelProps {
    state: TabListState<object>;
}
export declare const TabPanel: ({ state, ...props }: ITabPanelProps) => ReactNode;
export {};
//# sourceMappingURL=TabPanel.d.ts.map