import type { ReactNode } from 'react';
import React from 'react';
import type { AriaTabListProps } from 'react-aria';
import { Item as TabItem } from 'react-stately';
export { TabItem };
export type ITabItemProps = React.ComponentProps<typeof TabItem>;
export interface ITabsProps extends Omit<AriaTabListProps<object>, 'orientation' | 'items'> {
    className?: string;
}
export declare const Tabs: ({ className, ...props }: ITabsProps) => ReactNode;
//# sourceMappingURL=Tabs.d.ts.map