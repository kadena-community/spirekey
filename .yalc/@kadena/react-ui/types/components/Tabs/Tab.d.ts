import type { ReactNode } from 'react';
import type { AriaTabProps } from 'react-aria';
import type { Node, TabListState } from 'react-stately';
interface ITabProps extends AriaTabProps {
    item: Node<object>;
    state: TabListState<object>;
}
export declare const Tab: ({ item, state }: ITabProps) => ReactNode;
export {};
//# sourceMappingURL=Tab.d.ts.map